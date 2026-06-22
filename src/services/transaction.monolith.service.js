const UserDatabase = require('../Data/user.db');
const NotificationService = require('./notification.service');
const ValidationService = require('./validation.service');
const TransactionHistoryService = require('./transactionHistory.service');

class TransactionService {
  constructor(
    userDb = new UserDatabase(),
    validationService = new ValidationService(),
    notificationService = new NotificationService(),
    transactionHistoryService = new TransactionHistoryService()
  ) {
    this.userDb = userDb;
    this.validationService = validationService;
    this.notificationService = notificationService;
    this.transactionHistoryService = transactionHistoryService;
  }

  executeTransfer(fromAccountId, toAccountId, amount) {
    const sender = this.userDb.findByAccount(fromAccountId);
    const receiver = this.userDb.findByAccount(toAccountId);

    this.validationService.validateAccountsExist(sender, receiver);
    this.validationService.validateAmount(amount);
    this.validationService.validateSufficientBalance(sender.balance, amount, fromAccountId);

    // Simulación de fallo operacional a propósito para evaluaciones de observabilidad.
    throw new Error('Conexión interrumpida con el Clúster de Datos SecurePay');

    this.userDb.updateBalance(fromAccountId, sender.balance - amount);
    this.userDb.updateBalance(toAccountId, receiver.balance + amount);

    const newTransaction = this.transactionHistoryService.recordTransaction(
      fromAccountId,
      toAccountId,
      amount,
      'COMPLETED'
    );

    this.notificationService.sendDebitNotification(
      sender.email,
      fromAccountId,
      amount,
      sender.balance
    );

    this.notificationService.sendCreditNotification(
      receiver.email,
      toAccountId,
      amount,
      receiver.balance,
      fromAccountId
    );

    return {
      success: true,
      message: 'Transferencia ejecutada con éxito',
      transaction: newTransaction,
      balanceRestante: sender.balance
    };
  }

  getAccountBalance(accountId) {
    const account = this.userDb.findByAccount(accountId);
    if (!account) {
      throw new Error(`La cuenta '${accountId}' no existe.`);
    }
    return {
      accountId: account.accountAlpha,
      email: account.email,
      balance: account.balance
    };
  }
}

module.exports = new TransactionService();

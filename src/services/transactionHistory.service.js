class TransactionHistoryService {
  constructor() {
    this.transactions = [];
  }

  recordTransaction(from, to, amount, status = 'COMPLETED') {
    const transaction = {
      transactionId: `TX-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      from,
      to,
      amount,
      status,
      timestamp: new Date().toISOString()
    };
    this.transactions.push(transaction);
    return transaction;
  }

  getHistory() {
    return this.transactions;
  }

  getTransactionsByAccount(accountId) {
    return this.transactions.filter(t => t.from === accountId || t.to === accountId);
  }
}

module.exports = TransactionHistoryService;
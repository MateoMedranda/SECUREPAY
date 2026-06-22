class ValidationService {

  validateAccountsExist(sender, receiver) {
    if (!sender) {
      throw new Error(`Error de validación: La cuenta origen no existe en la base de datos.`);
    }
    if (!receiver) {
      throw new Error(`Error de validación: La cuenta destino no existe en la base de datos.`);
    }
  }

  validateAmount(amount) {
    if (amount <= 0) {
      throw new Error('Error de validación: El monto a transferir debe ser mayor a cero.');
    }
  }

  validateSufficientBalance(senderBalance, amount, fromAccountId) {
    if (senderBalance < amount) {
      throw new Error(
        `Saldo insuficiente: La cuenta '${fromAccountId}' tiene $${senderBalance}, requiere $${amount}.`
      );
    }
  }
}

module.exports = ValidationService;
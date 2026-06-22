class NotificationService {

  sendDebitNotification(userEmail, accountId, amount, newBalance) {
    console.log(`\n--- [EMAIL OUTBOX] Enviando correo de confirmación ---`);
    console.log(`Para: ${userEmail}`);
    console.log(`Asunto: Débito por Transferencia Realizada - Fintech SecurePay`);
    console.log(`Mensaje: Estimado usuario, se ha debitado de su cuenta ${accountId} el valor de $${amount}.`);
    console.log(`Su nuevo saldo disponible es: $${newBalance}.`);
    console.log(`------------------------------------------------------------\n`);
  }

  sendCreditNotification(userEmail, accountId, amount, newBalance, fromAccount) {
    console.log(`\n--- [EMAIL OUTBOX] Enviando correo de recepción ---`);
    console.log(`Para: ${userEmail}`);
    console.log(`Asunto: Crédito por Transferencia Recibida - Fintech SecurePay`);
    console.log(`Mensaje: Estimado usuario, ha recibido una transferencia de $${amount} de la cuenta ${fromAccount}.`);
    console.log(`Su nuevo saldo disponible es: $${newBalance}.`);
    console.log(`------------------------------------------------------------\n`);
  }
}

module.exports = NotificationService;
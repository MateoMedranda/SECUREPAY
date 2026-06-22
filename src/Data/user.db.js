const DatabaseService = require('../services/database.service');

class UserDatabase extends DatabaseService{
    constructor(){
        super();
        this.users = [
        { id: 'usr_001', email: 'estudiante.alpha@espe.edu.ec', accountAlpha: 'ACC-12345', balance: 1500.00 },
        { id: 'usr_002', email: 'docente.beta@espe.edu.ec', accountAlpha: 'ACC-67890', balance: 350.50 }
        ];
    }

    findById(id) {
        return this.users.find(u => u.id === id);
    }

    findByAccount(accountId) {
        return this.users.find(u => u.accountAlpha === accountId);
    }

    findAll() {
        return this.users;
    }

    update(id, data) {
        const user = this.findById(id);
        if (!user) throw new Error(`Usuario ${id} no encontrado`);
        Object.assign(user, data);
        return user;
    }

    updateBalance(accountId, newBalance) {
        const user = this.findByAccount(accountId);
        if (!user) throw new Error(`Cuenta ${accountId} no existe`);
        user.balance = newBalance;
        return user;
    }

    save(user) {
        this.users.push(user);
        return user;
    }
}

module.exports = UserDatabase;
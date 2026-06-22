const JwtService = require('../services/jwt.service');

class AuthController {
  /**
   * Simula un servidor de autenticación que genera un token.
   */
  static async generateToken(req, res) {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'admin123') {
      const user = {
        id: '1234567890',
        fullname: 'Administrador del Sistema'
      };

      const token = JwtService.signToken(user);

      return res.json({
        message: 'Autenticación exitosa',
        token: token
      });
    }

    return res.status(401).json({
      error: 'Credenciales inválidas. Por favor verifique su usuario y contraseña.'
    });
  }
}

module.exports = AuthController;

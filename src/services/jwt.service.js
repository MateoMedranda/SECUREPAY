const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const PRIVATE_KEY_PATH = path.join(__dirname, '../../private.pem');
const PUBLIC_KEY_PATH = path.join(__dirname, '../../public.pem');

/**
 * Genera un Token JWT firmado con clave privada asimétrica (RS256).
 *
 * @param {Object} user - Objeto con la información del usuario a firmar.
 * @returns {string} JWT Token firmado.
 */
function signToken(user) {
  const privateKey = fs.readFileSync(PRIVATE_KEY_PATH, 'utf8');
  const TWO_MINUTES_IN_SEC = 60 * 2;

  const payload = {
    sub: user.id || user.sub,
    name: user.name || user.fullname,
    exp: Math.floor(Date.now() / 1000) + TWO_MINUTES_IN_SEC,
  };

  return jwt.sign(payload, privateKey, { algorithm: 'RS256' });
}

/**
 * Verifica un Token JWT utilizando la clave pública asimétrica (RS256).
 *
 * @param {string} token - Token JWT a verificar.
 * @returns {Object|null} Payload decodificado si es válido, o null si es inválido.
 */
function verifyToken(token) {
  const publicKey = fs.readFileSync(PUBLIC_KEY_PATH, 'utf8');

  try {
    return jwt.verify(token, publicKey, { algorithms: ['RS256'] });
  } catch (error) {
    return null;
  }
}

module.exports = {
  signToken,
  verifyToken
};

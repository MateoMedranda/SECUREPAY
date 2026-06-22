const { Sentry } = require('./instrument.js');
require('dotenv').config();
const express = require('express');
const routes = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración básica para parsear JSON en las peticiones HTTP

app.use(express.json());

// Integración de Sentry para capturar contexto de peticiones (si está disponible)
if (Sentry && Sentry.Handlers && typeof Sentry.Handlers.requestHandler === 'function') {
  app.use(Sentry.Handlers.requestHandler());
}

// Montar el enrutador principal en /v1
app.use('/v1', routes);

// Endpoint base informativo
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'fintech-securepay-base',
    description: 'API base para evaluaciones de aplicaciones distribuidas (ESPE)',
    status: 'ONLINE'
  });
});



// Middleware para taguear y capturar errores operacionales con Sentry
app.use((err, req, res, next) => {
  try {
    if (req && req.user && Sentry && typeof Sentry.setTag === 'function') {
      Sentry.setTag('user.id', req.user.sub || req.user.id);
    }

    if (err && err.message && err.message.includes('Conexión interrumpida')) {
      if (Sentry && typeof Sentry.captureException === 'function') {
        Sentry.captureException(err);
      }
    }
  } catch (e) {
    console.error('Error al taguear/capturar en Sentry:', e);
  }

  next(err);
});
// Manejo centralizado de excepciones y reporte a Sentry
if (Sentry && Sentry.Handlers && typeof Sentry.Handlers.errorHandler === 'function') {
  app.use(Sentry.Handlers.errorHandler());
}
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]:', err);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Servidor Fintech ejecutándose en: http://localhost:${PORT}`);
  console.log(`   - Balance Alpha: GET http://localhost:${PORT}/v1/account-alpha/balance`);
  console.log(`   - Transferencia Beta: POST http://localhost:${PORT}/v1/transfer-beta/execute`);
  console.log(`======================================================\n`);
});


/*
 * ==========================================================================
 * SERVIDOR EXPRESS
 * ==========================================================================
 */

const express = require('express');
const helmet = require('helmet');
const path = require('path');

// Inicialização da aplicação
const app = express();

// Configurações gerais
app.disable('x-powered-by');

// Middleware de segurança
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// Interpretação de requisições JSON
app.use(express.json({ limit: '10kb' }));

// =========================================================================
// ARQUIVOS ESTÁTICOS — DESENVOLVIMENTO LOCAL
// =========================================================================

// Na Vercel, os arquivos de public/ são servidos pela CDN.
// Localmente, o Express disponibiliza os mesmos arquivos.

if (process.env.VERCEL !== '1') {
  app.use(express.static(path.join(__dirname, 'public')));
}

// =========================================================================
// ROTAS DA API
// =========================================================================

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Verificação de funcionamento do servidor
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    projeto: 'Shaylla Correa',
    ambiente: process.env.VERCEL === '1'
      ? 'vercel'
      : 'local',
    timestamp: new Date().toISOString(),
  });
});

// Resposta para rotas de API inexistentes
app.use('/api', (req, res) => {
  res.status(404).json({
    status: 'error',
    mensagem: 'Rota da API não encontrada.',
  });
});

// =========================================================================
// TRATAMENTO DE ERROS
// =========================================================================

app.use((err, req, res, next) => {
  console.error('Erro no servidor:', err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    status: 'error',
    mensagem: 'Erro interno do servidor.',
  });
});

// =========================================================================
// INICIALIZAÇÃO E EXPORTAÇÃO
// =========================================================================

// Inicialização local
if (require.main === module) {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Servidor iniciado em http://localhost:${PORT}`);
  });
}

// Exportação para a Vercel
module.exports = app;

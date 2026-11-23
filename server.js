const express = require('express');
const path = require('path');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(express.json());

// Serve tudo que está dentro de public/ (index.html, style.css, script.js, assets/)
app.use(express.static(path.join(__dirname, 'public')));

// Rota simples de verificação do servidor
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', projeto: 'Shaylla Correa' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
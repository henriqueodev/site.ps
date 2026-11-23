// Framework web para criar o servidor HTTP e definir rotas/middlewares
const express = require('express');

// Utilitário nativo do Node.js para montar caminhos de pastas com segurança em qualquer sistema operacional
const path = require('path');

// Middleware de segurança que adiciona cabeçalhos HTTP de proteção contra vulnerabilidades comuns
const helmet = require('helmet');

// Carrega as variáveis definidas no arquivo .env para dentro de process.env
require('dotenv').config();

// Cria a instância principal da aplicação Express
const app = express();

// Usa a porta definida no ambiente (ex.: servidor de hospedagem) ou 3000 como padrão local
const PORT = process.env.PORT || 3000;

// Ativa o Helmet, desabilitando apenas o CSP padrão para não bloquear fontes/ícones externos (como Font Awesome)
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// Permite que o servidor interprete corpos de requisição enviados no formato JSON (ex.: fetch com POST)
app.use(express.json());

// Define a pasta raiz atual (__dirname, que já é "site.ps") como entrega de arquivos estáticos.
// Assim, index.html, style.css, script.js e assets/ ficam acessíveis direto pelo navegador.
app.use(express.static(__dirname));

// Rota de "health check" (verificação de saúde): útil para testar rapidamente se o servidor está online
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    projeto: 'Shaylla Correa',
  });
});

// Inicia o servidor e fica escutando requisições na porta configurada
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
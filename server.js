const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Configura para ler os arquivos da pasta 'public ao mossar'
app.use(express.static(path.join(__dirname, 'public ao mossar')));

// Força o link principal a abrir o index.html dessa pasta
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public ao mossar', 'index.html'));
});

// Força o link /dashboard a abrir o dashboard.html dessa pasta
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public ao mossar', 'dashboard.html'));
});

io.on('connection', (socket) => {
  socket.on('resposta', (data) => {
    io.emit('nova-resposta', data);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

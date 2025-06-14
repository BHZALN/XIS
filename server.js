const express = require('express');
const fs = require('fs');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

const usersPath = path.join(__dirname, 'users.json');

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.json({ success: false, message: "Username and password required" });

  let users = fs.existsSync(usersPath) ? JSON.parse(fs.readFileSync(usersPath)) : [];

  if (users.find(u => u.username === username)) {
    return res.json({ success: false, message: "Username already exists" });
  }

  users.push({ username, password });
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  res.json({ success: true });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = fs.existsSync(usersPath) ? JSON.parse(fs.readFileSync(usersPath)) : [];
  const user = users.find(u => u.username === username && u.password === password);
  if (user) return res.json({ success: true });
  return res.json({ success: false, message: "Invalid credentials" });
});

io.on('connection', socket => {
  socket.on('chat message', data => {
    io.emit('chat message', data);
  });
});

server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

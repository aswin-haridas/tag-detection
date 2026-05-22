const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const dir = __dirname;

http.createServer((req, res) => {
  const file = path.join(dir, req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(file);
  const types = { '.html': 'text/html', '.jsonl': 'text/plain', '.js': 'application/javascript' };
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': types[ext] || 'text/plain' });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`Server at http://localhost:${PORT}`);
  const { exec } = require('child_process');
  exec(`open http://localhost:${PORT}`);
});

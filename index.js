const http = require('node:http');
const readline = require('node:readline');
const { stdin, stdout } = require('node:process');

const reses = []

readline.createInterface({ input: stdin, output: stdout })
  .on('line', (input) => {
    for (const res of reses) {
      res.write(input);
    }
  }); 

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
  reses.push(res);

  req.on('close', () => {
    reses.splice(reses.indexOf(res), 1);
    console.log('Connection closed');
  });
});

const port = process.env.PORT || 1234;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

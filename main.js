const http = require('http');
const StompServer = require('stomp-broker-js');

const server = http.createServer((request, response) => {
  console.log(request.url);
});
const stompServer = new StompServer({
  server: server,
  debug: console.log,
  path: '/ws',
  heartbeat: [2000, 2000]
});

console.log(' [*] Listening on 0.0.0.0:3002');
server.listen(3002, 'localhost');

stompServer.subscribe('/echo', (msg, headers) => {
  // let topic = headers.destination;
  console.log(msg)
  // console.log(`topic:${topic} messageType: ${typeof msg}`, msg, headers);
  stompServer.send('/echo', headers, msg);

});

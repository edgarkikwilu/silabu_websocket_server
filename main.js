require('dotenv').config()
const http = require('http');
const StompServer = require('stomp-broker-js');
const knexConfig = require('./config/knexfile')
const knex = require('knex')(knexConfig[process.env.NODE_ENV])

const server = http.createServer((req, res) => {
  let data = '';
  req.on('data', chunk => {
    data += chunk;
  })
  req.on('end', () => {
    this.handleRequest(req,res,data)
  })
  
});

exports.handleRequest = async(req,res,data)=>{
  console.log(data)
  const body = JSON.parse(data);

  res.setHeader("Content-Type", "application/json");
  switch (req.url) {
      case "/users":
        knex('users').select('*')
          .then(users=>{
            console.log(users)
            res.writeHead(200);
            res.end(JSON.stringify(users));
          }).catch(err=>{
            console.log(err)
            res.writeHead(500);
            res.end("Error fetching users");
          })
        break
      case "/conversations":
        knex('conversations').select('*')
          .unionAll([
            knex.select('*').from('chats').where('conversation_id','conversations.id')
          ])
          .then(users=>{
            console.log(users)
            res.writeHead(200);
            res.end(JSON.stringify(users));
          }).catch(err=>{
            console.log(err)
            res.writeHead(500);
            res.end("Error fetching conversations");
          })
        break
      case "/chats/save":
        let {conversationId,referenceId,message,to,from} = body
        knex('chats')
        .insert({
          conversation_id:conversationId,
          referenceId:referenceId,
          message:message,
          to:to,
          from:from
        }).then(chats=>{
          console.log(chats)
          res.writeHead(200);
          res.end("Success");
        }).catch(err=>{
          console.log(err)
          res.writeHead(500);
          res.end("Error saving chats");
        })
        break
      case "/chats/all":
        knex('chats').select()
        .then(chats=>{
          console.log(chats)
          res.writeHead(200);
          res.end(JSON.stringify(chats));
        }).catch(err=>{
          console.log(err)
          res.writeHead(500);
          res.end("Error fetching chats");
        })
          break
      default:
          res.writeHead(404);
          res.end(JSON.stringify({error:"Resource not found"}));
  }
}

const stompServer = new StompServer({
  server: server,
  debug: console.log,
  path: '/ws',
  heartbeat: [2000, 2000]
});

console.log(' [*] Listening on 0.0.0.0:3000');
server.listen(3000, 'localhost');

stompServer.subscribe('/echo', (msg, headers) => {
  // let topic = headers.destination;
  console.log(msg)
  // console.log(`topic:${topic} messageType: ${typeof msg}`, msg, headers);
  stompServer.send('/echo', headers, msg);

});

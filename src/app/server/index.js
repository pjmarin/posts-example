var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(cors());

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.bodyParser);


server.get('/posts', (req, res, next) => {
  console.log('pasamos por el metodo get a la ruta post');
  next();
  // res.json(req.body)
});

server.post('/posts', (req, res, next) => {
  console.log('pasamos por post posts');
  console.log('req headers');
  console.log(req.headers);
  var data = req.body.data;
   console.log('Add ' + data);
  next()
});

server.put('/posts', (req, res, next) => {
  console.log('pasamos por put posts');
  console.log('req headers');
  console.log(req.headers);
  next()
});

server.delete('/deletePost', (req, res, next) => {
  console.log('pasamos por delete posts');
  console.log('req headers');
  console.log(req.headers);
  next();
});

server.use(middlewares);
server.use(router);

server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

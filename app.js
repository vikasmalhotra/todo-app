var express = require('express');
var app = express();
app.use(express.static(__dirname));
app.get('/', function (req, res) {
  res.sendfile('index.html');
});
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
var express   = require('express'),
bodyParser  = require('body-parser'),
cors        = require('cors'),
mongoose    = require('mongoose');

var chatCtrl = require('./chatCtrl');
var gifCtrl = require('./gifCtrl');

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/public'));

app.post('/chat', chatCtrl.create);
app.get('/chat', chatCtrl.read);
app.put('/chat/:id', chatCtrl.update);
app.delete('/chat', chatCtrl.delete);

app.get('/gif', gifCtrl.getMostRecent);
app.post('/gif', gifCtrl.create);
app.put('/gif/:id', gifCtrl.update);
app.delete('/gif', gifCtrl.delete);

var mongoUri = "mongodb://localhost:27017/chatApp";
mongoose.connect(mongoUri);
mongoose.connection.on('error', console.error.bind(console, 'connection error'));
mongoose.connection.once('open', function(){
  console.log("Connected to mongoDB");
});

app.listen(8000, function(){
  console.log("listening to 8000 ");
});

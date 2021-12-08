// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your middleware
const requestip = require('request-ip')

const ipmiddleware = (req,res,next)=>{
  const clientIp = requestip.getClientIp(req)
  next()
} 

app.use(requestip.mw())

// your first API endpoint... 
app.get("/api/whoami", function (req, res) {
  let ipaddress = req.clientIp
  let language = req.acceptsLanguages()
  let software = req.get('User-Agent')
  res.json({
    Ipadress:ipaddress,
    Language:language[0],
    Software:software
  })
})

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

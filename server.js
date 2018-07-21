var express = require('express')
var app = express()
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

require("./app/routing/apiRoutes.js")(app)
require("./app/routing/htmlRoutes.js")(app)





app.listen(PORT, function(){
  console.log("your app is up and running on port ", PORT);
})
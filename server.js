var express = require('express')
var app = express()

app.use(express.static('panorama'))


app.get('/', function (req, res) {
    res.send('henlo world')
})

app.listen(3000, function () {
    console.log('Listening on port 3000!')
})

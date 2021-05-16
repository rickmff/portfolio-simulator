const { Socket } = require('dgram')
const express = require('express')
const cors = require('cors')
const path = require('path')
const fetch = require("node-fetch");
const { type } = require('os');

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "")
    app.use(cors());
})


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);

io.on('connection', socket => {
    console.log(`like ${socket.id}`)

    socket.on('sendSymbol', ticker => {
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=5FXO1X2CQ0LNE2T6`


        const stockData = (result) => {
            ticker_info = {
                ticker: result["Meta Data"]["2. Symbol"],
                last_day: Object.values(result[Object.keys(result)[1]])[0]
            }
            console.log(ticker_info)
        }

        fetch(url)
            .then(response => response.json()
                .then(info => stockData(info)))
    })
})

server.listen(3000, () => console.log('sv ready'))
/*      .then(response => response.json())
        .then(data =>
            console.log(data),
            console.log('data[Object.keys(data)[0]]')) */
/*         .then(response => response.json())
.then(data =>
    let days = data[Object.keys(data)[0]],
    console.log(days))
*/
/*  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
*/
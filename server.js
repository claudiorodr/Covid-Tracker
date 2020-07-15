const express = require('express')
const CronJob = require('cron').CronJob
const request = require('request')
const request2 = require('request-promise')
const moment = require('moment')
var cors = require('cors')
const dotenv = require('dotenv')
const worldRoute = require('./routes/world')
const db = require('./connection')
const PORT = process.env.PORT || 3001

const app = express()
dotenv.config();
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use(cors())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/colorlib.com/polygon/adminty/default/index.html');
})

app.get('/all', (req, res) => {
  res.sendFile(__dirname + '/public/colorlib.com/polygon/adminty/default/all.html');
})

const job = new CronJob('0 */120 * * * *', async function () {
  request('https://api.covid19api.com/summary', {
    json: true
  }, async (err, res, body) => {
    if (err) {
      return console.log(err)
    }

    await db.insert('Global_Summary', {
      'info': body.Global,
      'date': body.Date
    })

    await db.insert('Countries_Summary', {
      'info': body.Countries,
      'date': body.Date
    })

    await db.findOne('Countries_Summary')
    var results = db.results
    await results.info.sort((a, b) => (a.TotalConfirmed < b.TotalConfirmed) ? 1 : -1)

    await db.insert('Countries_Summary_ordered', results)
  })

  request('https://corona-api.com/timeline', {
    json: true
  }, async (err, res, body) => {
    if (err) {
      return console.log(err)
    }

    await db.insert('Global_Timeline', {
      'info': body.data,
      'date': body.data[0].date
    })
  })

  await db.findOne('Countries_Summary_ordered')
  var ordered_countries = db.results
  var now = moment().tz('America/Phoenix').format('YYYY-MM-DD')
  var date = moment().tz('America/Phoenix').subtract(10, 'days').format('YYYY-MM-DD')


  var top = []

  for (let i = 0; i < 5; i++) {
    await request2('https://api.covid19api.com/total/country/' + ordered_countries.info[i].Slug + '/status/confirmed?from=' + date + '&to=' + now, {
      json: true
    }, (err, res, body) => {
      if (err) {
        return console.log(err)
      }
      top.push(body)
    })
  }

  db.insert('Top_Timeline', {
    'info': top
  })


})

job.start();

app.use('/api/world', worldRoute)
app.listen(PORT, () => console.log("Server Up and Running"))
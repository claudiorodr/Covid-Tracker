const express = require('express')
const CronJob = require('cron').CronJob
const request = require('request')
const worldRoute = require('./routes/world')
const db = require('./connection')
const dotenv = require('dotenv')
const PORT = process.env.PORT || 3001

const app = express()
dotenv.config();

app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))


const job = new CronJob('*/10 * * * * *', function () {
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
})

job.start();

app.use('/api/world', worldRoute)
app.listen(PORT, () => console.log("Server Up and Running"))
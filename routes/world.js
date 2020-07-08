const router = require('express').Router()
var db = require('../connection')
const {
    response
} = require('express')


router.get('/total', async (req, res) => {
    await db.findOne('Global_Summary')
    res.send(db.results)
})

router.get('/top', async (req, res) => {
    await db.findOne('Countries_Summary_ordered')
    res.send(db.results)
})

router.get('/timeline', async (req, res) => {
    await db.findOne('Global_Timeline')
    res.send(db.results)
})

router.get('/trends_five', async (req, res) => {
    await db.findOne('Top_Timeline')
    // res.send(db.results)
    var response = db.results
    var confirmed = []
    for (let i = 0; i < response.info.length; i++) {
        var confirmed_temp = []
        for (let j = 0; j < response.info[i].length; j++) {
            confirmed_temp.push(response.info[i][j].Cases)
        }
        var min = Math.min.apply(null, confirmed_temp)
        var confirmed_temp = confirmed_temp.map(function (value) {
            return value - min;
        });
        confirmed.push(confirmed_temp)
    }

    var daily_confirmed = []

    for (let i = 0; i < confirmed.length; i++) {
        var daily_confirmed_temp = []
        for (let j = 1; j < confirmed[i].length; j++) {
            var day = confirmed[i][j] - confirmed[i][j - 1];
            daily_confirmed_temp.push(day)
        }
        var min = Math.min.apply(null, daily_confirmed_temp)
        var daily_confirmed_temp = daily_confirmed_temp.map(function (value) {
            return value - min;
        });
        daily_confirmed.push(daily_confirmed_temp)

    }

    var daily = []

    for (let i = 0; i < daily_confirmed.length; i++) {
        var daily_temp = []

        var min = Math.min.apply(null, daily_confirmed[i])
        var max = Math.max.apply(null, daily_confirmed[i])

        for (let j = 0; j < daily_confirmed[i].length; j++) {
            var cases = Math.round((((daily_confirmed[i][j] - min) * (45 - 1)) / (max - min)) + 1)
            daily_temp.push(cases)
        }
        daily.push(daily_temp)

    }
    res.send(daily)


})

module.exports = router
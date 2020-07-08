const router = require('express').Router()
var db = require('../connection')
const { response } = require('express')


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

    
})

module.exports = router
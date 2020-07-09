const router = require('express').Router()
var db = require('../connection')
var trend = require('../helper/top_5')
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
    var response = db.results

    trend.list(response)
    res.send(trend.results)
})

module.exports = router
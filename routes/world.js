const router = require('express').Router()
var db = require('../connection')


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

module.exports = router
var express = require('express');
var router = express.Router();
var Note = require('../models/note').Note


router.get('/notes', function(req, res, next) {
    if (!req.session.user) {
        Note.findAll({ raw: true }).then(function(notes) {
            res.send({ status: 0, data: notes })
        }).catch(function() {
            res.send({ status: 1, errorMsg: '数据库出错' })
        })
    } else {
        Note.findAll({ raw: true, where: { userID: req.session.user.id } }).then(function(notes) {
            res.send({ status: 0, data: notes })
        }).catch(function() {
            res.send({ status: 1, errorMsg: '数据库出错' })
        })
    }
})



router.post('/add', function(req, res, next) {
    var note = req.body.note
    if (!req.session.user) {
        res.send({ status: 1, errorMsg: '请先登录' })
    } else {
        var userID = req.session.user.id
        Note.create({ text: note, userID: userID }).then(function(note) {
            res.send({
                status: 0,
                ctime: note.dataValues.updatedAt
            })
        }).catch(function() {
            res.send({ status: 1, errorMsg: '数据库出错' })
        })
    }

})

router.post('/delete', function(req, res, next) {
    if (!req.session.user) {
        res.send({ status: 1, errorMsg: '请先登录' })
    } else {
        Note.destroy({ where: { id: req.body.id } })
            .then(function() {
                res.send({
                    status: 0
                })
            }).catch(function() {
                res.send({
                    status: 1,
                    errorMsg: '数据库出错或者你没有权限'
                })
            })
    }

})

router.post('/edit', function(req, res, next) {
    if (!req.session.user) {
        res.send({ status: 1, errorMsg: '请先登录' })
    } else {
        Note.update({ text: req.body.note }, { where: { id: req.body.id } })
            .then(function() {
                Note.findOne({ where: { id: req.body.id } })
                    .then(function(note) {
                        res.send({
                            status: 0,
                            utime: note.dataValues.updatedAt
                        })
                    })


            }).catch(function() {
                res.send({
                    status: 1,
                    errorMsg: '数据库出错'
                })
            })
    }

})

module.exports = router
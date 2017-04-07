require('less/index.less')
var $ = require('../lib/jquery')

var NoteManager = require('mod/note-manager.js').NoteManager;
var Event = require('mod/event.js').EventCenter;
var waterRender = require('mod/waterfall.js').waterRender;

NoteManager.load();

$('.add-note').on('click', function() {
    NoteManager.add();
})

Event.on('waterRender', function() {
    new waterRender($('.wrap'))
})
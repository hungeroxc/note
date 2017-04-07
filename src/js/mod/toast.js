var $ = require('jquery')
require('less/toast.less')


function Toast(msg) {
    this.msg = msg
    this.create()
    this.show()
}
Toast.prototype = {
    create: function() {
        this.$tip = $('<div class="toast">' + this.msg + '</div>')
        $('body').append(this.$tip)
    },
    show: function() {
        var _this = this
        this.$tip.animate({
            'opacity': 1
        }, 500, function() {
            setTimeout(function() {
                _this.$tip.animate({
                    'opacity': 0.5
                }, 500, function() {
                    _this.$tip.remove()
                })
            }, 3000)
        })
    }
}

module.exports.Toast = Toast
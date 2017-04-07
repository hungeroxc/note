var $ = require('jquery')

function waterRender($node) {
    this.$node = $node
    this.init()
}

waterRender.prototype.init = function() {
    var $items = this.$node.children(),
        count = parseInt($(window).width() / this.$node.children().outerWidth(true)),
        heightArr = [],
        _this = this

    for (var i = 0; i < count; i++) {
        heightArr[i] = 0
    }

    $items.each(function() {
        var minHeight = Math.min.apply(null, heightArr)
        var index = heightArr.indexOf(minHeight)

        $(this).css({
            top: heightArr[index],
            left: $(this).outerWidth(true) * index
        })

        heightArr[index] += $(this).outerHeight(true)
        _this.$node.height(heightArr[index])
    })
}

module.exports.waterRender = waterRender
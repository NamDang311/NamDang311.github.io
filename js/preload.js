//图片预加载

(function ($) {
    function Preload(imgs, options) {
        this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
        this.opts = $.extend({}, Preload.DEFAULT, options);

        if (this.opts.order === 'ordered') {
            this._ordered();
        } else {
            this._unordered();
        }
    }

    Preload.DEFAULT = {
        order: 'unordered', //默认无序预加载
        each: null, //每一张图片加载完毕后执行
        all: null, //所有图片加载完毕后执行
    };

    Preload.prototype._ordered = function () {
        var opts = this.opts,
            imgs = this.imgs,
            len = imgs.length,
            count = 0;

        load();

        function load() {
            var imgObj = new Image();

            $(imgObj).on('load error', function () {
                opts.each && opts.each(count);

                if (count >= len) {
                    opts.all && opts.all();
                } else {
                    load();
                }
                count++;
            });
            imgObj.src = imgs[count];
        }
    }

    Preload.prototype._unordered = function () {

        var imgs = this.imgs,
            opts = this.opts,
            count = 0,
            len = imgs.length;

        $.each(imgs, function (i, src) {
            if (typeof src != 'string') return;

            var imgObj = new Image();

            $(imgObj).on('load error', function () {
                opts.each && opts.each(count);

                if (count >= len - 1) {
                    opts.all && opts.all();
                }
                count++;
            })
            imgObj.src = src
        })
    };

    $.extend({
        preload: function (imgs, opts) {
            new Preload(imgs, opts);
        }
    });
})(jQuery);
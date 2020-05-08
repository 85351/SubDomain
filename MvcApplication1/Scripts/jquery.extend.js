/* File Created: 六月 4, 2013 */
(function ($) {
    //#region NavSlide
    $.fn.NavSlide = function (options) {
        Dom = $(this);

        var defaults = {
            speed: 200
        };

        var $list = Dom.find('li'),
			listLen = $list.length,
            i = 0,
            currIdx = 0,
            bool = true,
            arrListInfo = [],
            $curr;

        for (i = 0; i < listLen; i++) {
            var othis = $list.eq(i),
			    sPath = othis.find('a').attr('href'),
				sText = othis.text(),
				nPosX = othis.position().left,
                nWidth = othis.width();

            arrListInfo.push([sText, nPosX, sPath, nWidth]);

            if (othis.hasClass('curr') && bool) {
                othis.removeClass('curr');
                Dom.append('<li id=\"curr\" class=\"btn-info\" style=\"position: absolute;display:none;left:' + nPosX + 'px;\"><a href=\"' + sPath + '\">' + sText + '</a></li>');
                $curr = $('#curr');
                $curr.fadeIn(defaults.speed);

                bool = false;
                currIdx = i;
            }
        };

        setTimeout(function () {
            $list.bind("mouseover", function () {
                var index = $(this).index();
                $curr.find("a").attr("href", arrListInfo[index][2]).text('...');
                $curr.stop().animate({ "left": arrListInfo[index][1], "width": arrListInfo[index][3] }, defaults.speed, function () {
                    $(this).find("a").attr("href", arrListInfo[index][2]).text(arrListInfo[index][0]);
                });
            });
            Dom.bind("mouseleave", function () {
                $curr.stop().animate({ "left": arrListInfo[currIdx][1], "width": arrListInfo[currIdx][3] }, defaults.speed, function () {
                    $(this).find("a").attr("href", arrListInfo[currIdx][2]).text(arrListInfo[currIdx][0]);
                });
            });
        }, defaults.speed);
    };
    //#endregion

    //#region TrunAd
    $.fn.TrunAd3 = function (options) {
        var defaults = {
            catalogArea: ".adCatalog",
            imgArea: ".adImage",
            interval: 3000
        };

        var count = $(defaults.imgArea + " a").length - 1;
        var currentIndex = 0;
        var currentTimeoutID;

        $(defaults.imgArea + " .adImg:not(:first)").hide();
        $(defaults.catalogArea + " li").eq(0).css({ "background": "#7f0019", "color": "#fff", "font-weight": "bolder" });

        $(defaults.catalogArea + " li").mouseover(function () {
            var idx = $(defaults.catalogArea + " li").index($(this));

            $(defaults.imgArea + " .adImg").each(function () { $(this).css("display", "none"); });
            $(defaults.imgArea + " .adImg").eq(idx).fadeIn(200);

            $(this).css({ "background": "#7f0019", "color": "#fff", "font-weight": "bolder" })
                   .siblings().css({ "background": "#ececec", "color": "#000", "font-weight": "normal" });
        });

        currentTimeoutID = setInterval(showAuto, defaults.interval);

        $(defaults.imgArea + " img").hover(function () { clearInterval(currentTimeoutID); }, function () { currentTimeoutID = setInterval(showAuto, defaults.interval); });

        function showAuto() {
            currentIndex = currentIndex >= count ? 0 : ++currentIndex;
            $(defaults.catalogArea + " li").eq(currentIndex).trigger("mouseover");
        }
    }

    $.fn.TrunAd4 = function (options) {
        var defaults = {
            imgArea: '.adImgPanel',
            imgHeight: '80px',
            hlfHeight: '40px',
            interval: 100
        };

        var t = $(this);
        t.find(defaults.imgArea + ' a').hover(function () {
            $(this).find('img').stop().animate({ 'height': 0, 'top': defaults.hlfHeight }, defaults.interval, function () {
                $(this).hide().next().show();
                $(this).next().animate({ 'height': defaults.imgHeight, 'top': '0' }, defaults.interval);
            });
        }, function () {
            $(this).find('b').animate({ 'height': 0, 'top': defaults.hlfHeight }, defaults.interval, function () {
                $(this).hide().prev().show();
                $(this).prev().animate({ 'height': defaults.imgHeight, 'top': '0' }, defaults.interval);
            });
        });
    }
    //#endregion

    //#region TextBox
    $.fn.TextBoxValidator = function (options) {
        this.textBox = $(this);
        this.settings = $.extend({
            // 是否显示字数统计，文本框后面必须存在用来显示字符数的标签
            showCharacterCount: true,
            // 最大长度
            maxCount: 25,
            // 超长后的样式
            overLengthStyle: "red"
        }, options);

        var ps = this.settings;
        if (ps.showCharacterCount) {
            this.textBox.keyup(function (e) {
                var length = $(e.target).val().trim().bytelength();
                var count = Math.ceil(length / 2);
                $(e.target).next().text(count);
                if (count > ps.maxCount) {
                    $(e.target).next().addClass("red");
                }
                else {
                    $(e.target).next().removeClass("red");
                }
            });
        }

        //初始值
        if (this.textBox.val().trim().length > 0) {
            var length = this.textBox.val().trim().bytelength();
            var count = Math.ceil(length / 2);
            this.textBox.next().text(count);
        }
    }

    $.fn.TextBoxWatermark = function (options) {
        this.textBox = $(this);
        this.settings = $.extend({
            // 水印文字
            watermarkText: "",
            // 水印样式
            watermarkClass: ""
        }, options);

        var ps = this.settings;
        if (ps.watermarkText && ps.watermarkText.length > 0) {
            // 如果没有值，加上水印
            if (this.textBox.val().length == 0) {
                this.textBox.val(ps.watermarkText).addClass(ps.watermarkClass);
            }

            this.textBox.focus(function (e) {
                if (e.target.value == ps.watermarkText) {
                    $(e.target).val("").removeClass(ps.watermarkClass);
                }
            });
            this.textBox.blur(function (e) {
                if (e.target.value == "") {
                    $(e.target).val(ps.watermarkText).addClass(ps.watermarkClass);
                }
            });
        }
    }
    //#endregion
})(jQuery);
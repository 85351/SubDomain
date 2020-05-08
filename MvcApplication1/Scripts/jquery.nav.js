/* File Created: 六月 4, 2013 */
(function ($) {
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
})(jQuery);
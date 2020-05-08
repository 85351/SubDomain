(function ($) {
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
})(jQuery); 

(function ($) {
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
})(jQuery); 

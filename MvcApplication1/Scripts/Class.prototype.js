/* 原型的扩展方法都使用小写 */

//#region String
String.prototype.trim = function () {
    return this.replace(/(^[\s　]*)|([\s　]*$)/g, "");
};

String.prototype.ltrim = function () {
    return this.replace(/(^[\s　]*)/g, "");
};

String.prototype.rtrim = function () {
    return this.replace(/([\s　]*$)/g, "");
};

String.prototype.bytelength = function () {
    var doubleByteChars = this.match(/[^\x00-\xff]/ig);
    return this.length + (doubleByteChars == null ? 0 : doubleByteChars.length);
};

String.prototype.cut = function (n) {
    if (n > this.length) {
        return this;
    }
    return this.substring(0, n);
};

String.prototype.isEmpty = function () {
    return this.trim().length == 0;
};

String.prototype.toDate = function () {
    var dateString = this.replace(/\/Date\((\d+)(\+?\d+\))\//g, 'new Date($1)');
    return eval(dateString);
};

//类方法
String.Format = function () {
    var args = arguments, argsCount = args.length;
    if (argsCount == 0) {
        return "";
    }
    if (argsCount == 1) {
        return args[0];
    }
    var reg = /{(\d+)?}/g, arg, result;
    if (args[1] instanceof Array) {
        arg = args[1];
        result = args[0].replace(reg, function ($0, $1) {
            return arg[parseInt($1)];
        });
    }
    else {
        arg = args;
        result = args[0].replace(reg, function ($0, $1) {
            return arg[parseInt($1) + 1];
        });
    }
    return result;
};
String.format = String.Format;
//#endregion

//#region StringBuilder
var StringBuilder = function () {
    this.strings = [];
}
StringBuilder.prototype.append = function (text) {
    this.strings.push(text);
};
StringBuilder.prototype.appendFormat = function () {
    this.strings[this.strings.length] = String.format.apply(String, arguments);
};
StringBuilder.prototype.toString = function () {
    if (arguments.length == 0) {
        return this.strings.join("");
    }
    else {
        return this.strings.join(arguments[0]);
    }
};
StringBuilder.prototype.clear = function () {
    this.strings.clear();
};
StringBuilder.prototype.backspace = function () {
    this.strings.pop();
};
//#endregion

//#region Date
Date.prototype.addMonths = function (months) {
    var result = this;
    var month = (this.getMonth() + months) % 12;
    result.setFullYear(this.getFullYear() + Math.floor((this.getMonth() + months) / 12));
    result.setMonth(month < 0 ? month + 12 : month);

    return result;
}
Date.prototype.toShortDateString = function () {
    return String.format("{0}-{1}-{2}", this.getFullYear(), this.getMonth() + 1, this.getDate());
}
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

//#endregion
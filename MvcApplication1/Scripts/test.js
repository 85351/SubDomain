/* File Created: 二月 27, 2014 */
function Range(from, to) {
    this.f = from;
    this.t = to;

    function PopInfo() { alert("from " + this.f + " to " + this.t) }
    PopInfo();
}
Range.prototype.AlertFrom = function () {
    alert("from is " + this.f);
}
Range.prototype.AlertTo = function () {
    alert("to is " + this.t);
}

$("#txtTest").TextBoxValidator({
    maxCount: 10
});
$("#txtTest").TextBoxWatermark({
    watermarkText: "请输入文字",
    watermarkClass: "gray"
});

$("#btnMove").click(function () {
    var lnk = $("#lnkMtime")[0];
    var p1 = $("#p1")[0];
    p1.appendChild(lnk);
});
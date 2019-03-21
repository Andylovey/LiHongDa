module.exports = {
  toThousands: toThousands,
  changeDate: changeDate
}

// 千分数计算
function toThousands(num) {
    if (num == null || num == '') {
        num = 0.00;
    }
    var num = (parseFloat(num).toFixed(2) || 0).toString(), result = '';
    for (var i = 0; num.length > 3; i++) {
        if (i == 0 && num.length > 6) {
            result = ',' + num.slice(-6) + result;
            num = num.slice(0, num.length - 6);
        } else {
            if (num.indexOf('.') < 0) {
                result = ',' + num.slice(-3) + result;
                num = num.slice(0, num.length - 3);
            } else {
                break ;
            }
        }
    }
    if (num) { result = num + result; }
    return result;
}

// 转化日期 Y-M-D
function changeDate(value) {
    var resulte = '';
    if (value != null) {
        var date = new Date();
        date.setTime(value);
        var year = date.getFullYear().toString();
        var month = (date.getMonth() + 1).toString();
        var day = date.getDate().toString();
        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }
        resulte = year + '-' + month + '-' + day;
    }
    return resulte
}
/**
 * Created by zhangrc on 2017/12/12.
 */

//加法计算
function accAdd(arg1, arg2) {
    var strArg1 = arg1.toString(), strArg2 = arg2.toString();
    var r1 = 0, r2 = 0, m = 0, n = 0;
    try {
        var arr1 = strArg1.split(".");
        r1 = (arr1.length == 1 ? 0 : arr1[1].length);
    } catch (e) {
        r1 = 0
    }
    try {
        var arr2 = strArg2.split(".");
        r2 = (arr2.length == 1 ? 0 : arr2[1].length);
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = r1 - r2;
    var numArg1 = Number(strArg1.replace(".", ""));
    var numArg2 = Number(strArg2.replace(".", ""));
    if(n >= 0){
        numArg2 *= Math.pow(10, n);
    }else{
        numArg1 *= Math.pow(10, Math.abs(n));
    }

    var sum = numArg1 + numArg2;
    return sum / m;
}

Number.prototype.add = function (arg) {
    return accAdd(arg, this);
};

//减法计算
function accSub(arg1, arg2) {
    var strArg1 = arg1.toString(), strArg2 = arg2.toString();
    var r1 = 0, r2 = 0, m = 0, n = 0;
    try {
        var arr1 = strArg1.split(".");
        r1 = (arr1.length == 1 ? 0 : arr1[1].length);
    } catch (e) {
        r1 = 0
    }
    try {
        var arr2 = strArg2.split(".");
        r2 = (arr2.length == 1 ? 0 : arr2[1].length);
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = r1 - r2;
    var numArg1 = Number(strArg1.replace(".", ""));
    var numArg2 = Number(strArg2.replace(".", ""));
    if(n >= 0){
        numArg2 *= Math.pow(10, n);
    }else{
        numArg1 *= Math.pow(10, Math.abs(n));
    }
    var difference = numArg1 - numArg2;
    return difference / m;
}
Number.prototype.sub = function (arg) {
    return accSub(this, arg);
};

//乘法计算
function accMul(arg1, arg2) {
    var strArg1 = arg1.toString(), strArg2 = arg2.toString(), m = 0;
    try {
        var arr1 = strArg1.split(".");
        m += (arr1.length == 1 ? 0 : arr1[1].length);
    } catch (e) {
        m += 0;
    }
    try {
        var arr2 = strArg2.split(".");
        m += (arr2.length == 1 ? 0 : arr2[1].length);
    } catch (e) {
        m += 0;
    }

    return Number(strArg1.replace(".", "")) * Number(strArg2.replace(".", "")) / Math.pow(10, m);
}

Number.prototype.mul = function (arg) {
    return accMul(arg, this);
};

//除法计算
function accDiv(arg1, arg2) {
    var strArg1 = arg1.toString(), strArg2 = arg2.toString(), r1 = 0, r2 = 0;
    try {
        var arr1 = strArg1.split(".");
        r1 = arr1.length == 1 ? 0 : arr1[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        var arr2 = strArg2.split(".");
        r2 = arr2.length == 1 ? 0 : arr2[1].length;
    } catch (e) {
        r2 = 0;
    }

    var divisor = Number(strArg1.replace(".", "")) / Number(strArg2.replace(".", ""));
    return divisor * Math.pow(10, r2 - r1);
}

Number.prototype.div = function (arg) {
    return accDiv(this, arg);
};

//可把Number四舍五入为指定小数位数的数字
Number.prototype.toFixed=function(len)
{
    var add = 0;
    var s1 = this + "";
    var start = s1.indexOf(".");
    if(s1.substr(start+len+1,1)>=5)add=1;
    var temp = Math.pow(10,len);
    var s = Math.floor(this * temp) + add;
    return s/temp;
};


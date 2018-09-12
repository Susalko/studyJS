"use strict";
alert('Hello World');

var admin;
var name = "Василий";
admin = name;

alert(admin);

//именование переменных
var Planet = "Земля";
var UserName = "Петя";

var name = prompt('Как вас зовут?', '');
alert(name);

var unsver = prompt('Каково «официальное» название JavaScript?', '');

if (unsver == 'ECMAScript'){
    alert('Верно')
} else {
    alert('Не знаете? «ECMAScript»!');
}

var value = prompt('введите число', '');

if (value > 0 ){
    alert(1);
} else if (value < 0){
    alert(-1);
} else if (value == 0){
    alert(0);
}

var a,b,result;
 result = (a + b < 4) ? 'vfkj' : 'dsds';

 var login;
 var message = (login == 'Вася') ? 'Hi' :
                (login == 'Director') ? 'Hello' :
                    (login == null) ? 'no login' : '';

 /// function

function min(a ,b) {
    return (a < b) ? a : b;
}

function pow(x, n) {
    var result = x;

    for (var i = 1; i <= n; i++){
        result *= x;
    }
    return result;
}

//////////// рекурсия
function powNew(x, n) {
    if (n != 1){
        return x * pow(x, n - 1)
    } else {
        return x;
    }
}

function sumTo(n) {
    if (n == 1) return 1;

    return n + sumTo(n - 1);
}

function fuctorial(n) {
    if (n == 1) return 1;

    return n * fuctorial(n - 1);
}

function fibonachi(n) {
    if (n < 1) return n;
    return fibonachi(n - 1) + fibonachi(n - 2);
}

function fibonachiCircl(n) {
    var  a = 1, b = 1;

    for (var i = 3; i < n; i++){
        var c = a + b;
        a = b;
        b = c;
    }
    return b;
}
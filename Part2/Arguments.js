"use strict"


// Напишите функцию sum(...), которая возвращает сумму всех своих аргументов:
function sum() {
    var result = 0;
    if (arguments.length > 0){
        for (var i = 0; i < arguments.length; i++){
            result += arguments[i];
        }
        return result;
    }
    return result;
}

//////////////
// Как в функции отличить отсутствующий аргумент от undefined?
// function f(x) {
//     // ..ваш код..
//     // выведите 1, если первый аргумент есть, и 0 - если нет
// }
//
// f(undefined); // 1
// f(); // 0

function f(x) {
    alert( arguments.length ? 1 : 0 );
}

f(undefined);
f();
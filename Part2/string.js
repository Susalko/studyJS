// Мы не можем просто заменить первый символ, т.к. строки в JavaScript неизменяемы.
//
//     Но можно пересоздать строку на основе существующей, с заглавным первым символом:
//
//     var newStr = str[0].toUpperCase() + str.slice(1);
//
// Однако, есть небольшая проблемка – в случае, когда строка пуста, будет ошибка.
//
//     Ведь str[0] == undefined, а у undefined нет метода toUpperCase().
//
//

function ucFirst(str) {
    // только пустая строка в логическом контексте даст false
    if (!str) return str;

    return str[0].toUpperCase() + str.slice(1);
}

alert( ucFirst("вася") );

// Напишите функцию checkSpam(str), которая возвращает true, если строка str содержит „viagra“ или „XXX“, а иначе false.
//
//     Функция должна быть нечувствительна к регистру:
function checkSpam(str) {
    var lowerStr = str.toLowerCase();

    return !!(~lowerStr.indexOf('viagra') || ~lowerStr.indexOf('xxx'));
}

alert( checkSpam('buy ViAgRA now') );
alert( checkSpam('free xxxxx') );
alert( checkSpam("innocent rabbit") );

// Создайте функцию truncate(str, maxlength), которая проверяет длину строки str, и если она превосходит maxlength – заменяет конец str на "...", так чтобы ее длина стала равна maxlength.
//
//     Результатом функции должна быть (при необходимости) усечённая строка.
//
//     Например:
//
// truncate("Вот, что мне хотелось бы сказать на эту тему:", 20) = "Вот, что мне хоте..."
//
// truncate("Всем привет!", 20) = "Всем привет!"
//
// Эта функция имеет применение в жизни. Она используется, чтобы усекать слишком длинные темы сообщений.
//
//     P.S. В кодировке Unicode существует специальный символ «троеточие»: … (HTML: &hellip;), но в этой задаче подразумеваются именно три точки подряд.
function truncate(str, maxlength) {
    if (str.length > maxlength) {
        return str.slice(0, maxlength - 3) + '...';
        // итоговая длина равна maxlength
    }

    return str;
}

alert( truncate("Вот, что мне хотелось бы сказать на эту тему:", 20) );
alert( truncate("Всем привет!", 20) );


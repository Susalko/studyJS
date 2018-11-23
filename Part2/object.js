// проверка на пустоту объекта
function isEmpty(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}
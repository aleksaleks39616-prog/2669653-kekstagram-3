// Функция проверки длины строки:
function checkStiongLenght(string, maxLength) {
  return string.length <= maxLength;
}
checkStringLength('Мой проект', 20);

// Функция проверки на палиндром:
function checkPalindrom (string) {
let cleanded = string.replaceAll(' ', '').toLowerCase();
let reversed = '';
for (let i = cleaned.length - 1; i >= 0; i--) {
    reversed += normalized[i];
}
return cleanded === reversed;
}

checkPalindrom ('топот');

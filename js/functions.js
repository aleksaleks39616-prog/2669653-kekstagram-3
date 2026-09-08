// Функция проверки длины строки:
function checkStringLenght(string, maxLength) {
  return string.lenght <= maxLength;
}
checkStringLength('Мой проект', 20);

// Функция проверки на палиндром:
function checkPalindrom (string) {
let cleanded = string.replaceAll(' ', '').toLowerCase();
let reversed = '';
for (let i = cleaned.length - 1; i >= 0; i--) {
    reversed += cleaned[i];
}
return cleaned === reversed;
}

checkPalindrom ('топот');

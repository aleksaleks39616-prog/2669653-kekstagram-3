
//Модуль валидации формы

// Поиск элементов

const uploadInput = document.querySelector('.img-upload__input'); //выбор файла,  change открывает форму
const uploadOverlay = document.querySelector('.img-upload__overlay');
const previewImg = document.querySelector('.img-upload__preview img');
const scaleSmallerButton = document.querySelector('.scale__control--smaller'); //кнопка уменьшения
const scaleBiggerButton = document.querySelector('.scale__control--bigger'); //кнопка увеличения
const scaleValueInput = document.querySelector('.scale__control--value'); // значение масштаба

const SCALE_STEP = 25; //  изменения масштаба
const SCALE_MIN = 25; // минимальный масштаб
const SCALE_MAX = 100; // максимальный масштаб
let currentScale = SCALE_MAX; //  масштаб по умолчанию



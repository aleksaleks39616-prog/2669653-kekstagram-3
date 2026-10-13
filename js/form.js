
// Поиск элементов

const uploadInput = document.querySelector('.img-upload__input'); //выбор файла,  change открывает форму
const uploadOverlay = document.querySelector('.img-upload__overlay');
const previewImg = document.querySelector('.img-upload__preview img');
const scaleSmallerButton = document.querySelector('.scale__control--smaller'); //кнопка уменьшения
const scaleBiggerButton = document.querySelector('.scale__control--bigger'); //кнопка увеличения
const scaleValueInput = document.querySelector('.scale__control--value'); // значение масштаба
// Элементы закрытия формы
const uploadForm = document.querySelector('.img-upload__form');
const uploadCancelButton = document.querySelector('.img-upload__cancel');

// Состояние масштаба изображение
const SCALE_STEP = 25; //  изменения масштаба
const SCALE_MIN = 25; // минимальный масштаб
const SCALE_MAX = 100; // максимальный масштаб
let currentScale = SCALE_MAX; //  масштаб по умолчанию

// Функция открытия формы

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

//Обработчик выбора файла

uploadInput.addEventListener('change', () => {
  const file = uploadInput.files[0];

  // Файла нет или это не картинка: форму не открываем
  if (!file || !file.type.startsWith('image/')) {
    uploadInput.value = '';
    return;
  }

  openUploadForm();
});

// Закрытие формы (1.3 ТЗ)

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');


  uploadForm.reset();


  uploadInput.value = '';
};

// Кнопка «Закрыть»
uploadCancelButton.addEventListener('click', () => {
  closeUploadForm();
});

// Esc закрывает форму
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && !uploadOverlay.classList.contains('hidden')) {
    closeUploadForm();
  }
});

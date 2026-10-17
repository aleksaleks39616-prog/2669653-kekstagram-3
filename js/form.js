
// Поиск элементов и объявление переменных
const SCALE_STEP = 25; //  изменения масштаба
const SCALE_MIN = 25; // минимальный масштаб
const SCALE_MAX = 100; // максимальный масштаб
const uploadInput = document.querySelector('.img-upload__input'); //выбор файла,  change открывает форму
const uploadOverlay = document.querySelector('.img-upload__overlay');
const previewImg = document.querySelector('.img-upload__preview img');
const scaleSmallerButton = document.querySelector('.scale__control--smaller'); //кнопка уменьшения
const scaleBiggerButton = document.querySelector('.scale__control--bigger'); //кнопка увеличения
const scaleValueInput = document.querySelector('.scale__control--value'); // значение масштаба
// Элементы закрытия формы
const uploadForm = document.querySelector('.img-upload__form');
const uploadCancelButton = document.querySelector('.img-upload__cancel');
const hashtagsInput = document.querySelector('.text__hashtags');//поиск элемента хештега
const commentInput = document.querySelector('.text__description');


//Переменные для слайдера
const effectLevelBlock = document.querySelector('.img-upload__effect-level'); // Контейнер слайдера, скрыт для «Оригинала»
const effectsList = document.querySelector('.img-upload__effects'); // блок с эффектами
const effectSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');


// Состояние масштаба изображение

let currentScale = SCALE_MAX; //  масштаб по умолчанию
let currentEffect = 'none'// эффект по умолчанию

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


// Валидация хештегов

//Поиск элемента


// Функция разбивает строку на отдельные хэштеги по пробелам, пустые элементы отбрасываем
const getHashtags = (value) => value.trim().split(/\s+/).filter(Boolean);

//Хэштег начинается с символа # (решётка);

const hasValidCharacters = (value) =>
  getHashtags(value).every((tag) => /^#[a-zа-яё0-9]+$/i.test(tag));

//хэштег не может состоять только из решётки

const isNotOnlyHash = (value) => {
  const tags = getHashtags(value);
  for (const tag of tags) {
    if (tag === '#') {
      return false;
    }
  }
  return true;
};


// Длина каждого хэштега, включая решётку, не больше 20 символов
const isLengthValid = (value) => getHashtags(value).every((tag) => tag.length <= 20);


//Нельзя указать больше пяти хэштегов

const isCountValid = (value) => getHashtags(value).length <= 5;


// Без повторов, регистр не учитываем (#ХэшТег и #хэштег одинаковы)
const isUnique = (value) => {
  const tags = getHashtags(value).map((tag) => tag.toLowerCase());
  return new Set(tags).size === tags.length;
};

//Если фокус находится в поле ввода хэштега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.

const isTextFieldFocused = () => document.activeElement === hashtagsInput || document.activeElement === commentInput;

document.addEventListener('keydown', (evt) => {
  if (evt.key !== 'Escape') {
    return;
  }

  if (uploadOverlay.classList.contains('hidden')) {
    return;
  }

  if (isTextFieldFocused()) {
    return;
  }

  closeUploadForm();
});

// Валидация комментариев


const isCommentValid = (value) => value.length <= 140;


// Pristine

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__field-wrapper--success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'pristine-error',
});

pristine.addValidator(hashtagsInput, isNotOnlyHash, 'Хэштег не может состоять из одной решётки');
pristine.addValidator(hashtagsInput, hasValidCharacters, 'Хэштег должен начинаться с # и содержать только буквы и цифры');
pristine.addValidator(hashtagsInput, isLengthValid, 'Максимальная длина хэштега 20 символов');
pristine.addValidator(hashtagsInput, isCountValid, 'Нельзя указать больше пяти хэштегов');
pristine.addValidator(hashtagsInput, isUnique, 'Один и тот же хэштег нельзя использовать дважды');
pristine.addValidator(commentInput, isCommentValid, 'Комментарий не может быть длиннее 140 символов');

uploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

//Масштабирование

// Функция применения масштаба
const applyScale = (value) => {
  currentScale = value;
  scaleValueInput.value = `${value}%`;
  previewImg.style.transform = `scale(${value / 100})`;
};

//   Клик по кнопкам: шаг и границы
const changeScale = (factor) => {
  const newScale = Math.min(
    Math.max(currentScale + SCALE_STEP * factor, SCALE_MIN), SCALE_MAX);

  applyScale(newScale);
};


//Кнопки
scaleSmallerButton.addEventListener('click', () => changeScale(-1));
scaleBiggerButton.addEventListener('click', () => changeScale(1));

// Слайдер (эффекты как данные)

const EFFECTS = {
  chrome: {
    filter: 'grayscale',
    units: '',
    min: 0,
    max: 1,
    step: 0.1,
    decimals: 1,
  },
  sepia: {
    filter: 'sepia',
    units: '',
    min: 0,
    max: 1,
    step: 0.1,
    decimals: 1,
  },
  marvin: {
    filter: 'invert',
    units: '%',
    min: 0,
    max: 100,
    step: 1,
    decimals: 0,
  },
  phobos: {
    filter: 'blur',
    units: 'px',
    min: 0,
    max: 3,
    step: 0.1,
    decimals: 1,
  },
  heat: {
    filter: 'brightness',
    units: '',
    min: 1,
    max: 3,
    step: 0.1,
    decimals: 1,
  },
};

//Создаём слайдер

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

//Применение эффекта

const applyEffect = (value) => {
  const settings = EFFECTS[currentEffect];

  if (!settings) {
    previewImg.style.filter = '';
    effectLevelValue.value = '';

    return;
  }

  const number = Number(value).toFixed(settings.decimals);

  previewImg.style.filter = `${settings.filter}(${number}${settings.units})`;
  effectLevelValue.value = number;
};

// Обработчик движения ползунка
effectSlider.noUiSlider.on('update', (values) => {
  applyEffect(parseFloat(values[0]));
});

// Обработчик выбора эффекта

const onEffectChange = (evt) => {
  if (!evt.target.matches('input[name="effect"]')) {
    return;
  }

  currentEffect = evt.target.value;

  if (currentEffect === 'none') {
    applyEffect(0);
    effectLevelBlock.classList.add('hidden');

    return;
  }

  const settings = EFFECTS[currentEffect];

  effectLevelBlock.classList.remove('hidden');

  effectSlider.noUiSlider.updateOptions({
    range: { min: settings.min, max: settings.max },
    step: settings.step,
    start: settings.max,
  });
};

effectsList.addEventListener('change', onEffectChange);

// Модель отрисовки фото


const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const photoFragment = document.createDocumentFragment();

const createPicture = function (photoGallery) {
  const photoElement = pictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photoGallery.url;
  photoElement.querySelector('.picture__img').alt = photoGallery.description;
  photoElement.querySelector('.picture__likes').textContent = photoGallery.likes;
  photoElement.querySelector('.picture__comments').textContent = photoGallery.comments.length;

  return photoElement;

};

const renderPhotos = function (pictures) {
  pictures.forEach(function (picture) {
    const pictureElement = createPicture(picture);
    photoFragment.append(pictureElement);
  });

  picturesContainer.append(photoFragment);
};


export { renderPhotos };



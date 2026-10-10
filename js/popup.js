// Модулья открытия и закрытия

// Создание переменных (поиск)
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const loaderComments = bigPicture.querySelector('.comments-loader');
const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const pictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const commentSample = socialComments.querySelector('.social__comment');


// 
const fillBigPicture = function (photo) {
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  likesCount.textContent = photo.likes;
  socialCaption.textContent = photo.description;
  commentShownCount.textContent = photo.comments.length;
  commentTotalCount.textContent = photo.comments.length;

  socialCommentsCount.classList.add('hidden');
  loaderComments.classList.add('hidden');

  socialComments.innerHTML = '';


  const commentsFragment = document.createDocumentFragment();
  photo.comments.forEach((comment) => {
    const commentItem = commentSample.cloneNode(true);
    const commentAvatar = commentItem.querySelector('.social__picture');
    const commentText = commentItem.querySelector('.social__text');

    commentAvatar.src = comment.avatar;
    commentAvatar.alt = comment.name;
    commentText.textContent = comment.message;

    commentsFragment.append(commentItem);
  });

  socialComments.append(commentsFragment);

};

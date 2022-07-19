const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarInput = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const imagesInput = document.querySelector('.ad-form__upload input[type=file]');
const imagePreview = document.querySelector('.ad-form__photo');

const checkFileType = (inputElement) => {
  const fileName = inputElement.files[0].name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

avatarInput.addEventListener('change', () => {
  const matches = checkFileType(avatarInput);
  if (matches) {
    avatarPreview.src = URL.createObjectURL(avatarInput.files[0]);
  }
});

imagesInput.addEventListener('change', () => {
  const matches = checkFileType(imagesInput);

  if (!imagePreview.querySelector('img')) {
    const imageFragment = document.createDocumentFragment();
    const image = document.createElement('img');
    image.height = '70';
    image.width = '70';
    imageFragment.appendChild(image);
    imagePreview.appendChild(imageFragment);
  }
  if (matches) {
    imagePreview.querySelector('img').src = URL.createObjectURL(imagesInput.files[0]);
  }
});


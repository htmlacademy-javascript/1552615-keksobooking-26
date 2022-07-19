const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarInput = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const imagesInput = document.querySelector('.ad-form__upload input[type=file]');
const imagePreview = document.querySelector('.ad-form__photo');

avatarInput.addEventListener('change', () => {
  const file = avatarInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

imagesInput.addEventListener('change', () => {
  const file = imagesInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const imageFragment = document.createDocumentFragment();
    const image = document.createElement('img');
    image.width = '70';
    image.height = '70';
    image.src = URL.createObjectURL(file);
    imageFragment.appendChild(image);
    imagePreview.appendChild(imageFragment);
  }
});


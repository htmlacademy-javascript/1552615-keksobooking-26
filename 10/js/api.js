import { showAlert } from './util.js';

const GET_URL = 'https://26.javascript.pages.academy/keksobooking/data';

const SEND_URL = 'https://26.javascript.pages.academy/keksobooking';

const getData = (onSuccess) => {
  fetch(GET_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`
      ${response.status}
      ${response.statusText}
      `);
    })
    .then((offers) => {
      onSuccess(offers);
    })
    .catch((err) => {
      showAlert(`Ошибка! ${err.message}`);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SEND_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if(response.ok){
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };

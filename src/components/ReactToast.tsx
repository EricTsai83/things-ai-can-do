'use client';

import { Bounce, Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export function FlipToastContainer() {
  return (
    <ToastContainer
      transition={Flip}
      toastStyle={{
        backgroundColor: 'rgb(13 148 136)',
        color: '#ffffff',
      }}
      position="top-center"
      autoClose={3500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="light"
    />
  );
}

export function BounceToastContainer() {
  return (
    <ToastContainer
      transition={Bounce}
      toastStyle={{
        backgroundColor: 'rgb(244 63 94)',
        color: '#ffffff',
      }}
      position="top-center"
      autoClose={3500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="light"
    />
  );
}

export function apiNotify() {
  toast.info('模型佔用中，請稍後再試！', {
    position: 'top-center',
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
}

const imgSizeMsg = () => (
  <pre>{`\
  圖片過大，請用小一點的
  圖像來節省運算資元！
  (上限為 1.5 MB)`}</pre>
);

export function imgSizeNotify() {
  toast.info(imgSizeMsg, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
}

export function newsletterSubscribeSuccessNotify() {
  toast.info('電子報訂閱成功', {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
}

export function newsletterSubscribeFailureNotify() {
  toast.error('email 格式錯誤', {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
}

export function puzzleCompletedNotify() {
  toast.error('完成拼圖', {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
}

export function limitedImgNumNotify() {
  toast.error('照片最多上傳 6 張 😰', {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
}

export function uploadWrongImgFormatNotify() {
  toast.error('只能上傳 jpeg 和 png 的檔案喔!', {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
}

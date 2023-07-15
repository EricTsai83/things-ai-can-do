'use client';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer, toast, Flip, Bounce } from 'react-toastify';

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

export function StyledToastContainer() {
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

export function newsletterSubscribeSuccess() {
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

export function newsletterSubscribeFailure() {
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

'use client';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer, toast, Flip } from 'react-toastify';

export function notify() {
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

export function StlyedToastContainer() {
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

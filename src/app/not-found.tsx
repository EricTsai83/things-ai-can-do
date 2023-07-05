import Image from 'next/image';
import pageNotFound from './assets/404-page-not-found.png';
function Custom404() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Image
        src={pageNotFound}
        alt="404 page not found"
        width={800}
        height={800}
      />
    </div>
  );
}

export default Custom404;

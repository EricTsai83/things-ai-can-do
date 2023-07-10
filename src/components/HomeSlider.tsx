'use client';
// slider image
import chatbot from '@/assets/home-carousel/chatbot.png';
import facialRecognation from '@/assets/home-carousel/facial-recognition.jpg';
import imageClassification from '@/assets/home-carousel/image-classification.png';
import imageSegmation from '@/assets/home-carousel/image-segmation.png';
import postDetection from '@/assets/home-carousel/post-detection.webp';
import textToImage from '@/assets/home-carousel/text-to-image.jpeg';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper';
import Image from 'next/image';

const slides = [
  chatbot,
  facialRecognation,
  imageClassification,
  imageSegmation,
  postDetection,
  textToImage,
];

// const slides = [
//   {
//     image: chatbot.src,
//     title: 'Chatbot',
//     subTitle: 'jhfodhohofho hodhsoidhsfidsfh jiojfdi',
//     intetrval: 1500,
//   },
//   {
//     image: facialRecognation.src,
//     title: 'Facial Recognation',
//     subTitle: 'jhfodhohofho hodhsoidhsfidsfh jiojfdi',
//     intetrval: 1500,
//   },
//   {
//     image: imageClassification.src,
//     title: 'Image Classification',
//     subTitle: 'jhfodhohofho hodhsoidhsfidsfh jiojfdi',
//     intetrval: 1500,
//   },
//   {
//     image: imageSegmation.src,
//     title: 'Image Segmation',
//     subTitle: 'jhfodhohofho hodhsoidhsfidsfh jiojfdi',
//     intetrval: 1500,
//   },
//   {
//     image: postDetection.src,
//     title: 'Post Detection',
//     subTitle: 'jhfodhohofho hodhsoidhsfidsfh jiojfdi',
//     intetrval: 1500,
//   },
//   {
//     image: textToImage.src,
//     title: 'Text To Image',
//     subTitle: 'jhfodhohofho hodhsoidhsfidsfh jiojfdi',
//     intetrval: 1500,
//   },
// ];

function HomeSlider() {
  return (
    <div className="container">
      {/* <h1 className="heading">Flower Gallery</h1> */}
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container">
        {slides.map((slide, idx) => {
          return (
            <div className="flex w-full items-center justify-center" key={idx}>
              <SwiperSlide className="w-full">
                <Image
                  src={slide}
                  alt="slide image"
                  sizes="100vw"
                  style={{
                    width: '100%',
                    height: '550px',
                  }}
                />
              </SwiperSlide>
            </div>
          );
        })}
        {/* <div className="slider-controler">
        <div className="swiper-button-prev slider-arrow">
          <ion-icon name="arrow-back-outline"></ion-icon>
        </div>
        <div className="swiper-button-next slider-arrow">
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </div>
        <div className="swiper-pagination"></div>
      </div> */}
      </Swiper>
    </div>
  );
}

export default HomeSlider;

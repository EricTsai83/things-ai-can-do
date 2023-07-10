'use client';
// slider image
import chatbot from '@/assets/home-carousel/GPT-3.webp';
import facialRecognation from '@/assets/home-carousel/facial-recognition.jpg';
import imagesegmentation from '@/assets/home-carousel/image-seg.png';
import textToImage from '@/assets/home-carousel/stable-diffusion.png';
import avatar from '@/assets/home-carousel/avatar.png';
import bodyDetection from '@/assets/home-carousel/body-detection.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper';
import Image from 'next/image';
import Link from 'next/link';
import './HomeSlider.Style.css';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';

const slides = [
  {
    id: 0,
    image: chatbot,
    title: 'Chatbot-Slides',
    url: '/playground/chat-gpt',
  },
  {
    id: 1,
    image: facialRecognation,
    title: 'Facial-Recognation-Slides',
    url: '/playground/facial-recognition',
  },
  {
    id: 2,
    image: imagesegmentation,
    title: 'Image-Segmation-Slides',
    url: '/playground/human-image-matting',
  },
  {
    id: 3,
    image: textToImage,
    title: 'Text-To-Image-Slides',
    url: '/playground/create-your-own-puzzle',
  },
  {
    id: 4,
    image: avatar,
    title: 'Avatar',
    url: '/playground/facial-recognition',
  },
  {
    id: 5,
    image: bodyDetection,
    title: 'bodt-detection',
    url: '/tech-intro/real-time-pose-estimation',
  },
];

function HomeSlider() {
  return (
    <div className="container">
      <Swiper
        className="swiper_container"
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
        modules={[EffectCoverflow, Pagination, Navigation]}>
        {slides.map((slide) => {
          return (
            <SwiperSlide key={slide.title}>
              <Link href={slide.url}>
                <Image
                  src={slide.image}
                  alt="slide image"
                  width={0}
                  height={0}
                  style={{
                    width: '75%',
                    height: '320px',
                    objectFit: 'cover',
                  }}
                  quality={100}
                />
              </Link>
            </SwiperSlide>
          );
        })}

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <BiSolidLeftArrow className="absolute -top-1/4 mr-3 text-6xl text-gray-300 hover:text-teal-300 active:text-gray-100" />
          </div>
          <div className="swiper-button-next slider-arrow">
            <BiSolidRightArrow className="absolute -top-1/4 ml-3 text-6xl text-gray-300 hover:text-teal-300 active:text-gray-100" />
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
}

export default HomeSlider;

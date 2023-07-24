'use client';

import Image from 'next/image';
import Link from 'next/link';
import chatbot from '@/assets/home-carousel/GPT-3.webp';
import avatar from '@/assets/home-carousel/avatar.jpeg';
import facialRecognation from '@/assets/home-carousel/facial-recognition.jpg';
import imageSegmentation from '@/assets/home-carousel/image-segmentation.png';
import textToImage from '@/assets/home-carousel/stable-diffusion.png';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import { EffectCoverflow, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import './HomeSlider.Style.css';

const slides = [
  {
    id: 0,
    image: facialRecognation,
    title: 'Facial-Recognation-Slides',
    url: '/playground/facial-recognition',
  },
  {
    id: 1,
    image: chatbot,
    title: 'Chatbot-Slides',
    url: '/playground/chat-gpt',
  },
  {
    id: 2,
    image: imageSegmentation,
    title: 'Image-Segmation-Slides',
    url: '/playground/image-segmentation',
  },
  {
    id: 3,
    image: textToImage,
    title: 'Text-To-Image-Slides',
    url: '/playground/text-to-image',
  },
  {
    id: 4,
    image: avatar,
    title: 'Avatar',
    url: '/playground/facial-recognition',
  },
];

function HomeSlider() {
  return (
    <>
      <div className="container">
        <Swiper
          className="relative"
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 150,
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
              <SwiperSlide key={slide.title} className="w-3/5">
                <Link href={slide.url}>
                  <Image
                    className="max-h-96 w-full rounded-3xl object-cover "
                    src={slide.image}
                    alt="slide image"
                    width={0}
                    height={0}
                    quality={60}
                  />
                </Link>
              </SwiperSlide>
            );
          })}

          <div className="slider-controler">
            <div className="swiper-button-prev slider-arrow">
              <BiSolidLeftArrow className="absolute -top-1/4 mr-3 text-6xl text-gray-300 hover:text-teal-300 active:text-gray-100" />
            </div>
            <div className="swiper-button-next slider-arrow w-6">
              <BiSolidRightArrow className="absolute -top-1/4 ml-3 text-6xl text-gray-300 hover:text-teal-300 active:text-gray-100" />
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
      </div>

      <div className="mobile-container flex flex-col gap-7">
        {slides.map((slide, idx) => {
          return (
            <Link href={slide.url} key={idx}>
              <div key={slide.title} className="w-full">
                <Image
                  className="max-h-96 w-full rounded-3xl object-cover "
                  src={slide.image}
                  alt="slide image"
                  width={0}
                  height={0}
                  quality={100}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default HomeSlider;

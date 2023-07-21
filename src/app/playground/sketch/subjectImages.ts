import { StaticImageData } from 'next/image';
import bus from './img/bus.png';
import lighter from './img/lighter.png';
import lipstick from './img/lipstick.png';
import microphone from './img/microphone.png';
import penguin from './img/penguin.png';
import piano from './img/piano.png';
import snake from './img/snake.png';
import table from './img/table.png';
import telephone from './img/telephone.png';

interface SubjectImages {
  [key: string]: StaticImageData;
}

const subjectImages: SubjectImages = {
  公車: bus,
  打火機: lighter,
  口紅: lipstick,
  麥克風: microphone,
  企鵝: penguin,
  鋼琴: piano,
  蛇: snake,
  桌子: table,
  電話: telephone,
};
export default subjectImages;

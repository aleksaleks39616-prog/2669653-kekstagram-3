import { generatePhotos} from './data.js';
import { renderPhotos} from  './pictures.js';
const PHOTO_COUNT = 25;
const photos = generatePhotos(PHOTO_COUNT);
console.log(photos);
renderPhotos(photos);

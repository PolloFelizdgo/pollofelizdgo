import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dw55kbkmn',
  api_key: process.env.CLOUDINARY_API_KEY || '979973118959516',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'LPS1NIEDqfe25uErHaj3py0WYN0',
  secure: true,
});

export default cloudinary;

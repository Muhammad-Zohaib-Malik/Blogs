import { v2 as cloudinary } from 'cloudinary'

export const cloudinaryConfig = async () => {
  try {
    await cloudinary.config({
      cloud_name: 'dmyf0syin',
      api_key: "924415157651735",
      api_secret: '6GxnsJVo3J-KGyTIuBtKKT1ubW4'
    });
    console.log('cloudianry configuration successfully')

  } catch (error) {
    console.log('error while configure config cloudinary')
    console.log(error)

  }

}
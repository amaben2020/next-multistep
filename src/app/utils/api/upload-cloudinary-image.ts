import axios from "axios";

export const uploadImageToCloudinary = async (formData: FormData) => {
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData,
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

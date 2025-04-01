import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  // Append image file to form data
  formData.append("image", imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Set header for file upload
        },
      }
    );
    // console.log("Upload response:", response); // Debugging
    return response.data; // Return response data
  } catch (error) {
    console.error("Error uploading the image:", error);
    throw error; // Rethrow error for handling
  }
};

// const uploadImage = async (imageFile) => {
//   if (!imageFile) {
//     console.error("No file selected for upload.");
//     return null;
//   }

//   const formData = new FormData();
//   formData.append("image", imageFile);

//   try {
//     const response = await axiosInstance.post(
//       API_PATHS.IMAGE.UPLOAD_IMAGE,
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     console.log("Upload response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error(
//       "Upload failed:",
//       error.response?.data || error.message || "Unknown error"
//     );
//     return null;
//   }
// };

export default uploadImage;

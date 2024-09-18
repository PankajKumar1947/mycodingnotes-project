import { createImageUpload } from "novel/plugins";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { imageDb } from '@/Services/firebase/Config'; 
import { v4 } from 'uuid';
import toast from 'react-hot-toast';

const onUpload = (file: File) => {
  const storageRef = ref(imageDb, `pagesImg/${v4()}`);

  const promise = uploadBytes(storageRef, file).then(async (snapshot) => {
    // Successfully uploaded image, now get the download URL
    const url = await getDownloadURL(snapshot.ref);
    return url;
  });

  return new Promise((resolve, reject) => {
    toast.promise(
      promise.then((url) => {
        // Preload the image to verify it loads
        const image = new Image();
        image.src = url;
        image.onload = () => {
          resolve(url); // Resolve with the Firebase URL
        };
      }),
      {
        loading: "Uploading image ...",
        success: "Image uploaded successfully.",
        error: (e) => {
          reject(e);
          return "Error uploading image. Please try again.";
        },
      }
    );
  });
};


export const uploadFn = createImageUpload({
  onUpload,
  validateFn: (file) => {
    if (!file.type.includes("image/")) {
      toast.error("File type not supported.");
      return false;
    }
    if (file.size / 1024 / 1024 > 20) {
      toast.error("File size too big (max 20MB).");
      return false;
    }
    return true;
  },
});

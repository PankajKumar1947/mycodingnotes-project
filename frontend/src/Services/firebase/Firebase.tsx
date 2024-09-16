import { useState } from 'react';
import { imageDb } from './Config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

const Firebase = () => {
  const [img, setImg] = useState<File | null>(null); 

  const handleClick = async() => {
    if (img) {
      const imgRef = ref(imageDb, `files/${v4()}`);
      await uploadBytes(imgRef, img);
      const url = await getDownloadURL(imgRef);
      console.log("Image URL:", url);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => setImg(e.target.files?.[0] || null)} 
      />
      <button onClick={handleClick}>Upload</button> 
    </div>
  );
};

export default Firebase;

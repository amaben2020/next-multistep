"use client";

import { getCloudinaryImages } from "@/app/utils/api/get-cloudinary-images";
import { uploadImageToCloudinary } from "@/app/utils/api/upload-cloudinary-image";
import { buildUrl } from "cloudinary-build-url";
import { useEffect, useState } from "react";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");

  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      setImages(await getCloudinaryImages());
    })();
  }, []);

  console.log("images", images);

  const handleFileChange = (event: any) => {
    console.log(event.target.files);
    setFile(event.target.files[0]);
    setFilename(event.target.files[0].name);
  };

  const CLOUDINARY_ID = "0fda237e62029ae3f861d0eb41a1f7";

  const url = buildUrl(CLOUDINARY_ID, {
    cloud: {
      cloudName: "amaben",
    },
    transformations: {
      effect: {
        name: "pixelate",
        value: 40,
      },
    },
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    console.log("file", file);
    formData.append("upload_preset", "ca0scb40");

    await uploadImageToCloudinary(formData);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          border: "2px solid red",
        }}
      >
        <div>
          <input onChange={handleFileChange} type="file" />
          <label>{filename}</label>
        </div>
        <button type="submit">Upload</button>
      </form>

      {/* <div className={styles.card}>
        <Image src={url} alt="Galaxy" width={1000} height={750} />
        <h3>Cloudinary - Dynamic</h3>
      </div> */}
    </>
  );
};

export default UploadForm;

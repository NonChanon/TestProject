
import httpCommon from "../http-common";

const upload = (file: File, onUploadProgress: (progressEvent: any) => void): Promise<any> => {
  const formData = new FormData();

  formData.append("file", file);

  return httpCommon.post("/uploadImg", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

const getFiles = () => {
  return httpCommon.get("/image/img1.jpg");
};

const UploadService = {
  upload,
  getFiles,
};

export default UploadService;
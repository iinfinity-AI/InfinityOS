export async function UploadImage(image) {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "mern-p"); 
  
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dbbkoa5ce/image/upload", {
        method: "POST",
        body: data,
      });
  
      const json = await res.json();
      return json.url;
    } catch (err) {
      console.error("Upload failed", err);
      throw err;
    }
}
  
export default UploadImage;
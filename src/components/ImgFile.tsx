import React, { MouseEvent, useEffect, useState } from "react";

export default function ImgFile() {
  
  
  const [file, setFile] = useState<any>({
    
  });

  const handlefile = (e) => {
    setFile(e.target.files[0])
  }

  return (
    <div className="container">
      <input type="file" onChange={handlefile} />
      <button>Upload</button>
    </div>
  )
}

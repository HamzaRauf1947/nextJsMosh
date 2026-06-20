'use client'
import { CldUploadWidget,CldImage } from "next-cloudinary"
import { useState } from "react"

interface cloudinaryResult{
    public_id:string;
}
const UploadPage = () => {
   const [publicId,setPublicId] = useState('');
  return (
    <>
    {publicId && <CldImage src={publicId} width={270} height={180} alt="rockstar image"></CldImage>} 
    <CldUploadWidget 
    options={{
        sources:['local']
    }}
    uploadPreset="hellolooogta6"
    onSuccess={(result,widget)=>{
        if(result.event !== 'success') return;
        const info = result.info as cloudinaryResult
        setPublicId(info.public_id)
    }}>
        {({open})=> 
        <button className="btn btn-primary"
                onClick={()=>open()}
        >Upload</button>}
    </CldUploadWidget>
     </>
  )
}

export default UploadPage
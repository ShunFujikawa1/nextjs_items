import { useState } from "react"

const ImgInput = (props:any) => {
    const [imageFile, setImageFile] = useState<File | null>(null)

    const handleClick = async() => {
        try{
            if (!imageFile) return
            const data = new FormData()
            data.append("file", imageFile)
            data.append("upload_preset", "nextImages")
            data.append("cloud_name","dsvme7vyi")
            const response= await fetch("https://api.cloudinary.com/v1_1/dsvme7vyi/image/upload", {method: "POST", body: data})
            const jsonData = await response.json()
            await props.setImage(jsonData.url)
            alert("画像アップロード成功")
        }catch{
            alert("画像アップロード失敗")
        }
        }
    return (
        <div className="img-input">

            <input type="file" onChange= {(e)=> e.target.files && setImageFile(e.target.files[0])} accept="image/png, image/jpg"/>
            <button onClick={handleClick} disabled={!imageFile}>画像Upload</button>
        </div>
    )
}

export default ImgInput
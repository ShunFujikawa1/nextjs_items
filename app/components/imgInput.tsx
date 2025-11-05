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
    
    // ★ 共通のボタンスタイル（globals.css の button スタイルベース）
    const buttonBaseStyles = "text-base text-white border-none rounded-[5px] cursor-pointer w-full";
    
    // ★ ImgInput固有のボタンスタイル (globals.css の .img-input > button)
    const imgInputButtonStyles = [
        buttonBaseStyles,
        "p-0",                // padding
        "text-sm",            // font-size
        "h-[36px]",           // height
        "mb-0",               // margin-bottom
        "bg-[#858585]",       // background
        // レスポンシブ
        "max-[400px]:mt-[5px]",
        "max-[400px]:h-[30px]",
        // v4 ホバー構文
        "opacity-80-hover",
        "bg-gradient-to-br-hover from-[#FF63A4]-hover to-[#FFD873]-hover",
        // v4 disabled構文 (globals.css の :disabled, [disabled])
        "disabled:bg-[#ccc]",
        "disabled:text-[#999]",
        "disabled:cursor-not-allowed",
        "disabled:opacity-70",
        // v4 disabled + hover 構文
        "opacity-70-disabled-hover",
        "bg-[#ccc]-disabled-hover",
    ].join(" ");

    return (
        // ★ .img-input のスタイル
        <div className="grid grid-cols-[0.8fr_0.2fr] gap-2.5 mb-5 max-[400px]:grid-cols-1 max-[400px]:gap-[5px]">

            {/* ★ input[type="file"] のスタイル (globals.css の .img-input > input[type="file"]) */}
            <input 
                type="file" 
                onChange= {(e)=> e.target.files && setImageFile(e.target.files[0])} 
                accept="image/png, image/jpg"
                className={[
                    "block",
                    "bg-[#ddd]",          // background-color
                    "py-[4px] px-[5px]",  // padding
                    "border border-[#ccc]", // border
                    "rounded-[5px]",      // border-radius
                    "text-sm",            // font-size
                    "box-border",         // box-sizing
                    "w-full",             // width
                    // globals.css の input スタイルから継承される想定だったもの
                    "mb-5",               // margin-bottom (ただし .img-input で mb-5 があるため、ここでは mb-0 が適切かもしれない)
                                          // Note: このコンポーネントの input は .img-input の子なので、
                                          // globals.css の input { margin-bottom: 2rem } が意図せず適用されていた可能性があります。
                                          // ここでは mb-0 にして、.img-input の mb-5 を活かすのがレイアウトとして自然です。
                    "mb-0", 
                ].join(" ")}
            />

            {/* ★ button のスタイル */}
            <button 
                onClick={handleClick} 
                disabled={!imageFile}
                className={imgInputButtonStyles}
            >
                画像Upload
            </button>
        </div>
    )
}

export default ImgInput
"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../../utils/useAuth";
import ImgInput from "../../components/imgInput";

const CreateItem = () => {
    const[title, setTitle] = useState("");
    const[description, setDescription] = useState("");
    const[price, setPrice] = useState("");
    const[image, setImage] = useState("");
    const router = useRouter();
    const { loginUserEmail } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // ... (省略)
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/create`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token") || '""')}`
            },
            body: JSON.stringify({
                title: title,
                description: description,
                price: price,
                image: image,
                email: loginUserEmail
            })
        });
        if (response.ok) {
            const data = await response.json();
            alert("アイテム作成成功: " + data.message);
            router.push("/");
        } else {
            alert("アイテム作成失敗");
        }
        
    }

    // ★ フォームスタイル (globals.css の input, textarea, button, .page-title)
    const inputStyles = "w-full p-[5px] mb-5 border border-[#ccc] rounded-[5px] box-border text-base font-inherit";
    const textareaStyles = "w-full p-[5px] mb-5 border border-[#ccc] rounded-[5px] box-border resize-y text-base font-inherit"; // resize-y を追加
    const buttonStyles = "bg-[#858585] text-base text-white p-[6px] border-none rounded-[5px] cursor-pointer w-full opacity-80-hover bg-gradient-to-br-hover from-[#FF63A4]-hover to-[#FFD873]-hover";
    const pageTitleStyles = "text-3xl font-normal leading-[35px] mt-[30px] mb-10 text-center";

    if(loginUserEmail) {
      return (
        <div>
            <h1 className={pageTitleStyles}>アイテム作成</h1>
            <ImgInput setImage={setImage} />
            <form onSubmit={handleSubmit}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="アイテム名" required className={inputStyles}/>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" placeholder="アイテム説明" required className={textareaStyles}/>
                <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" placeholder="価格" required className={inputStyles}/>
                <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像URL" required className={inputStyles}/>
                <button type="submit" className={buttonStyles}>作成</button>
            </form>
        </div>
      )
    }
    else {
        return <h1 className={pageTitleStyles}>ログインしてください</h1>;
    }
}
export default CreateItem;
"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../../utils/useAuth";
import { log } from "console";
const CreateItem = () => {
    const[title, setTitle] = useState("");
    const[description, setDescription] = useState("");
    const[price, setPrice] = useState("");
    const[image, setImage] = useState("");
    const router = useRouter();
    const { loginUserEmail } = useAuth();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("image", image);
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
            router.push("/item/list");
        } else {
            alert("アイテム作成失敗");
        }
        
    }
    if(loginUserEmail) {
  return (
    <div>
        <h1 className = "page-title">アイテム作成ページ</h1>
        <form onSubmit={handleSubmit}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="アイテム名" required/>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" placeholder="アイテム説明" required/>
            <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" placeholder="価格" required/>
            <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像URL" required/>
            <button type="submit">作成</button>
        </form>
    </div>
  )}
else {
    return <h1>ログインしてください</h1>;
}
}
export default CreateItem;

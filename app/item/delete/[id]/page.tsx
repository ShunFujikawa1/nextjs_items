"use client"
// ★ 修正点1: 'use' フックをインポート
import { useState, useEffect, use } from "react"; 
import { useRouter } from "next/navigation";
import Image from 'next/image';
import useAuth from "../../../utils/useAuth";
// useSearchParams は不要なので削除

// ★ 修正点2: props の型を Promise<{ id: string }> に変更
//            (名前を paramsPromise に変更すると分かりやすいです)
const DeleteItem = ({ params: paramsPromise }: { params: Promise<{ id: string }> }) => {
    
    // ★ 修正点3: 'use' フックを使って Promise を解決する
    // これにより、'params' は { id: "..." } という通常のオブジェクトになる
    const params = use(paramsPromise);

    const[title, setTitle] = useState("");
    const[description, setDescription] = useState("");
    const[price, setPrice] = useState("");
    const[image, setImage] = useState("");
    const[email, setEmail] = useState("");

    const router = useRouter();
    const { loginUserEmail } = useAuth();

    // ★ 修正点4: 依存配列を 'params.id' に変更
    useEffect(() => {
        const getSingleItem = async() => {
            // ★ 修正点5: 解決済みの 'params.id' を使用
            const id = params.id; 
            
            if (!id) {
                console.log("IDがparamsから取得できません");
                return;
            }
            //console.log("アイテムのid", id);

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/create`);
                if (!response.ok) throw new Error('Failed to fetch item');
                
                const jsonData = await response.json();
                const singleItem = jsonData.singleItem;
                if (singleItem) {
                    setTitle(singleItem.title);
                    setDescription(singleItem.description);
                    setPrice(singleItem.price);
                    setImage(singleItem.image);
                    setEmail(singleItem.email); 
                }
            } catch (error) {
                console.error("アイテム取得失敗:", error);
                alert("アイテムの読み込みに失敗しました。");
            }
        };
        getSingleItem();
    }, [params.id]); // 依存配列を params.id に変更

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("image", image);
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/delete/${params.id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token") || '""')}`
            },
            body: JSON.stringify({
                email: loginUserEmail
            })
        });
        if (response.ok) {
            const data = await response.json();
            alert("アイテム削除成功: " + data.message);
            router.push("/");
        } else {
            alert("アイテム削除失敗");
        }
    }
    if(loginUserEmail == email) {
  return (
    <div>
        アイテム削除ページ
        <form onSubmit={handleSubmit}>
            <h3>￥{price}</h3>
            <Image src={image} width={750} height={500} alt="item-image" priority/>
            <h3>¥{price}</h3>
            <p>{description}</p>
            <button type="submit">削除</button>
        </form>
    </div>
  )
}
else {
    return <h1>ログインしてください</h1>;   
}
}
export default DeleteItem;

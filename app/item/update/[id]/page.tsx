"use client"
// ★ 修正点1: 'use' フックをインポート
import { useState, useEffect, use } from "react"; 
import { useRouter } from "next/navigation";
import useAuth from "../../../utils/useAuth";
import { log } from "console";
// useSearchParams は不要なので削除

// ★ 修正点2: props の型を Promise<{ id: string }> に変更
//            (名前を paramsPromise に変更すると分かりやすいです)
const UpdateItem = ({ params: paramsPromise }: { params: Promise<{ id: string }> }) => {
    
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
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`);
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/update/${params.id}`, {
            method: "PUT",
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
            alert("アイテム編集成功: " + data.message);
            router.push("/");
        } else {
            alert("アイテム編集失敗");
        }
    }
    if(loginUserEmail == email) {
  return (
    <div>
        <h1 className = "page-title">アイテム編集ページ</h1>
        <form onSubmit={handleSubmit}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="アイテム名" required/>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" placeholder="アイテム説明" required/>
            <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" placeholder="価格" required/>
            <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像URL" required/>
            <button type="submit">編集</button>
        </form>
    </div>
  )
}
else {
    return <h1>このアイテムを編集する権限がありません。</h1>;
}
}

export default UpdateItem;

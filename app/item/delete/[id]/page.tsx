// app/item/delete/[id]/page.tsx
"use client"
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import useAuth from "../../../utils/useAuth";

const DeleteItem = ({ params: paramsPromise }: { params: Promise<{ id: string }> }) => {

    const params = use(paramsPromise);

    const [title, setTitle] = useState<string | null>(null);
    const [price, setPrice] = useState<string | number | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const { loginUserEmail } = useAuth();

    useEffect(() => {
        const getSingleItem = async() => {
            setLoading(true);
            setError(null);
            const id = params.id;

            if (!id) {
                console.error("IDがparamsから取得できません");
                setError("アイテムIDが見つかりません。");
                setLoading(false);
                return;
            }

            const apiUrl = process.env.NEXT_PUBLIC_URL;
            if (!apiUrl) {
                console.error("NEXT_PUBLIC_URL is not set");
                setError("設定エラーが発生しました。");
                setLoading(false);
                return;
            }

            try {
                // 正しいエンドポイント
                const response = await fetch(`${apiUrl}/api/item/readsingle/${id}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch item (${response.status})`);
                }

                const jsonData = await response.json();
                const singleItem = jsonData.singleItem;
                if (singleItem) {
                    setTitle(singleItem.title);
                    setDescription(singleItem.description);
                    setPrice(singleItem.price);
                    setImage(singleItem.image);
                    setEmail(singleItem.email);
                } else {
                    throw new Error('Item not found in response');
                }
            } catch (err) {
                console.error("アイテム取得失敗:", err);
                setError("アイテムの読み込みに失敗しました。");
            } finally {
                setLoading(false);
            }
        };
        getSingleItem();
    }, [params.id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            alert("ログインが必要です。");
            router.push('/user/login');
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/delete/${params.id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${JSON.parse(token)}`
                },
                 body: JSON.stringify({
                     email: loginUserEmail
                 })
            });

            const data = await response.json();

            if (response.ok) {
                alert("アイテム削除成功: " + data.message);
                router.push("/");
            } else {
                alert(`アイテム削除失敗: ${data.message || response.statusText}`);
                if (response.status === 401) {
                    router.push('/user/login');
                }
            }
        } catch (err) {
            console.error("削除リクエストエラー:", err);
            alert("アイテム削除中にエラーが発生しました。");
        }
    }

    // ----- JSX部分 -----
    if (loading) {
        // スタイルは globals.css 次第
        return <h1 className="page-title">読み込み中...</h1>;
    }

    if (error) {
         // スタイルは globals.css 次第 (例: text-red-500 の代わりのクラス)
        return <h1 className="page-title error-message">{error}</h1>; // error-message クラスを CSS で定義
    }

    if (!loginUserEmail || loginUserEmail !== email) {
        // スタイルは globals.css 次第
        return <h1 className="page-title error-message">このアイテムを削除する権限がありません。ログインしてください。</h1>;
    }

    return (
        // delete-page クラスを適用
        <div className="delete-page">
            <h1 className="page-title">アイテム削除確認</h1>
            {/* 中身の text-center は .delete-page に移動 */}
            <div>
                {image && (
                    <Image
                        src={image}
                        width={400}
                        height={300}
                        alt={title || "item image"}
                        priority
                        // className削除
                    />
                )}
                {/* スタイルは globals.css の h2, h3, p に依存 */}
                <h2>{title ?? 'タイトルなし'}</h2>
                <h3>￥{price ?? '価格未定'}</h3>
                <p className="description">{description ?? '説明なし'}</p> {/* クラス追加 */}
                <form onSubmit={handleSubmit}>
                    {/* 警告文 */}
                    <p className="warning">本当にこのアイテムを削除しますか？<br/>この操作は元に戻せません。</p> {/* クラス追加 */}
                    {/* ボタンのスタイルは globals.css の .delete-page button に依存 */}
                    <button type="submit">削除する</button>
                </form>
            </div>
        </div>
    );
}
export default DeleteItem;
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
        // ... (getSingleItem ロジック 変更なし)
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
        // ... (handleSubmit ロジック 変更なし)
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

    // ★ スタイルを定義
    const pageTitleStyles = "text-3xl font-normal leading-[35px] mt-[30px] mb-10 text-center";
    const errorStyles = `${pageTitleStyles} text-red-600`; // (任意の色)
    
    // ★ 汎用ボタンスタイル (globals.css の button)
    const baseButton = "text-base text-white p-[6px] border-none rounded-[5px] cursor-pointer w-full";
    // ★ 削除ボタン固有のスタイル (globals.css の .delete-page button)
    const deleteButtonStyles = [
        baseButton,
        "bg-[#dc3545]", // background
        "bg-[#c82333]-hover", // hover:background
        "opacity-100-hover", // hover:opacity (グラデーション上書き)
    ].join(" ");


    if (loading) {
        return <h1 className={pageTitleStyles}>読み込み中...</h1>;
    }

    if (error) {
        return <h1 className={errorStyles}>{error}</h1>;
    }

    if (!loginUserEmail || loginUserEmail !== email) {
        return <h1 className={errorStyles}>このアイテムを削除する権限がありません。ログインしてください。</h1>;
    }

    return (
        // ★ .delete-page スタイル
        <div className="max-w-[600px] my-10 mx-auto text-center p-5 border border-[#eee] rounded-[10px] shadow-[0_2px_5px_rgba(0,0,0,0.1)]">
            <h1 className={pageTitleStyles}>アイテム削除確認</h1>
            <div>
                {image && (
                    <Image
                        src={image}
                        width={400}
                        height={300}
                        alt={title || "item image"}
                        priority
                        // ★ img スタイル (globals.css の .delete-page img)
                        className="rounded-[10px] max-w-full h-auto mb-[15px]"
                    />
                )}
                {/* ★ h2 スタイル (globals.css の .delete-page h2) */}
                <h2 className="my-2.5 text-2xl leading-[30px] font-normal">{title ?? 'タイトルなし'}</h2>
                {/* ★ h3 (price) スタイル (globals.css の .delete-page h3) */}
                <h3 className="text-xl font-bold text-[#555] mb-2.5">￥{price ?? '価格未定'}</h3>
                {/* ★ p.description スタイル (globals.css の .delete-page p.description) */}
                <p className="mb-5 text-[#666]">{description ?? '説明なし'}</p>
                <form onSubmit={handleSubmit}>
                    {/* ★ p.warning スタイル (globals.css の .delete-page p.warning) */}
                    <p className="text-red-600 font-bold mb-[15px]">本当にこのアイテムを削除しますか？<br/>この操作は元に戻せません。</p>
                    {/* ★ button スタイル */}
                    <button type="submit" className={deleteButtonStyles}>削除する</button>
                </form>
            </div>
        </div>
    );
}
export default DeleteItem;
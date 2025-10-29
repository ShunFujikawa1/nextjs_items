// app/item/readsingle/[id]/page.tsx
import Image from 'next/image';
import Link from 'next/link';

// APIからデータを取得する関数 (変更なし)
const getSingleItem = async(id: string | undefined) => { // idの型を string | undefined に
    if (!id){
        console.error("No ID provided");
        return null;
    }
    const apiUrl = process.env.NEXT_PUBLIC_URL;
    if (!apiUrl) {
        console.error("NEXT_PUBLIC_URL is not set");
        return null;
    }
    try {
        const response = await fetch(`${apiUrl}/api/item/readsingle/${id}`, { cache: "no-store" });
        if (!response.ok) {
            console.error("fetch error:", response.status, await response.text());
            return null;
        }
        const jsonData = await response.json();
        const singleItem = jsonData.singleItem;
        return singleItem;
    } catch (error) {
        console.error("Error fetching single item:", error);
        return null;
    }
}

// コンポーネントの props の型定義を修正
// params が Promise<{ id?: string }> であることを示す型に変更
const ReadSingleItem = async({ params: paramsPromise }: { params: Promise<{ id?: string }> }) => { // 型名を paramsPromise に変更

     // ★★★ エラーメッセージに従い await を追加 ★★★
     const params = await paramsPromise;
     const id = params?.id; // await で解決した params から id を取得

     if (!id) {
        return <h1 className="page-title error-message">ID が見つかりません</h1>;
    }

    const singleItem = await getSingleItem(id);

    if (!singleItem) {
        return <h1 className="page-title error-message">アイテムが見つかりません</h1>;
    }

    // --- JSX部分は変更なし ---
    return (
        <div className='grid-container-si'>
            <div>
                <Image src={singleItem.image} width={750} height={500} alt={singleItem.title || "item image"} priority/>
            </div>
            <div>
                 {/* 以前のコードでは singleItem.name になっていたので title に合わせる */}
                <h2>{singleItem.title ?? 'タイトルなし'}</h2>
                <p>{singleItem.description ?? '説明なし'}</p>
                <p className="price">価格: {singleItem.price ? `${singleItem.price}円` : '価格未定'}</p>
                <div className="button-area">
                    <Link href={`/item/update/${singleItem.id}`}>アイテム編集</Link>
                    <Link href={`/item/delete/${singleItem.id}`}>アイテム削除</Link>
                </div>
            </div>
        </div>
    );
}

export default ReadSingleItem;
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
const ReadSingleItem = async({ params: paramsPromise }: { params: Promise<{ id?: string }> }) => {

     // ★★★ await を追加 ★★★
     const params = await paramsPromise;
     const id = params?.id; // await で解決した params から id を取得

     // ★ .page-title スタイル
     const pageTitleStyles = "text-3xl font-normal leading-[35px] mt-[30px] mb-10 text-center";
     // ★ エラー用の色
     const errorStyles = `${pageTitleStyles} text-red-600`; // (任意の色)

     if (!id) {
        return <h1 className={errorStyles}>ID が見つかりません</h1>;
    }

    const singleItem = await getSingleItem(id);

    if (!singleItem) {
        return <h1 className={errorStyles}>アイテムが見つかりません</h1>;
    }

    // ★ ボタンリンクのスタイル (globals.css の .grid-container-si .button-area a)
    const buttonLinkStyles = [
        "inline-block",
        "py-[3px] px-[17px]",
        "mr-2.5",             // margin-right
        "rounded-[5px]",
        "bg-[linear-gradient(-20deg,_#646464_80%,_#FF63A4_80%)]",
        "text-white",
        "text-base",
        "font-normal",
        "no-underline",
        "transition-all duration-300",
        "opacity-80-hover",
        // レスポンシブ
        "max-[400px]:py-[2px]",
        "max-[400px]:px-[14px]",
        "max-[400px]:text-xs",
    ].join(" ");

    return (
        // ★ .grid-container-si スタイル
        <div className='grid grid-cols-[0.6fr_0.4fr] gap-5 max-[600px]:grid-cols-1'>
            <div>
                {/* ★ img スタイル (globals.css の .grid-container-si img) */}
                <Image src={singleItem.image} width={750} height={500} alt={singleItem.title || "item image"} priority className="rounded-[10px] w-full h-auto block"/>
            </div>
            <div>
                 {/* ★ h2 スタイル (globals.css の .grid-container-si h2) */}
                <h2 className="text-[#FF63A4] mt-2.5 mb-5 text-2xl leading-[30px] font-normal">{singleItem.title ?? 'タイトルなし'}</h2>
                {/* ★ p スタイル (layout.tsxから継承 + globals.css の p) */}
                <p className="mb-[14px]">{singleItem.description ?? '説明なし'}</p>
                {/* ★ p.price スタイル (globals.css の .grid-container-si p.price) */}
                <p className="font-bold text-xl mb-5">価格: {singleItem.price ? `${singleItem.price}円` : '価格未定'}</p>
                {/* ★ .button-area スタイル (globals.css の .grid-container-si .button-area) */}
                <div className="mt-5">
                    <Link href={`/item/update/${singleItem.id}`} className={buttonLinkStyles}>アイテム編集</Link>
                    <Link href={`/item/delete/${singleItem.id}`} className={buttonLinkStyles}>アイテム削除</Link>
                </div>
            </div>
        </div>
    );
}

export default ReadSingleItem;
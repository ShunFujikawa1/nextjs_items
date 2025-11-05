// app/page.tsx
import Image from 'next/image';
import Link from 'next/link';
export const dynamic = 'force-dynamic';

const getAllItems = async() => {
    // APIエンドポイントは修正済み前提
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readall`);
    if (!response.ok) {
        console.error("fetch error:", response.status, await response.text());
        return [];
    }
    const jsonData = await response.json();
    return Array.isArray(jsonData?.allitems) ? jsonData.allitems : [];
}

const ReadAllItems = async () => {
    const allitems = await getAllItems();

    // ★ h1 スタイル (globals.css の h1, .page-title)
    const pageTitleStyles = "text-3xl font-normal leading-[35px] mt-[30px] mb-10 text-center";
    
    // ★ h3 スタイル (globals.css の h3)
    const h3Styles = "text-xl font-normal leading-[30px]";

    return (
        <div>
          <h1 className={pageTitleStyles}>アイテム一覧</h1>
          {/* ★ .grid-container-in スタイル */}
          <div className='grid grid-cols-3 gap-[30px] max-[600px]:grid-cols-1'>
              {allitems.length === 0 ? (
                  // ★ p スタイル (layout.tsxから継承 + globals.css の p)
                  <p className="mb-[14px]">アイテムがありません</p>
              ) : (
                  allitems.map((item: any) => (
                      // ★ a タグのスタイル (globals.css の .grid-container-in > a)
                      <Link 
                        href={`/item/readsingle/${item.id}`} 
                        key={item.id} 
                        className={[
                            "block",
                            "rounded-[10px]", // border-radius
                            "w-full",         // width
                            "border-[0.5px] border-[#dfdfdf]", // border
                            "text-[#333]",    // color
                            "overflow-hidden",// overflow
                            "box-border",     // box-sizing
                            "no-underline",   // text-decoration (globals.css a)
                            // v4 ホバー構文 (globals.css の .grid-container-in > a:hover)
                            "transition-all duration-300",
                            "backdrop-blur-[20px]-hover",
                            "shadow-[4px_4px_13px_5px_rgba(0,0,0,0.25)]-hover",
                            "opacity-80-hover", // globals.css a:hover
                        ].join(" ")}
                      >
                          {/* ★ img のスタイル (globals.css の .grid-container-in > a img) */}
                          {item.image ? (
                              <Image src={item.image} width={750} height={500} alt={item.title ?? "item image"} priority className="w-full h-auto rounded-t-[10px] block" />
                          ) : null}
                          {/* ★ div のスタイル (globals.css の .grid-container-in > a > div) */}
                          <div className="p-[15px]">
                            {/* ★ h3 のスタイル (globals.css の .grid-container-in > a > div > h3) */}
                            <h3 className={`${h3Styles} text-[#FF63A4] mb-1`}>{item.title ?? 'タイトルなし'}</h3>
                            {/* ★ p のスタイル (mb-0 で上書き) */}
                            <p className="mb-0">{item.description ?? '説明なし'}</p>
                            {/* ★ p.price のスタイル (globals.css の .grid-container-in > a > div > p.price) */}
                            <p className="font-bold mt-2.5 mb-0">価格: {item.price ? `${item.price}円` : '価格未定'}</p>
                          </div>
                      </Link>
                  ))
              )}
          </div>
        </div>
    )
}

export default ReadAllItems;
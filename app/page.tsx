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
    return (
        <div> {/* Optional: Add a container div if needed */}
          <h1 className="page-title">アイテム一覧</h1> {/* ページタイトルを追加 */}
          <div className='grid-container-in'>
              {allitems.length === 0 ? (
                  <p>アイテムがありません</p>
              ) : (
                  allitems.map((item: any) => (
                      <Link href={`/item/readsingle/${item.id}`} key={item.id}>
                          {/* style属性は削除 */}
                          {item.image ? (
                              <Image src={item.image} width={750} height={500} alt={item.title ?? "item image"} priority />
                              /* unoptimizedは必要に応じて削除または保持 */
                          ) : null}
                          {/* テキスト要素をdivで囲む */}
                          <div>
                            <h3>{item.title ?? 'タイトルなし'}</h3>
                            <p>{item.description ?? '説明なし'}</p>
                            <p className="price">価格: {item.price ? `${item.price}円` : '価格未定'}</p> {/* 価格にクラス追加 */}
                          </div>
                      </Link>
                  ))
              )}
          </div>
        </div>
    )
}

export default ReadAllItems;
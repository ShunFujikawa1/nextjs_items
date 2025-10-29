import Image from 'next/image';
import Link from 'next/link';
export const dynamic = 'force-dynamic';

const getAllItems = async() => {
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
        <div className='grid-container-in'>
            
            {allitems.length === 0 ? (
                <p>アイテムがありません</p>
            ) : (
                allitems.map((item: any) => (
                    <Link
                        href={`/item/readsingle/${item.id}`}
                        key={item.id}
                        style={{ display: 'block', marginBottom: 20, textDecoration: 'none', color: 'inherit' }}
                    >
                        {item.image ? (
                            <Image src={item.image} width={750} height={500} alt={item.title ?? "itemimage"} unoptimized />
                        ) : null}
                        
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <p>価格: {item.price}円</p>
                    </Link>
                ))
            )}
        </div>
    )
}

export default ReadAllItems;
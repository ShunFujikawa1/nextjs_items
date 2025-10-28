import Image from 'next/image';
import Link from 'next/link';

const getSingleItem = async(id: any) => {
    if (!id){ 
        console.error("No ID です");
        return null;}
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`, { cache: "no-store" }); 
    if (!response.ok) {
        console.error("fetch error:", response.status, await response.text());
        return null;
    }
    const jsonData = await response.json();
    const singleItem = jsonData.singleItem;
    return singleItem;
}

const ReadSingleItem = async({ params }: { params: { id?: string } }) => {
     const { id } = (await params) as { id?: string };
     //console.log("取得したID:", id);
     if (!id) {
        return <h1>ID が指定されていません</h1>;
    }
    const singleItem = await getSingleItem(id);
    if (!singleItem) {
        return <h1>アイテムが見つかりません</h1>;
    }
    return (
        <div className='grid-container-si'>
            <h1>個別アイテムページ</h1>
            <div>
                <Image src={singleItem.image} width={750} height={500} alt="item-image" priority/>
                <h2>{singleItem.name}</h2>
                <p>{singleItem.description}</p>
                <p>価格: {singleItem.price}</p>
                <div>
                    <Link href={`/item/update/${singleItem.id}`}>アイテム編集</Link>
                    <Link href={`/item/delete/${singleItem.id}`}>アイテム削除</Link>
                </div>
            </div>
        </div>
    )
}

export default ReadSingleItem
 
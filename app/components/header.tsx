import Image from "next/image"
import Link from "next/link"

const Header = () => {
    // ★ リンクボタンのスタイルを共通化
    const linkStyles = "inline-block py-[3px] px-[17px] ml-2.5 rounded-[5px] text-white text-base font-normal transition-all duration-300 bg-[linear-gradient(-20deg,_#646464_80%,_#FFD873_80%)] opacity-80-hover max-[400px]:py-[2px] max-[400px]:px-[14px] max-[400px]:text-xs";

    return (
        <header>
            <div>
                <Link href="/">
                    {/* ★ imgのスタイルを適用 */}
                    <Image src="/header.svg" width={1330} height={148} alt="header-image" priority className="w-full h-auto" />
                </Link>
            </div>
            {/* ★ navのスタイルを適用 */}
            <nav className="text-end mt-5 mb-[22px]">
                <ul>
                    {/* ★ liのスタイルを適用 */}
                    <li className="inline">
                        <Link href="/user/register" className={linkStyles}>登録</Link>
                    </li>
                    <li className="inline">
                        <Link href="/user/login" className={linkStyles}>ログイン</Link>
                    </li>
                    <li className="inline">
                        <Link href="/item/create" className={linkStyles}>アイテム作成</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
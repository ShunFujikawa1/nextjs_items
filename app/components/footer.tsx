const Footer = () => {
    return (
        // ★ footerのスタイルを適用
        <footer className="text-center my-[30px] text-[#888] text-sm">
            {/* ★ ベースのpタグスタイル (mb-[14px]) を上書き */}
            <p className="mb-0">@{new Date().getFullYear()} Next Market</p>
        </footer>
    )
}

export default Footer;
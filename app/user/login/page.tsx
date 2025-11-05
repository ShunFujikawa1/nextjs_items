"use client"
import { useState } from "react";
import { json } from "stream/consumers";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
      const jsonData = await response.json();
      localStorage.setItem("token", JSON.stringify(jsonData.token));
      alert(jsonData.message);
    }
    catch (error) {
      alert("ログイン失敗");
    }
  }

  // ★ フォームスタイル (globals.css の input, button, .page-title)
  const inputStyles = "w-full p-[5px] mb-5 border border-[#ccc] rounded-[5px] box-border text-base font-inherit";
  const buttonStyles = "bg-[#858585] text-base text-white p-[6px] border-none rounded-[5px] cursor-pointer w-full opacity-80-hover bg-gradient-to-br-hover from-[#FF63A4]-hover to-[#FFD873]-hover";
  const pageTitleStyles = "text-3xl font-normal leading-[35px] mt-[30px] mb-10 text-center";

  return (
    <div>
      <h1 className={pageTitleStyles}>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="メールアドレス" required className={inputStyles}/>
        <input name="password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="パスワード" required className={inputStyles}/>
        <button type="submit" className={buttonStyles}>ログイン</button>
      </form>
    </div>
  )
}
export default Login
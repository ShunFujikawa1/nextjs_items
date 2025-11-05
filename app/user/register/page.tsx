// app/user/register/page.tsx
"use client";
import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      const jsonData = await response.json();
      alert(jsonData.message);
    } catch (error) {
      alert("ユーザー登録失敗");
    }
  };

  // ★ フォームスタイル (globals.css の input, button, .page-title)
  const inputStyles = "w-full p-[5px] mb-5 border border-[#ccc] rounded-[5px] box-border text-base font-inherit";
  const buttonStyles = "bg-[#858585] text-base text-white p-[6px] border-none rounded-[5px] cursor-pointer w-full opacity-80-hover bg-gradient-to-br-hover from-[#FF63A4]-hover to-[#FFD873]-hover";
  const pageTitleStyles = "text-3xl font-normal leading-[35px] mt-[30px] mb-10 text-center";

  return (
    <div>
      <h1 className={pageTitleStyles}>ユーザー登録</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ユーザー名"
          required
          className={inputStyles}
        />
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス"
          required
          className={inputStyles}
        />
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
          required
          className={inputStyles}
        />
        <button type="submit" className={buttonStyles}>登録</button>
      </form>
    </div>
  );
};
export default Register;
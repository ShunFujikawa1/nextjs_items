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

  return (
    // divのラッパーはあっても良いが、スタイルクラスは削除
    <div>
      <h1 className="page-title">ユーザー登録</h1>
      {/* フォーム要素のスタイルは globals.css から適用される */}
      <form onSubmit={handleSubmit}>
         {/* labelを追加しても良いが、スタイルはglobals.css次第 */}
         {/*
         <label htmlFor="name">ユーザー名</label>
         */}
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ユーザー名"
          required
        />
        {/*
        <label htmlFor="email">メールアドレス</label>
         */}
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス"
          required
        />
        {/*
        <label htmlFor="password">パスワード</label>
         */}
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
          required
        />
        <button type="submit">登録</button>
      </form>
    </div>
  );
};
export default Register;
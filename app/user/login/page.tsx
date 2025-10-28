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
  return (
    <div>
      <h1 className = "page-title">ログイン</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="メールアドレス" required/>
        <input name="password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="パスワード" required/>
        <button type="submit">ログイン</button>
      </form>
    </div>
  )
}
export default Login
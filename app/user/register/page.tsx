"use client"
import { useState } from "react";
import { json } from "stream/consumers";
const Register = () => {
  const [name, setName] = useState("");
  //console.log(name)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/register`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      })
      const jsonData = await response.json();
      alert(jsonData.message);
    }
    catch (error) {
      alert("ユーザー登録失敗");
    }
  }
  return (
    <div>
      ユーザー登録
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="ユーザー名" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="メールアドレス" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="パスワード" />
        <button type="submit">登録</button>
      </form>
    </div>
  )
}
export default Register
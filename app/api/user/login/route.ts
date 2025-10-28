import { NextRequest } from "next/server";
import supabase from "../../../utils/database";
import{SignJWT} from "jose";

export async function POST(request: NextRequest) {
    const reqBody = await request.json();
    try {
        const { data, error } = await supabase
            .from("users")
            .select()
            .eq("email", reqBody.email)
            .single();
        if (error) {
            return new Response(JSON.stringify({ message: "ユーザーが見つかりません" }), { status: 404 });
        }
        else {
            //return new Response(JSON.stringify({ message: "ユーザー取得成功", user: data }), { status: 200 });  
        if (data.password === reqBody.password) {
            const secretKey = new TextEncoder().encode("next-market-route-handlers");
            const payload = {
                email:reqBody.email,
            }
            const token = await new SignJWT(payload)
                .setProtectedHeader({ alg: "HS256" })
                .setExpirationTime("1d")
                .sign(secretKey);
                //console.log("発行したトークン:", token);
            return new Response(JSON.stringify({ message: "ログイン成功", token: token }), { status: 200 });
        }
        else {
            return new Response(JSON.stringify({ message: "パスワードが間違っています" }), { status: 401 });
        }
    }
} 
    catch (error) {
        console.error("ログイン失敗:", error);
        return new Response(JSON.stringify({ message: "ログイン失敗" }), { status: 500 });
    }
}
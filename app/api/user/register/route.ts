import { NextResponse } from "next/server"; 
import supabase from "../../../utils/database";

export async function POST(request: Request) { 
    const reqBody = await request.json();
    try {
        const { error } = await supabase.from("users").insert(reqBody);
        if (error) throw error;
        return NextResponse.json({ message: "ユーザー登録成功" });
    } catch (err) {
        console.error("ユーザー登録失敗:", err);
        return NextResponse.json({ message: "ユーザー登録失敗" }, { status: 500 });
    }
}
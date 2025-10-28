import { NextResponse } from "next/server"
import supabase from "../../../utils/database"

export async function GET() {
    try {
        const { data, error } = await supabase.from("items").select("*")

        // ▼ 修正点1: Supabaseのエラーをここで処理する
        if (error) {
            console.error("Supabase error:", error.message)
            // サーバーエラー(500)として、エラーメッセージをJSONで返す
            return NextResponse.json(
                { message: "アイテム読み取り失敗（データベースエラー）", error: error.message },
                { status: 500 }
            )
        }

        // 成功時
        return NextResponse.json({ message: "アイテム読み取り成功（オール）", allitems: data })

    } catch (e: any) { // ▼ 修正点2: try...catch が GET 関数を囲むように修正
        
        console.error("API route error:", e)
        // データベース接続以前の、その他のサーバーエラー(500)
        return NextResponse.json(
            { message: "アイテム読み取り失敗（サーバーエラー）", error: e.message },
            { status: 500 }
        )
    }
} // <-- GET関数の閉じ括弧はここ

export const revalidate = 0
// } // <-- この余分な括弧は削除
import { NextResponse } from "next/server"
import supabase from "../../../../utils/database"

export async function GET(request: Request, context: any) {
    const params = await context.params
    //console.log("params:", params)
    const id = params.id
    //return NextResponse.json({ message: "アイテム読み取り成功（シングル）", id: id })
    if (!id) {
        return NextResponse.json({ message: "id が指定されていません" }, { status: 400 });
    }
    try {
        const { data, error } = await supabase.from("items").select("*").eq("id", id).single();
        if (error) throw error;
        console.log("singleItem:", data);
        return NextResponse.json({ message: "アイテム読み取り成功（シングル）", singleItem: data });
    } catch (err) {
        console.error("アイテム読み取り失敗:", err);
        return NextResponse.json({ message: "アイテム読み取り失敗（シングル）" }, { status: 500 });
    }
}

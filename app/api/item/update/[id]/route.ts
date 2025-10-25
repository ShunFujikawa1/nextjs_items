import { NextResponse } from "next/server"
import supabase from "../../../../utils/database"
export async function PUT(request: Request, context: any) {
    //console.log("start")
    const raw = await request.text();
    console.log("raw body:", raw ?? "(empty)");
    if (!raw) {
        return NextResponse.json({ message: "body が指定されていません" }, { status: 400 });
    }

    let reqBody;
    try {
        reqBody = JSON.parse(raw);
    } catch (e) {
        console.error("JSON parse error:", e);
        return NextResponse.json({ message: "不正な JSON です" }, { status: 400 });
    }
    const params = await context.params
    const id = params.id
    if (!id) {
        return NextResponse.json({ message: "id が指定されていません" }, { status: 400 });
    }



    try {
        const {data, error} = await supabase.from("items").select().eq("id", id).single();
        if(error) throw error;
        if(data.email === reqBody.email){
            console.log("認証成功")
            await supabase.from("items").update(reqBody).eq("id", id);
        // if (error) throw error;
        return NextResponse.json({ message: "アイテム編集成功" });
        }
        else {
            return NextResponse.json({ message: "認証に失敗しました" }, { status: 401 });
        }
        
        
    } catch (err) {
        console.error("アイテム編集失敗:", err);
        return NextResponse.json({ message: "アイテム編集失敗" }, { status: 500 });
    }
}
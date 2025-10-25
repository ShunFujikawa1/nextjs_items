import { NextResponse } from "next/server";    
import supabase from "../../../../utils/database";
export async function DELETE(request: Request, context: any) {
    const params = await context.params;
    const id = params.id;
    try {
        await supabase.from("items").delete().eq("id", id);
        return NextResponse.json({ message: "アイテム削除成功" });
    } catch (err) {
        console.error("アイテム削除失敗:", err);
        return NextResponse.json({ message: "アイテム削除失敗" }, { status: 500 });
    }

}
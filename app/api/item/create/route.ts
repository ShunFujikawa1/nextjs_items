import { NextResponse } from "next/server"
import supabase from "../../../utils/database"

export async function POST(request: Request){
    const redBody = await request.json()

    try{
        const {error} = await
        await supabase.from("items").insert(redBody)
        console.log(error)
        if(error) throw error  
        return NextResponse.json({message: "アイテム作成成功"})
    }
    catch{
        return NextResponse.json({message: "アイテム作成失敗"})
    }
}

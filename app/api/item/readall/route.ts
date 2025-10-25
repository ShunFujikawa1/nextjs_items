import { NextResponse } from "next/server"
import supabase from "../../../utils/database"

export async function GET(){
    try{
        const {data, error} = await supabase.from("items").select("*")
        console.log(error)
    return NextResponse.json({message: "アイテム読み取り成功（オール）",allitems : data})
}
    catch{
        return NextResponse.json({message: "アイテム読み取り失敗（オール）"})
    }   
}

export const revalidate = 0
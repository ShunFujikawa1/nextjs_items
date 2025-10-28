import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(request: Request) {
    const token = request.headers.get("Authorization")?.split(" ")[1];
    //const token = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImR1bW15QGdtYWlsLmNvbSIsImV4cCI6MTc2MTQ1NTA4N30.RfI3w8fg2PU09U9IEuPRV0-H3ylGtI3LEcLOBMUw1NM"
    if (!token) {
        return NextResponse.json({ message: "認証トークンがありません" }, { status: 401 });
    }
    try{
        const secretKey = new TextEncoder().encode("next-market-route-handlers")
        const decodedJwt = await jwtVerify(token, secretKey)
        //console.log("デコードしたJWT:", decodedJwt);
        return NextResponse.next()
    }catch{
        return NextResponse.json({message: "トークンが正しくないので、ログインしてください"})
    } 

}
export const config = {
    matcher: ["/api/item/create", "/api/item/update/:path*", "/api/item/delete/:path*"],
}
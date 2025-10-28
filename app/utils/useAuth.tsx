import { useRouter } from "next/navigation";
import { jwtVerify } from "jose";
import {useState,useEffect} from "react";

const useAuth = () => {
    const [loginUserEmail, setLoginUserEmail] = useState("");
    const router = useRouter();
    
    useEffect(() => {
        const checkToken = async() => {
            const rawToken = localStorage.getItem("token");

            if (!rawToken) {
                router.push("/user/login");
                return;
            }

            let token = rawToken;
            if (token.startsWith('"') && token.endsWith('"')) {
                token = token.slice(1, -1);
            }
            
            try {
                const secretkey = new TextEncoder().encode("next-market-route-handlers");
                const decodedJWT = await jwtVerify(token, secretkey);
                
                // ★★★ ここを追加（またはコメントアウトを解除） ★★★
                const payloadEmail = decodedJWT.payload.email as string;
                if (payloadEmail) {
                   setLoginUserEmail(payloadEmail);
                }
                // ★★★ ここまで ★★★

            } catch (error) {
                console.error("JWTの検証に失敗:", error);
                router.push("/user/login");
            }
        }
        
        checkToken();

    }, [router]);

    return { loginUserEmail };
}

export default useAuth;
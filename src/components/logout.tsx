"use client";

import iconSair from "@/../../public/assets/img/icon-sair.svg";
import Image from "next/image";
import Cookies from 'js-cookie'
import { useRouter } from "next/navigation";

export default function Logout() {
	const router = useRouter()

    function Logout() {
        Cookies.remove('accessToken')
        router.push(`/login`)
    }

    return (
        <div className="cursor-pointer" onClick={Logout}>
            <Image src={iconSair} alt='Sair' className="me-2" />
            <span className="color-primary">Sair</span>
        </div>
    )
}
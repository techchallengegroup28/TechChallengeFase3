'use client';
import iconSair from "@/../../public/assets/img/icon-sair.svg";
import Link from 'next/link';
import Image from 'next/image';
import Cookie from "js-cookie";
import { useRouter, usePathname } from 'next/navigation';

import styles from "@/styles/modules/header.module.css";

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();

    const Logout = () => {
        Cookie.remove('accessToken');
        router.push('/login');
    };

    return (
        <div className={`bg-black d-flex align-items-center  ${styles.header}`}>
            <div className="container d-flex align-items-center justify-content-between">
                <Link href='/' className='text-decoration-none'>
                    <h5 className='color-primary m-0'><strong>Pós Tech</strong></h5>
                </Link>

                {pathname.includes('admin') && (
                    <div className="cursor-pointer" onClick={Logout}>
                        <Image src={iconSair} alt='Sair' className="me-2" />
                        <span className="color-primary">Sair</span>
                    </div>
                )}
            </div>
        </div>
    );
}
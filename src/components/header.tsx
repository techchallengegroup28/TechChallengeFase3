import Link from 'next/link'
import styles from "@/styles/modules/header.module.css";
import Logout from './logout';

export default async function Header() {

    return (
        <div className={`bg-black d-flex align-items-center  ${styles.header}`}>
            <div className="container d-flex align-items-center justify-content-between">
                <Link href='/' className='text-decoration-none'>
                    <h5 className='color-primary m-0'><strong>Pós Tech</strong></h5>
                </Link>

                <Logout />
            </div>
        </div>
    )
}

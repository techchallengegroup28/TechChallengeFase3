"use client";

import Cookie from "js-cookie";
import { useRouter } from 'next/navigation';

export default function Excluir({ id }: { id: number }) {
    const router = useRouter()
    const cookie = Cookie.get('accessToken')

    async function handleDelete(id: number) {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookie}`,
                },
            })

            const data = await response.json();

            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <button onClick={() => handleDelete(id)}>exluir post id : {id}</button>
        </>
    )
}

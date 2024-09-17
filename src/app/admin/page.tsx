import IPost from "@/interface/IPost";
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import Link from "next/link";
import Excluir from "@/components/posts/exluir";

async function getPosts(): Promise<IPost[] | null> {
	const cookieStore = cookies()
	let cookie = cookieStore.get('accessToken')?.value
	
	const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/posts/admin', {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${cookie}`,
			'Accept': 'application/json',
		}
	})
	
	if (res.status == 403) {
		redirect(`/login`)
	}

	if (!res.ok) { return null }
	const posts = await res.json()
	return posts
}

export default async function Admin() {
	const posts = await getPosts()

	return (
		<>
			<h1 className="color-primary">Listagem Admin</h1>
			<Link href="/admin/post">Criar Post</Link>
			{posts?.map((post: IPost, index: number) => (
				<div key={index}>
					<h2>{post.titulo} Via Admin</h2>
					<p>{post.id}</p>
					<pre>{post.imagem}</pre>
					<Link href={`admin/post/${post.id}`}>Editar</Link> <br />
					<Excluir id={post.id} />
				</div>
			))}
		</>
	);
}

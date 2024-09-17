import HelloWord from "@/components/helloWorld";
import IPost from "@/interface/IPost";
import Link from "next/link";

async function getPosts(): Promise<IPost[] | null> {
	const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/posts")
	if (!res.ok) { return null }
	const posts = await res.json()
	return posts
}

export default async function Home() {
	const posts = await getPosts()

	return (
		<>
			<h1 className="color-primary">Listagem usuario</h1>
			{posts?.map((post: IPost, index: number) => (
				<div key={index}>
					<h2>{post.titulo}</h2>
					<p>{post.id}</p>
					<Link href={`/post/${post.id}`}>Ver mais</Link>
				</div>
			))}
			<HelloWord />
		</>
	);
}

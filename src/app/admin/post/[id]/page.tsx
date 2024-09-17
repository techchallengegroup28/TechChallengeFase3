

async function getPost(id: string) {
	const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/posts/" + id);
	if (!res.ok) { return null; }
	const post = await res.json();
	return post;
}

export default async function Post({ params }: any) {
	const post = await getPost(params.id);

	return (
		<>
			<h1>Post Interna Admin editar</h1>
			{ params.id}
			{/* <h2>O id do post digitado é : {post.id}</h2>
			<h2>O titulo do post é : {post.titulo}</h2>
			<h2>A descrição do post é : {post.descricao}</h2>
			<h2>A data de postagem do post é : {post.datapostagem}</h2>
			<h2>A data de atualização do post é : {post.dataatualizacao}</h2>
			<h2>O conteúdo do post é : {post.conteudo}</h2>
			<h2>A imagem do post é : {post.imagem}</h2> */}
		</>
	);
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Post({ params }: any) {
	
	return (
		<>
			<h1>Post Interna</h1>
			<h2>O id do post digitado é : {params.id}</h2>
		</>
	);
}

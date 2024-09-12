import HelloWord from "@/components/helloWorld";

export default function Post({ params }: any) {
	
	return (
		<>
			<h1>Post Interna</h1>
			<h2>O id do post digitado é : {params.id}</h2>
		</>
	);
}

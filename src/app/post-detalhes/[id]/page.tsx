import PostDetails from "@/components/postDetails";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PostDetalhes({params}: {params: any}) {
  
    return (
       <>
         <PostDetails idPost={params.id}/>
       </>
    );
}
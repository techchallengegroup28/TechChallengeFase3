import PostDetails from "@/components/postDetails";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PostDetalhes({params}: {params: any}) {

  console.log('hh: ' + params.id);

    return (
       <>
         <PostDetails idPost={params.id}/>
       </>
    );
}
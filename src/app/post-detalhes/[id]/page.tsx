import PostDetails from "@/components/postDetails";

export default function PostDetalhes({ idPost }: { idPost: number }) {
  // console.log('Page - idPost: ' + idPost);
    return (
       <>
         <PostDetails idPost={idPost}/>
       </>
    );
}
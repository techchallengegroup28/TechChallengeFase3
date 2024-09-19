'use client';
import PostDetails from "@/components/postDetails";
import { useParams } from 'next/navigation';

export default function PostDetalhes() {
  const params = useParams();
  const idPost = params.id;
  
    return (
       <>
         <PostDetails idPost={Number(idPost)}/>
       </>
    );
}
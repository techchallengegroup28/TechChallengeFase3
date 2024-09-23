import PostForm from '@/components/postForm';
import "@/styles/globals.css";

export default function PostEdit({ params }: { params: { id: string } }) {
    return (
      <>
        <PostForm idPost={params.id}/>
      </>
    );
  }
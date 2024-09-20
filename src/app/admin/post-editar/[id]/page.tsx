import PostForm from '@/components/postForm';
import "@/styles/globals.css";

export default function PostEdit({ params }: { params: { id: string } }) {
    return (
      <>
        <PostForm idPost={params.id}/>
        <h6 style={{ marginLeft: '50px' }}>O id do post digitado é : {params.id}</h6>
      </>
    );
  }
import React from 'react';
import IPost from '@/interface/IPost';
// import Link from 'next/link';
import styles from '../styles/modules/listPostUser.module.css';
import { useRouter } from 'next/navigation';

const PostCard = ({ post }: { post: IPost }) => {
  // console.log('PostCard - post.id: ' + post.id);
  const router = useRouter();

  const redirecionar = () => {
    router.push('/post-detalhes/' + post);
  }
  
  return (
    <div className={styles.post_card} onClick={redirecionar}>
      <div className={styles.post_image}></div>
      <h2>{post.titulo}</h2>
      <p>{post.descricao}</p>
    </div>
  );
};

export default PostCard;

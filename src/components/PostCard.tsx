import React from 'react';
import Link from 'next/link';
import IPost from '@/interface/IPost'
import styles from '../styles/modules/listPostUser.module.css';

const PostCard = ({ post }: { post: IPost }) => {
  
  return (
    <Link className={styles.post_card} href={'/post-detalhes/' + post.id}>
      <div className={styles.post_image}></div>
      <h2>{post.titulo}</h2>
      <p>{post.descricao}</p>
    </Link>
  );
};

export default PostCard;

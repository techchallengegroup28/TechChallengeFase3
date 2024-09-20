import React from 'react';
import Link from 'next/link';
import IPost from '@/interface/IPost'
import styles from '../styles/modules/listPostUser.module.css';
import Image from 'next/image';
import {processingImgBase64 } from '@/utils/appUtils';

const PostCard = ({ post }: { post: IPost }) => {
  let imgPost = '';
  try {
    // console.log('PostCard - id: ' + post.id);
    // console.log('PostCard - titulo: ' + post.titulo);
    // console.log('PostCard - img: ' + post.imagem);
    if (post.imagem) {
      imgPost = processingImgBase64(post.imagem);
      // console.log('PostCard - imgPost: ' + imgPost);
    }

  } catch (error) {
    console.log('Erro ao renderizar imagem:' + error)
    post.imagem = null
  }

  return (
    <Link className={styles.post_card} href={'/post-detalhes/' + post.id}>
      <div className={styles.post_image}>
        {post.imagem ? (
          <Image src={imgPost} alt="Post Image" fill />
        ) : <div className={styles.placeholderimage}></div>}
      </div>
      <h2>{post.titulo}</h2>
      <p>{post.descricao}</p>
    </Link>
  );
};

export default PostCard;

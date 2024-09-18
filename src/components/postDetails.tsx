"use client";

import React, { useEffect, useState } from 'react';
import '@/styles/globals.css'
import styles from '@/styles/modules/postDetails.module.css';
import Longtext from '@/components/longText';
import { getPostById } from '@/app/services/posts';
import IPost from "@/interface/IPost";

const PostDetails = ({ idPost }: { idPost: number }) => {
  const [post, setPostt] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(true);

  console.log('PostDetails - idPost: ' + idPost);

  useEffect(() => {
    getPostById(idPost)
      .then((post) => {
        setPostt(post);
      })
      .catch((error) => {
        console.error('Erro ao buscar o post:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [idPost]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  console.log('post: ' + post)

  if (!post) {
    return (
      <div className='container'>
        <div className={styles.placeholderimage}></div>
        <h2 className={styles.postDetailstitle}>Post não encontrado</h2>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <div className='container'>
      <div className={styles.placeholderimage}></div>
      <h2 className={styles.postDetailstitle}>{post.titulo}</h2>
      <p className={styles.postDetailsmeta}>
        Postado dia {formatDate(post.datapostagem)} - Última atualização: {formatDate(post.dataatualizacao)}
      </p>
      <div className={styles.postDetailsbody}>
        <Longtext text={post.descricao} />
      </div>
    </div>
  );
};

export default PostDetails;
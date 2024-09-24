import React, { useEffect, useState } from 'react';
import { getAllPosts, deletePost } from '@/services/posts';
import IPost from "@/interface/IPost";
import iconEditar from "@/../../public/assets/img/icon-editar.svg";
import iconExcluir from "@/../../public/assets/img/icon-sair.svg";

import Image from 'next/image';
import styles from '@/styles/modules/listPostAdm.module.css';
import Link from 'next/link';
import Cookie from "js-cookie";
import { formatDate } from '@/utils/appUtils';
import { sortListPostsById } from '@/utils/appUtils';

export default function ListPostAdmin() {
  const [posts, setPosts] = useState<IPost[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [alertShown, setAlertShown] = useState(false);

  const delPost = async (id: number) => {
    const cookie = Cookie.get('accessToken');

    const wasDelet = await deletePost(id, cookie);
  
    if (wasDelet && posts !== null) {
      setPosts(posts.filter(post => post.id !== id));
    } else {
      alert('Erro ao deletar post');
    }
  };

  useEffect(() => {
    const cookie = Cookie.get('accessToken');

    getAllPosts(cookie).then((data: React.SetStateAction<IPost[] | null>) => {
      if (data === null) {
        if (!alertShown) {
          setAlertShown(true);
          alert('posts/admin retornou 403');
        }
        setError('Token expirado, favor realizar novo login - Error 403');
      } else {
        setPosts(sortListPostsById(data as IPost[]));
        
      }
      setLoading(false);
    });
  }, [alertShown]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.post_grid}>
      <div className={styles.post_grid_header}>
        <span>Id</span>
        <span>Título</span>
        <span className={styles.desktop}>Descrição</span>
        <span className={styles.desktop}>Data Postada</span>
        <span className={styles.desktop}>Data Atualização</span>
        <span>Ações</span>
      </div>
      {posts?.map((post) => (
        <div className={styles.post_grid_row} key={post.id}>
          <span>{post.id}</span>
          <span>{post.titulo}</span>
          <span className={styles.desktop}>{post.descricao}</span>
          <span className={styles.desktop}>{formatDate(post.datapostagem)}</span>
          <span className={styles.desktop}>{formatDate(post.dataatualizacao)}</span>
          <span className={styles.actions}>
            <Link href={`/admin/post-editar/${post.id}`}>
              <Image src={iconEditar} alt='Editar' className="me-1" />
            </Link>
            <div onClick={() => delPost(post.id)}>
              <Image src={iconExcluir} alt='Excluir' />
            </div>
          </span>
        </div>
      ))}
    </div>
  );
}
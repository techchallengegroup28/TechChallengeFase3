import React, { useEffect, useState } from 'react';
import { getAllPosts } from '@/app/services/posts';
import IPost from "@/interface/IPost";
import iconEditar from "@/../../public/assets/img/icon-editar.svg";
import iconSair from "@/../../public/assets/img/icon-sair.svg";

import Image from 'next/image';
import styles from '@/styles/modules/listPostAdm.module.css';
import Link from 'next/link';
import Cookie from "js-cookie";

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
};

export default function ListPostAdmin() {
  const [posts, setPosts] = useState<IPost[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    const cookie = Cookie.get('accessToken');

    getAllPosts(cookie).then((data: React.SetStateAction<IPost[] | null>) => {
      if (data === null) {
        if (!alertShown) {
          setAlertShown(true);
          alert('posts/admin retornou 403');
        }
        setError('Sem autorização para buscar os posts, error 403');
      } else {
        setPosts(data);
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
        <span>Descrição</span>
        <span>Data Postada</span>
        <span>Data Atualização</span>
        <span>Ações</span>
      </div>
      {posts?.map((post) => (
        <div className={styles.post_grid_row} key={post.id}>
          <span>{post.id}</span>
          <span>{post.titulo}</span>
          <span>{post.descricao}</span>
          <span>{formatDate(post.datapostagem)}</span>
          <span>{formatDate(post.dataatualizacao)}</span>
          <span className={styles.actions}>
            <Link href={`/admin/post-editar/${post.id}`}>
              <Image src={iconEditar} alt='Editar' className="me-1" />
            </Link>
            <Link href={`/admin/post-editar/${post.id}`}>
              <Image src={iconSair} alt='Excluir' />
            </Link>
          </span>
        </div>
      ))}
    </div>
  );
}
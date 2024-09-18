'use client';
import React from 'react';
import ListPostAdm from '../../components/ListPostAdm';
import styles from '../../styles/modules/pageDashAdmin.module.css';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const newPost = () => {
    router.push('/admin/post-criar');
  };

  return (
    <div className="container">
      <main>
        <div className={styles.header}>
          <h1 className='color-primary'>Listagem de Posts</h1>
          <button className={styles['button-submit']} onClick={newPost}>Criar novo post</button>
        </div>
        <ListPostAdm />
      </main>
    </div>
  );
}
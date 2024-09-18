'use client';
import React, { useState } from 'react';
import iconPesquisar from "@/../../public/assets/img/icon-pesquisar.svg";
import Image from 'next/image';
import styles from '../styles/modules/barUser.module.css';

const Bar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className={styles.header}>
      <h1 className='color-primary'>Últimos posts</h1>
      <div className={styles.align_search}>
        <input
          className={styles.input}
          type="text"
          placeholder="Busque um post por título ou descrição"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <Image src={iconPesquisar} alt='Pesquisar' className={styles.img} onClick={handleSearch} />
        <div />
      </div>
    </div>
  );
};

export default Bar;
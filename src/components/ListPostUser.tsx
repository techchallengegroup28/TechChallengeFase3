import React, { useEffect, useState } from 'react';
import PostCard from './PostCard';
import styles from '@/styles/modules/listPostUser.module.css';
import IPost from '@/interface/IPost';
import { getAllPosts } from '@/services/posts';
import { sortListPostsById } from '@/utils/appUtils';

const ListPostUser = ({ searchQuery }: { searchQuery: string }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>([]);

  useEffect(() => {
    getAllPosts('').then((data: IPost[] | null) => {
      if (data) {
        setPosts(data);
      } else {
        setPosts([]);
      }
    });
  }, []);

  useEffect(() => {
    if (searchQuery !== '') {
      setFilteredPosts(posts.filter(post =>
        post.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.descricao.toLowerCase().includes(searchQuery.toLowerCase())
      ).sort((a, b) => b.id - a.id));
    } else {
      setFilteredPosts(sortListPostsById(posts));
    }
  }, [searchQuery, posts]);

  return (
    <div className={styles.post_grid}>
      {filteredPosts?.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
};

export default ListPostUser;
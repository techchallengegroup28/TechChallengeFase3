"use client";

import React from 'react';
import '@/styles/globals.css'
import styles from '@/styles/modules/postDetails.module.css';
import Longtext from '@/components/longText';


const description = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet sapien vitae sapien varius tempus. 
Integer vehicula mauris nisi, in faucibus felis volutpat vel. Ut fringilla urna mi, ut convallis turpis 
elementum sed. Curabitur volutpat malesuada augue at volutpat. Aliquam sodales tempor libero, ut convallis 
arcu laoreet vel. Vestibulum eget nisl quam. Duis eu felis magna. Aenean dapibus, purus a porttitor tincidunt, 
sem eros dapibus nisl, sed convallis justo erat a dui. Nulla id facilisis velit. Suspendisse posuere purus et 
lectus lacinia tincidunt. Integer tincidunt ac tortor nec viverra. Sed scelerisque mi nunc, sit amet malesuada 
ligula malesuada in. Sed viverra convallis mi in eleifend.

Mauris consectetur ligula nec turpis scelerisque, ac dictum sapien efficitur. Etiam malesuada vestibulum metus, 
et rutrum lorem condimentum sit amet. Curabitur tincidunt tincidunt justo in tincidunt. Fusce vestibulum et 
ligula in condimentum. Vestibulum ut dolor augue. Suspendisse auctor nulla nec fermentum ullamcorper. Integer 
posuere dapibus velit, et fringilla turpis ullamcorper sit amet. Fusce vehicula ligula at est vehicula, sit amet 
aliquam lacus cursus. Phasellus euismod libero non pharetra vulputate.
`;

const PostDetails = () => {
  return (
    <div className='container'> 
        <div className={styles.placeholderimage}></div>
        <h2 className={styles.postDetailstitle}>Titulo do Post</h2>
        <p className={styles.postDetailsmeta}> 
            Postado dia 01/09/2024 - Última atualização: 14/09/2024
        </p>
        <div className={styles.postDetailsbody}>
            <Longtext text={description} />       
        </div>
    </div>
  );
};

export default PostDetails;
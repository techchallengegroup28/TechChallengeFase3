// Renderiza pelo lado do cliente
// "use client";

import styles from '@/styles/modules/helloWord.module.css'


// Hello Word para chamadas de API
// async function getPosts() {
//     const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/posts?populate=*')
//     if (!res.ok) { throw new Error('Erro na chamada') }
//     return res.json()
// }

export default async function HelloWord() {
    // const posts = await getPosts()

    return (
        <>
            {/* para utilizar uma classe unica utilize:  */}
            <h1 className={styles.borda}>bem vindo ao Hello Word, saiba como usar mais o projeto no componente Hello Word</h1>
            
            
            {/* para utilizar uma classe unica com outros estilhos do global ou boostrap utilize:  */}
            <h1 className={`${styles.borda} color-primary text-center`}>bem vindo ao Hello Word</h1>

            

            {/* Como mostrar o conteudo dentro do array de posts */}
            {/* <pre>{JSON.stringify(posts)}</pre> */}

            
            {/* Como consumir conteudos dentro do array de posts*/}
            {/* {posts && posts.data.map((posts: any, index: number) => {
                <div key={index}>
                    <h2>{posts.attributes.title}</h2>
                    <p>{posts.attributes.url}</p>
                </div>
            })} */}
        </>
    )
}

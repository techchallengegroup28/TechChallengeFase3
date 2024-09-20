import IPost from "@/interface/IPost";

export async function getAllPosts(token: string | undefined): Promise<IPost[] | null> {
    try {
        let res;
        if (!token) {
            res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/posts');
        } else {
            res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/posts/admin', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            });
        }

        if (!res.ok) {
            throw new Error('Erro ao buscar os posts.');
        }

        const posts = await res.json();
        return posts;

    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        return null;
    }
}

export async function getPostById(idPost: number): Promise<IPost | null> {
    try {
        let res;
        if (idPost) {
            res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/posts/' + idPost);
        } else {
            throw new Error('Parâmetro passado é vazio ou nulo.');
        }

        if (!res.ok) {
            throw new Error('Erro ao buscar o post.');
        }

        const post = await res.json();
        return post;

    } catch (error) {
        console.error('Erro ao buscar post:', error);
        return null;
    }
}

export async function deletePost(id: number, token: string | undefined): Promise<boolean> {
    try {
        
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/posts/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao deletar post.');
        }

        return true;

    } catch (error) {
        console.error('Erro ao deletar post:', error);
        return false;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updatePost(payload: any, id: string, token: string | undefined): Promise<boolean> {
    try {
        
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/posts/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar post.');
        }

        return true;

    } catch (error) {
        console.error('Erro ao atualizar post - id: '+ id +': ', error);
        return false;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createPost(payload: any, token: string | undefined): Promise<boolean> {
    try {
        
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/posts', {
            method: "POST",
            headers: {
                'content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,            
            },
            body: JSON.stringify(payload),
 
        });

        if (!response.ok) {
            throw new Error('Erro ao criar post.');
        }

        return true;

    } catch (error) {
        console.error('Erro ao criar post: ', error);
        return false;
    }
}

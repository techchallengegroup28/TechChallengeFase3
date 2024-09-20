"use client";
import Cookie from "js-cookie";
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '@/styles/globals.css';
import styles from '@/styles/modules/postForm.module.css';
import { useRouter } from 'next/navigation';
import { getPostById, updatePost, createPost } from "@/services/posts";

interface PostFormValues {
    titulo: string;
    descricao: string;
    conteudo: string;
    imagem: File | null;
}

interface PostFormProps {
    idPost?: string;
}

const getPost = async (id: string) => {
    const post = await getPostById(Number(id));
    return post;
}

const dataURLtoFile = (dataurl: string, filename: string): File => {
    try{
    dataurl = dataurl.replace('dataimage/jpegbase64', 'data:image/jpeg;base64,').replace('dataimage/jpgbase64', 'data:image/jpg;base64,').replace('dataimage/webpbase64', 'data:image/webp;base64,');
    const arr = dataurl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
} catch (error) {
    console.error(error);
    return new File([], '');
  }
}

const PostForm: React.FC<PostFormProps> = ({ idPost }) => {
    const router = useRouter();
    const cookie = Cookie.get('accessToken')
    
    // console.log('PostForm: ' + idPost);

    const [serverError, setServerError] = useState<string | null>(null);
    const [serverSuccess, setServerSuccess] = useState<string | null>(null);
    const [initialValues, setInitialValues] = useState<PostFormValues>({
        titulo: '',
        descricao: '',
        conteudo: '',
        imagem: null
    });

    useEffect(() => {
        if (idPost) {
            getPost(idPost).then(post => {
                // console.log('PostForm - post:titulo ' + post?.titulo);
                // console.log('PostForm - post:descricao ' + post?.descricao);
                // console.log('PostForm - post:conteudo ' + post?.conteudo);
                // console.log('PostForm - post:imagem ' + post?.imagem);
                if (post) {
                    setInitialValues({
                        titulo: post.titulo,
                        descricao: post.descricao,
                        conteudo: post.conteudo,
                        imagem: post.imagem ? dataURLtoFile(post.imagem, 'imagem.png') : null
                    });
                }
            }).catch(error => {
                setServerError('Erro ao carregar o post' + error);
            });
        }
    }, [idPost]);

    const validationSchema = Yup.object({  
        titulo: Yup.string().required('O título é obrigatório'),
        descricao: Yup.string().required('A descrição é obrigatória'),
        conteudo: Yup.string().required('O conteúdo é obrigatório'),
       // imagem: Yup.mixed().nullable().required('A imagem é obrigatória'),      
    });

    const convertImageToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
    };  

    const handleSubmit = async (values: PostFormValues) => {

        try {
            const base64Image = values.imagem ? await convertImageToBase64(values.imagem) : null; 

            const payload = {
                titulo: values.titulo,
                descricao: values.descricao,
                conteudo: values.conteudo,
                imagem: base64Image,
            }; 
            
            console.log(payload);
            
            let response: Promise<boolean>;
            if (idPost){
                response = updatePost(payload, idPost, cookie);
            }else {
                response = createPost(payload, cookie);
            }

            if (!response) {
                throw new Error("Erro ao enviar os dados.");
            }
            
            setServerSuccess("Post enviado com sucesso!");

            setTimeout(() => {
              router.push("/admin"); 
            }, 2000);
          } catch (error) {
            console.error(error);
            setServerError("Ocorreu um erro ao enviar o post. Tente novamente.");
          }
    };  

    return (
        <div className="container">
            <h1 className={styles.title}>Criação/edição de post</h1>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue }) => (
                 <Form>   
                    <div>
                        <label className={styles.label} htmlFor="titulo">Título</label>
                        <Field
                            className={styles.input}
                            id="titulo"
                            name="titulo"
                            placeholder="Insira um título"
                            type="text"
                        />
                        <ErrorMessage name="titulo" component="div" className={styles.errormessage} />
                    </div>

                    <div>
                        <label className={styles.label} htmlFor="descricao">Descrição</label>
                        <Field
                            className={styles.input}
                            id="descricao"
                            name="descricao"
                            placeholder="Insira uma descrição"
                            type="text"
                        />
                        <ErrorMessage name="descricao" component="div" className={styles.errormessage} />
                    </div>

                    <div>
                        <label className={styles.label} htmlFor="conteudo">Conteúdo</label>
                        <Field
                            className={styles.textarea}
                            as="textarea"
                            id="conteudo"
                            name="conteudo"
                            placeholder="Insira um conteúdo"
                        />
                        <ErrorMessage name="conteudo" component="div" className={styles.errormessage} />
                    </div>

                    <div>
                        <label htmlFor="imagem">Selecione uma imagem</label>
                        <input
                            id="imagem"
                            name="imagem"
                            type="file"
                            onChange={(event) => {
                            if (event.currentTarget.files) {
                                setFieldValue("imagem", event.currentTarget.files[0]);
                            }
                            }}
                            className={styles.input}
                        />
                        <ErrorMessage name="imagem" component="div" className={styles.error} />
					</div>		

                    <div>                       
                        <button className={styles.button} type="submit">Salvar</button>
                    </div>
                 </Form>
                )}
            </Formik>
            
             {/* Exibe mensagem de sucesso ou erro */}
            {serverError && <div className={styles.error}>{serverError}</div>}
            {serverSuccess && <div className={styles.success}>{serverSuccess}</div>}            
        </div>
      );
    };
    
export default PostForm;
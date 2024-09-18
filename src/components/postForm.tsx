"use client";

import Cookie from "js-cookie";
import React, { useState }  from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '@/styles/globals.css';
import styles from '@/styles/modules/postForm.module.css';
import { useRouter } from 'next/navigation';

interface PostFormValues {
    titulo: string;
    descricao: string;
    conteudo: string;
    imagem: File | null;
}

const PostForm: React.FC = () => {
    const router = useRouter();
    const cookie = Cookie.get('accessToken')

    const [serverError, setServerError] = useState<string | null>(null);
    const [serverSuccess, setServerSuccess] = useState<string | null>(null);

    const initialValues: PostFormValues = {
        titulo: '',
        descricao: '',
        conteudo: '',
        imagem: null
    }

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

            const response = await fetch('http://localhost:3000/api/posts', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'conteudo-Type': 'application/json',
                    'Authorization': `Bearer ${cookie}`,            
                },
                body: JSON.stringify(payload),
     
            });

            if (!response.ok) {
                throw new Error("Erro ao enviar os dados");
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
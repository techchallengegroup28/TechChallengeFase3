"use client";

import Cookie from "js-cookie";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

interface PostFormValues {
	titulo: string;
	descricao: string;
	conteudo: string;
	imagem: string;
}

const validationSchema = Yup.object({
	titulo: Yup.string().required('Campo obrigatório'),
	descricao: Yup.string().required('Campo obrigatório'),
	conteudo: Yup.string().required('Campo obrigatório'),
	imagem: Yup.string().required('Imagem é obrigatória'),
});

const convertToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});
};

export default function CriarPost() {
	const router = useRouter()
	const cookie = Cookie.get('accessToken')

	const handleSubmit = async (values: PostFormValues, { setSubmitting, resetForm, setStatus }: FormikHelpers<PostFormValues>) => {

		try {
			const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/posts', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${cookie}`,
				},
				body: JSON.stringify(values),
			})

			const data = await response.json();
			console.log(data)

			if (!response.ok) {
				setStatus({ error: 'Erro ao criar o post. Tente mais tarde' });
				return;
			}

			router.push('/admin')
		} catch (err) {
			resetForm();
			setStatus({ error: 'Erro ao criar o post. Tente mais tarde' });
		}
	};

	return (
		<section>
			<div className='container'>
				<div className="row justify-content-center">
					<div className="col-12 col-md-8">
						<h1 className='color-primary'>Criar Post</h1>
						teste
						<Formik
							initialValues={{ titulo: '', descricao: '', conteudo: '', imagem: '' }}
							validationSchema={validationSchema}
							onSubmit={handleSubmit}
						>
							{({ isSubmitting, status, setFieldValue  }) => (
								<Form>
									<div className='mt-3'>
										<label htmlFor="titulo" className='d-block'>Titulo</label>
										<Field
											type="text"
											id="titulo"
											name="titulo"
											placeholder="Insira seu titulo"
										/>
										<ErrorMessage name="titulo" component="div" className="error" />
									</div>

									<div className='mt-3'>
										<label htmlFor="descricao" className='d-block'>Descrição</label>
										<Field
											type="text"
											id="descricao"
											name="descricao"
											placeholder="Insira seu descricao"
										/>
										<ErrorMessage name="descricao" component="div" className="error" />
									</div>

									<div className='mt-3'>
										<label htmlFor="conteudo" className='d-block'>Conteudo</label>
										<Field
											type="text"
											as="textarea"
											name="conteudo"
											placeholder="Insira seu conteudo"
										/>
										<ErrorMessage name="conteudo" component="div" className="error" />
									</div>

									<div className='mt-3'>
										<label htmlFor="imagem">Upload de imagem:</label>
										<input
											id="imagem"
											name="imagem"
											type="file"
											accept="image/*"
											onChange={async (event) => {
												const file = event.currentTarget.files?.[0];
												if (file) {
													const base64 = await convertToBase64(file);
													setFieldValue('imagem', base64);
												}
											}}
										/>
										<ErrorMessage name="imagem" component="div" className="error" />
									</div>

									<button type="submit" disabled={isSubmitting} className='mt-3'>
										Entrar
									</button>
									{status?.error && <div className='error mt-3'>{status.error}</div>}
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</div>
		</section>
	);
}

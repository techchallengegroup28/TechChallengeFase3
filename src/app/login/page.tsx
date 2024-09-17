"use client";

import Cookie from "js-cookie";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

interface LoginFormValues {
	email: string;
	password: string;
}

const validationSchema = Yup.object({
	email: Yup.string()
		.email('Email inválido')
		.required('Campo obrigatório'),
	password: Yup.string()
		.min(6, 'A senha deve ter no mínimo 6 caracteres')
		.required('Campo obrigatório'),
});

export default function Login() {
	const router = useRouter()

	const handleSubmit = async (values: LoginFormValues, { setSubmitting, resetForm, setStatus  }: FormikHelpers<LoginFormValues>) => {

		try {
			const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/auth/login', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			})

			const data = await response.json();

			if (!response.ok) {
				setStatus({ error: 'Erro ao fazer login. Verifique suas credenciais e tente novamente.' });
				return;
			}

			Cookie.set('accessToken', data.accessToken, { expires: 1 })
			router.push('/admin')
		} catch (err) {
			resetForm();
			setStatus({ error: 'Erro ao fazer login. Verifique suas credenciais e tente novamente.' });
		}
	};


	return (
		<section>
			<div className='container'>
				<div className="row justify-content-center">
					<div className="col-12 col-md-8 text-center">
						<h1 className='color-primary'>Login</h1>
						<pre>
							admin@email.com
						</pre>
						<pre>
							123456
						</pre>
						<Formik
							initialValues={{ email: '', password: '' }}
							validationSchema={validationSchema}
							onSubmit={handleSubmit}
						>
							 {({ isSubmitting, status }: { isSubmitting: boolean; status?: { error?: string } }) => (
								<Form>
									<div className='mt-3'>
										<label htmlFor="email" className='d-block'>Email</label>
										<Field
											type="email"
											id="email"
											name="email"
											placeholder="Insira seu email"
										/>
										<ErrorMessage name="email" component="div" className="error" />
									</div>
							
									<div className='mt-3'>
										<label htmlFor="password" className='d-block'>Senha</label>
										<Field
											type="password"
											id="password"
											name="password"
											placeholder="Insira sua senha"
											autoComplete="on"
										/>
										<ErrorMessage name="password" component="div" className="error" />
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

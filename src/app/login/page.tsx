"use client";

import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';

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

	const handleSubmit = (values: LoginFormValues, { setSubmitting }: FormikHelpers<LoginFormValues>) => {

		console.log('Valores do Formulário:', values);

		setTimeout(() => {
			// Simulação de uma requisição para a API
			setSubmitting(false);
			alert('Login realizado com sucesso!');
		}, 1000);

	};


	return (
		<section>
			<div className='container'>
				<div className="row justify-content-center">
					<div className="col-12 col-md-8 text-center">
						<h1 className='color-primary'>Login</h1>
						<Formik
							initialValues={{ email: '', password: '' }}
							validationSchema={validationSchema}
							onSubmit={handleSubmit}
						>
							{({ isSubmitting }: { isSubmitting: boolean }) => (
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
										/>
										<ErrorMessage name="password" component="div" className="error" />
									</div>

									<button type="submit" disabled={isSubmitting} className='mt-3'>
										Entrar
									</button>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</div>
		</section>
	);
}

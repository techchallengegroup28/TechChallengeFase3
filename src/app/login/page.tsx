"use client";

import Cookie from "js-cookie";
import { useState } from "react";
import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import styles from '@/styles/modules/login.module.css'; 
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
		.required('Campo obrigatório'),
});

export default function Login() {

	const [errorMessage] = useState<string | null>(null);
	const router = useRouter()

	const handleSubmit = async (values: LoginFormValues, { resetForm, setStatus  }: FormikHelpers<LoginFormValues>) => {

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
		<div className={styles.container}>
		  	<div className={styles.card}>
				<h2 className={styles.title}>Login</h2>
				<pre>
					admin@email.com
				</pre>
				<pre>
					123456
				</pre>
				<Formik
			  		initialValues={{ email: "", password: "" }}
			  		validationSchema={validationSchema}
			  		onSubmit={handleSubmit}
				>			  	
					{({ isSubmitting }) => (
					<Form>
						<div className="mb-4">
							<label htmlFor="email" className={styles.label}>
							Email
							</label>

							<Field
								type="email"
								id="email"
								name="email"
								className={styles.input}
								placeholder="Insira seu email"
							/>
							<ErrorMessage
								name="email"
								component="div"
								className={styles.errorMessage}
							/>
						</div>
	
						<div className="mb-6">
							<label htmlFor="password" className={styles.label}>
								Senha
							</label>

							<Field
								type="password"
								id="password"
								name="password"
								className={styles.input}
								placeholder="Insira sua senha"
							/>					
							<ErrorMessage
								name="password"
								component="div"
								className={styles.errorMessage}
							/>
						</div>
	
						{errorMessage && (
							<div className={styles.errorText}>
								{errorMessage}
							</div>
						)}
	
						<div className={styles.buttonWrapper}>
							<button
								type="submit"
								className={styles.button}
								disabled={isSubmitting}
							>
								{isSubmitting ? "Entrando..." : "Entrar"}
							</button>
						</div>
					</Form>
					)}
				</Formik>
			</div>			
		</div>
	);
}

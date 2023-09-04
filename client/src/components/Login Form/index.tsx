import { useForm } from 'react-hook-form';
import { Center } from '@chakra-ui/react';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { loginResolver } from './validator';
import { useSignInMutation } from '../../rtk-store/api/authApi';
import SubmitButton from '../Submit Button';
import LoginInputField from '../Input field/login';

export type LoginFormData = {
	email: string;
	password: string;
};

const LoginForm = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<LoginFormData>({ resolver: loginResolver });
	const [signIn, { isLoading, isError, error }] = useSignInMutation();

	async function onSubmit(values: LoginFormData) {
		try {
			const result = await signIn(values).unwrap();
			console.log('result:', result);
		} catch (error) {
			console.error('Error:', error);
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<LoginInputField
				register={register}
				errors={errors}
				id="email"
				placeholder="example@example.com"
				type="email"
				icon={MdEmail}
				label="Email"
			/>

			<LoginInputField
				register={register}
				errors={errors}
				id="password"
				placeholder="* * * * * * * * *"
				type="password"
				icon={RiLockPasswordFill}
				label="Password"
			/>

			<Center>
				<SubmitButton
					width={'10rem'}
					marginTop={'1.25rem'}
					bgColor={'action'}
					color={'primary'}
					borderRadius={'.85rem'}
					isLoading={isLoading}
					type={'submit'}
					text={'Sign in'}
				/>
			</Center>
		</form>
	);
};

export default LoginForm;

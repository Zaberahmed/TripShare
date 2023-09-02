import { Box, Center } from '@chakra-ui/react';
import LoginForm from '../../components/Login Form';

const LoginPage = () => {
	return (
		<Center h="100vh">
			<Box
				p={'1rem'}
				m={'auto'}
				maxW="sm"
				w="100%">
				<LoginForm />
			</Box>
		</Center>
	);
};

export default LoginPage;

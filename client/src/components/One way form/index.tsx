import { Box, Flex, FormControl, FormLabel, IconButton, Input, Select } from '@chakra-ui/react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import SubmitButton from '../Submit Button';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

type OneWayFormData = {
	source: string;
	destination: string;
	date: string;
	passenger: number;
	cabin: string;
};

const OneWayForm = () => {
	const {
		handleSubmit,
		control,
		register,
		formState: { errors },
		setValue,
		getValues,
	} = useForm<OneWayFormData>({
		defaultValues: {
			source: 'DAC',
			destination: 'CXB',
			date: new Date().toISOString().slice(0, 10),
			passenger: 1,
			cabin: 'economy',
		},
	});

	const onSubmit: SubmitHandler<OneWayFormData> = (data) => {
		console.log(data);
	};

	const handleIncrementPassenger = () => {
		const currentPassengerCount = getValues('passenger');
		if (currentPassengerCount < 5) {
			setValue('passenger', currentPassengerCount + 1);
		}
	};

	const handleDecrementPassenger = () => {
		const currentPassengerCount = getValues('passenger');
		if (currentPassengerCount > 1) {
			setValue('passenger', currentPassengerCount - 1);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Box>
				<FormControl isRequired>
					<FormLabel>Flying from</FormLabel>
					<Controller
						name="source"
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								placeholder="Dhaka"
								type="text"
							/>
						)}
					/>
				</FormControl>

				<FormControl
					mt="4"
					isRequired>
					<FormLabel>Flying to</FormLabel>
					<Controller
						name="destination"
						control={control}
						render={({ field }) => (
							<Input
								type="text"
								{...field}
								placeholder="Cox's bazar"
							/>
						)}
					/>
				</FormControl>

				<FormControl
					mt="4"
					isRequired>
					<FormLabel>Date</FormLabel>
					<Controller
						name="date"
						control={control}
						render={({ field }) => (
							<Input
								type="date"
								min={new Date().toISOString().split('T')[0]}
								{...field}
							/>
						)}
					/>
				</FormControl>

				<FormControl
					mt="4"
					isRequired>
					<FormLabel>Passenger</FormLabel>
					<Flex>
						<IconButton
							aria-label="Increment passenger"
							icon={<AddIcon />}
							onClick={handleIncrementPassenger}
						/>
						<Input
							type="number"
							max={5}
							{...register('passenger')}
						/>
						<IconButton
							aria-label="Decrement passenger"
							icon={<MinusIcon />}
							onClick={handleDecrementPassenger}
						/>
					</Flex>
				</FormControl>

				<FormControl
					mt="4"
					isRequired>
					<FormLabel>Cabin class</FormLabel>
					<Controller
						name="cabin"
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								value={field.value || 'economy'}>
								<option value="economy">Economy</option>
								<option value="business">Business</option>
								<option value="first">First</option>
							</Select>
						)}
					/>
				</FormControl>

				<SubmitButton
					width={'full'}
					marginTop={'2rem'}
					bgColor={'actionSecondary'}
					color={'primary'}
					borderRadius={'.5rem'}
					type={'submit'}
					text={'Search Flights'}
				/>
			</Box>
		</form>
	);
};

export default OneWayForm;

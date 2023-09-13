import { Text, Flex, Badge } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const getFormattedDate = (dateString: string) => {
	const date = new Date(dateString);
	const day = date.getDate();
	const month = date.toLocaleDateString('en-US', { month: 'long' });
	const year = date.getFullYear();

	let dayString;

	switch (day) {
		case 1:
		case 21:
		case 31:
			dayString = `${day}st`;
			break;
		case 2:
		case 22:
			dayString = `${day}nd`;
			break;
		case 3:
		case 23:
			dayString = `${day}rd`;
			break;
		default:
			dayString = `${day}th`;
			break;
	}

	return `${dayString} ${month}, ${year}`;
};

const TripInfoBox = () => {
	const [tripType, setTripType] = useState('');
	const [formData, setFormData] = useState({
		cities: [
			{
				source: '',
				sourceCity: '',
				destination: '',
				destinationCity: '',
				departureDate: '',
			},
		],
		source: '',
		sourceCity: '',
		destination: '',
		destinationCity: '',
		departureDate: '',
		returnDate: '',
		cabin: '',
		passenger: 0,
	});

	useEffect(() => {
		let savedFormData;
		const tripType = localStorage.getItem('tripType');
		if (tripType) {
			const parsedTripType = JSON.parse(tripType);
			setTripType(parsedTripType);
			if (parsedTripType === 'ONE_WAY') savedFormData = localStorage.getItem('oneWayFlightsFormData');
			else if (parsedTripType === 'ROUND_TRIP') savedFormData = localStorage.getItem('roundTripFlightsFormData');
			else if (parsedTripType === 'MULTI_CITY') savedFormData = localStorage.getItem('multiCityFlightsFormData');

			if (savedFormData) {
				const parsedFormData = JSON.parse(savedFormData);

				setFormData(parsedFormData);
			}
		}
	}, [tripType]);

	useEffect(() => {
		console.log('trip type:', tripType);
		console.log('form Data:', formData);
	}, [tripType]);

	return (
		<>
			{tripType === 'MULTI_CITY' ? (
				<Flex
					gap={'.25rem'}
					p={'.5rem'}
					direction={'column'}
					alignItems={'center'}
					boxShadow={'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'}
					bg={'beige'}
					borderRadius={'md'}>
					{formData.cities.map((city, index) => {
						return (
							<>
								<Badge
									key={index}
									p={'.25rem'}
									colorScheme="orange"
									borderRadius={'md'}
									m={'.25rem 0'}>
									<Text fontSize={'.875rem'}>
										({city.sourceCity.split(' ')[0]}){city.source} - {city.destination} ({city.destinationCity.split(' ')[0]})
									</Text>
								</Badge>
								<Badge
									key={city.destination}
									p={'.25rem'}
									colorScheme="blue"
									borderRadius={'md'}
									m={'.25rem 0'}>
									<Text fontSize={'.875rem'}>{getFormattedDate(city.departureDate)}</Text>
								</Badge>
							</>
						);
					})}
					<Flex
						gap={'.25rem'}
						wrap={'wrap'}>
						<Badge
							p={'.25rem'}
							colorScheme="green"
							borderRadius={'md'}
							m={'.25rem 0'}>
							<Text fontSize={'.875rem'}>{formData.cabin}</Text>
						</Badge>
						<Badge
							p={'.25rem'}
							colorScheme="blue"
							borderRadius={'md'}
							m={'.25rem 0'}>
							<Text fontSize={'.875rem'}>{formData.passenger} person(s)</Text>
						</Badge>
					</Flex>
				</Flex>
			) : (
				<>
					<Flex
						gap={'.25rem'}
						p={'.5rem'}
						direction={'column'}
						alignItems={'center'}
						boxShadow={'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'}
						bg={'beige'}
						borderRadius={'md'}>
						<Badge
							p={'.25rem'}
							colorScheme="orange"
							borderRadius={'md'}
							m={'.25rem 0'}>
							<Text fontSize={'.875rem'}>
								({formData.sourceCity}) {formData.source} - {formData.destination} ({formData.destinationCity})
							</Text>
						</Badge>

						<Flex
							gap={'.25rem'}
							wrap={'wrap'}>
							<Badge
								p={'.25rem'}
								colorScheme="blue"
								borderRadius={'md'}
								m={'.25rem 0'}>
								<Text fontSize={'.875rem'}>{getFormattedDate(formData.departureDate)}</Text>
							</Badge>

							<Badge
								p={'.25rem'}
								colorScheme="green"
								borderRadius={'md'}
								m={'.25rem 0'}>
								<Text fontSize={'.875rem'}>{formData.cabin}</Text>
							</Badge>
							<Badge
								p={'.25rem'}
								colorScheme="blue"
								borderRadius={'md'}
								m={'.25rem 0'}>
								<Text fontSize={'.875rem'}>{formData.passenger} person(s)</Text>
							</Badge>

							{tripType === 'ROUND_TRIP' && formData.returnDate ? (
								<Badge
									p={'.25rem'}
									colorScheme="blue"
									borderRadius={'md'}
									m={'.25rem 0'}>
									<Text fontSize={'.875rem'}> {getFormattedDate(formData.returnDate)}</Text>
								</Badge>
							) : null}
						</Flex>
					</Flex>
				</>
			)}
		</>
	);
};

export default TripInfoBox;

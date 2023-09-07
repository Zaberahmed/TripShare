import axiosInstance from '../axios';

export const testAPI = async () => {
	axiosInstance
		.get('/test')
		.then((res) => console.log(res.data))
		.catch((error) => console.error(error));
};

export const searchOneWayFlights = (sourceAirportCode: string, destinationAirportCode: string, date: any, numAdults: number, classOfService: string) => {
	return axiosInstance.get('/flights/searchFlights', {
		params: {
			sourceAirportCode,
			destinationAirportCode,
			date,
			itineraryType: 'ONE_WAY',
			sortOrder: 'PRICE',
			numAdults,
			numSeniors: '0',
			classOfService,
		},
	});
};
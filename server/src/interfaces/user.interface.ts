import { Types } from '../database';
import { Trip } from './trip.interface';

export interface User {
	_id?: Types.ObjectId;
	name: string;
	email: string;
	password: string;
	phone: string;
	gender?: string;
	nationality?: string;
	date_of_birth?: Date;
	passportId?: string;
	trips?: Trip[];
}

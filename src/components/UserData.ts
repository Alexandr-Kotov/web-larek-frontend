import { IUser, IUserData, TUserDelivery, TUserInfo } from '../types';
import { IEvents } from './base/events';

export class UserData implements IUserData {
	protected phone: string;
	protected email: string;
	protected address: string;
	protected payment: string;
	protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	getUserData(): IUser {
		return {
			payment: this.payment,
			address: this.address,
			email: this.email,
			phone: this.phone,
		};
	}

	setUserInfo(data: TUserInfo): void {
		this.phone = data.phone;
		this.email = data.email;
	}

	setUserDelivery(data: TUserDelivery): void {
		this.payment = data.payment;
		this.address = data.address;
	}
}

export interface ICard {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}

export interface IUser {
	phone: string;
	email: string;
	address: string;
	payment: string;
}

export interface ICardsData {
	items: ICard[];
	total: number;
	preview: string | null;
	addToBasket(item: ICard): void;
	deleteItem(itemId: string): void;
	getItem(itemId: string): ICard;
	getBasketItems(): ICard[];
	clearBasket(): void;
	getBasketTotal(): number;
	removeFromBasket(itemId: string): void;
	isInBasket(itemId: string): boolean;
}

export interface IUserData {
	setUserInfo(data: TUserInfo): void;
	setUserDelivery(data: TUserDelivery): void;
}

export type TCardList = Pick<ICard, 'title' | 'price'>;

export type TUserDelivery = Pick<IUser, 'address' | 'payment'>;

export type TUserInfo = Pick<IUser, 'phone' | 'email'>;

export type ApiPostMethods = 'POST';

export interface IApi {
	baseUrl: string;
	get<T>(uri: string): Promise<T>;
	post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface ICardsContainer {
	catalog: HTMLElement[];
}

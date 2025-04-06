import { IApi, ICard, ICardsData } from '../types';

export class AppApi {
	private _baseApi: IApi;

	constructor(baseApi: IApi) {
		this._baseApi = baseApi;
	}

	getItems(): Promise<ICardsData> {
		return this._baseApi
			.get<ICardsData>(`/product`)
			.then((data: ICardsData) => data);
	}

	getItem(itemId: string): Promise<ICard> {
		return this._baseApi
			.get<ICard>(`/product/${itemId}`)
			.then((item: ICard) => item);
	}

	postOrder(data: {
		total: number;
		payment: string;
		email: string;
		phone: string;
		address: string;
		items: string[];
	}): Promise<{ success: boolean }> {
		return this._baseApi.post<{ success: boolean }>(`/order`, data, 'POST');
	}
}

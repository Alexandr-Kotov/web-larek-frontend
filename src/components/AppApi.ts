import { IApi,IItem } from '../types';

export class AppApi {
	private _baseApi: IApi;

	constructor(baseApi: IApi) {
		this._baseApi = baseApi;
	}

	getItems(): Promise<IItem[]> {
		return this._baseApi.get<IItem[]>(`/product`).then((items: IItem[]) => items);
	}

	getItem(itemId: string): Promise<IItem> {
		return this._baseApi.get<IItem>(`/product/${itemId}`).then((item: IItem) => item);
	}
}
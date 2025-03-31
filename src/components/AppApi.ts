import { IApi,IItem, IItemsData } from '../types';

export class AppApi {
	private _baseApi: IApi;

	constructor(baseApi: IApi) {
		this._baseApi = baseApi;
	}

	getItems(): Promise<IItemsData> {
		return this._baseApi.get<IItemsData>(`/product`).then((data: IItemsData) => data);
	}

	getItem(itemId: string): Promise<IItem> {
		return this._baseApi.get<IItem>(`/product/${itemId}`).then((item: IItem) => item);
	}
}
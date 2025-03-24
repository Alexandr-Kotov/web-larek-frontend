export interface IItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number;
};

export interface IUser {
  telephone: number;
  mail: string;
  address: string;
  payment: string;
};

export interface IItemsData {
  items: IItem[];
  preview: string | null;
  addItem(itemId: string): IItem;
  deleteItem(itemId: string): void;
  getItem(itemId: string): IItem;
};

export interface IUserData {
  setUserInfo(data: TUserInfo): void;
  setUserDelivery(data: TUserDelivery): void;
  setTelephone(telephone: number): void;
  setMail(mail: string): void;
  setAddress(address: string): void;
  setPayment(payment: string): void
}

export type TItemList = Pick<IItem, 'title' | 'price'>;

export type TUserDelivery = Pick<IUser, 'address' | 'payment'>;

export type TUserInfo = Pick<IUser, 'telephone' | 'mail'>;

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}
export interface ICardsContainer {
  catalog: HTMLElement[];
}
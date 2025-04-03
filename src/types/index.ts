export interface ICard {
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

export interface ICardsData {
  items: ICard[];
  total: number;
  preview: string | null;
  addItem(itemId: string): ICard;
  deleteItem(itemId: string): void;
  getItem(itemId: string): ICard;
};

export interface IUserData {
  setUserInfo(data: TUserInfo): void;
  setUserDelivery(data: TUserDelivery): void;
  setTelephone(telephone: number): void;
  setMail(mail: string): void;
  setAddress(address: string): void;
  setPayment(payment: string): void
}

export type TCardList = Pick<ICard, 'title' | 'price'>;

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
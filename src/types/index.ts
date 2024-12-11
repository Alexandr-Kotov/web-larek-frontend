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
  checkUserValidation(data: Record<keyof IUser, string | number>): boolean;
}

export type TItemList = Pick<IItem, 'title' | 'price'>;

export type TUserDelivery = Pick<IUser, 'address' | 'payment'>;

export type TUserInfo = Pick<IUser, 'telephone' | 'mail'>;
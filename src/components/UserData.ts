import { IUserData, TUserDelivery, TUserInfo } from "../types";
import { IEvents } from "./base/events";

export class UserData implements IUserData {
  protected telephone: number;
  protected mail: string;
  protected address: string;
  protected payment: string;
  protected events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
  }

  setUserInfo(data: TUserInfo): void {
    this.telephone = data.telephone;
    this.mail = data.mail;
  }

  setUserDelivery(data: TUserDelivery): void {
    this.payment = data.payment;
    this.address = data.address;
  }

  setTelephone(telephone: number): void {
    if (!telephone) {
      throw new Error('Телефонный номер не может быть пустым или равным нулю.');
    }
    this.telephone = telephone;
  }

  setMail(mail: string): void {
    if (!mail) {
      throw new Error('Email не может быть пустым.');
    }
    this.mail = mail;
  }

  setAddress(address: string): void {
    if (!address) {
      throw new Error('Адрес не может быть пустым.');
    }
    this.address = address;
  }

  setPayment(payment: string): void {
    if (!payment) {
      throw new Error('Способ оплаты не может быть не выбраным.');
    }
    this.payment = payment;
  }
};
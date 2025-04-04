import { AppApi } from './components/AppApi';
import { Api } from './components/base/api';
import { EventEmitter, IEvents } from './components/base/events';
import { Basket } from './components/Basket';
import { Card } from './components/Card';
import { CardsContainer } from './components/CardsContainer';
import { ContactForm } from './components/ContactForm';
import { DetailedInformation } from './components/DetailedInformation';
import { Form } from './components/Form';
import { Modal } from './components/Modal';
import './scss/styles.scss';
import { IApi, ICard, ICardsData } from './types';
import { API_URL, settings } from './utils/constants';

const events: IEvents = new EventEmitter();
const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi);

// Модальное окно для карточек
const modalElement = document.querySelector('#modal-card') as HTMLElement;
const modal = new Modal(modalElement, events);
const detailedInfo = new DetailedInformation(modalElement.querySelector('.modal__content'), events);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { ItemsData } from './components/ItemsData';
import { CardsPresenter } from './components/CardsPresenter';
const cardTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const galleryElement = document.querySelector('.gallery') as HTMLElement;

// ===== Model =====
const itemsData = new ItemsData(events);

// ===== Presenter =====
const cardsPresenter = new CardsPresenter(itemsData, cardTemplate, galleryElement, events);


// ===== Получение данных =====
api.getItems().then((data) => {
  itemsData.items = data.items;
  cardsPresenter.displayItems();
});



const basketModalElement = document.querySelector('#modal-bascet') as HTMLElement;
const basketModal = new Modal(basketModalElement, events);

import { BasketPresenter } from './components/BasketPresenter';

const basket = new Basket(basketModalElement, events);

new BasketPresenter(basket, events);


// const bascet = new Basket(basketModalElement, events);
// bascet.clear()

// events.on('card:add', (itemData: ICard) => {
//     bascet.addItem(itemData); // Добавляем товар в корзину
//     modal.close();
// });
/////////////////////////////////////////////////////////////////////////////////////////////////////////yy

// Модальное окно корзины
// const basketModalElement = document.querySelector('#modal-bascet') as HTMLElement;
// const basketModal = new Modal(basketModalElement, events);
// const basketButton = document.querySelector('.header__basket');

// basketButton.addEventListener('click', () => {
//     basketModal.open();
// })



// оформление заказа

const orderButton = document.querySelector("#basket-order-button") as HTMLButtonElement;
const orderModalElement = document.querySelector("#modal-order") as HTMLElement;
const orderFormElement = orderModalElement.querySelector(".form") as HTMLFormElement;
const orderModal = new Modal(orderModalElement, events);
const orderForm = new Form(orderFormElement);

orderButton.addEventListener("click", () => {
    orderForm.resetForm();
    basketModal.close();
    orderModal.open();
});

// контакт форм

const contactModalElement = document.querySelector("#modal-contact") as HTMLElement;
const contactFormElement = contactModalElement.querySelector(".form") as HTMLFormElement;
const contactModal = new Modal(contactModalElement, events);
const contactForm = new ContactForm(contactFormElement);
const orderFormSubmitButton = document.querySelector('#form__next-button');

// Переход на форму оплаты (вместо console.log в handleSubmit первого Form-а):
orderFormSubmitButton.addEventListener("click", () => {
    orderModal.close();
    contactForm.resetForm(); // на всякий случай
    contactModal.open();
  });


// успешный заказ

import { Successfully } from "./components/Successfully";
const modalSuccessdully = document.querySelector("#modal-successfully") as HTMLElement;
const successfullyModal = new Modal(modalSuccessdully, events);
const payButton = document.querySelector('#pay-button');
const successModal = new Successfully(modalSuccessdully);


payButton.addEventListener('click', () => {
    contactModal.close();
    successfullyModal.open();
    // successModal.update(bascet.totalPrice());
    // bascet.clear();// очищаем список корзины и счетчик при заполение информации клиента
})

// закрытие окна успешной покупки
const orderCloseButton = document.querySelector('.order-success__close');

orderCloseButton.addEventListener('click', () => {
    successfullyModal.close();
})
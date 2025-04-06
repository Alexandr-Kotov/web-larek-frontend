import { AppApi } from './components/AppApi';
import { Api } from './components/base/api';
import { events } from './utils/utils';
import { Basket } from './components/Basket';
import { Modal } from './components/Modal';
import './scss/styles.scss';
import { IApi } from './types';
import { API_URL, settings } from './utils/constants';
import { BasketPresenter } from './components/BasketPresenter';
import { DetailedInformation } from './components/DetailedInformation';
import { FormPresenter } from './components/FormPresenter';
import { Form } from './components/Form';
import { ItemsData } from './components/ItemsData';
import { CardsPresenter } from './components/CardsPresenter';
import { ContactForm } from './components/ContactForm';
import { ContactFormPresenter } from './components/ContactFormPresenter';
import { SuccessfullyPresenter } from './components/SuccessfullyPresenter';
import { UserData } from './components/UserData';

const orderButton = document.querySelector("#basket-order-button") as HTMLButtonElement;
const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi);
const cardTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const galleryElement = document.querySelector('.gallery') as HTMLElement;
const orderFormSubmitButton = document.querySelector('#form__next-button') as HTMLButtonElement;

// ===== Модальные окна =====
const basketModalElement = document.querySelector('#modal-bascet') as HTMLElement;
const basketModal = new Modal(basketModalElement, events);

const modalElement = document.querySelector('#modal-card') as HTMLElement;
const modalCard = new Modal(modalElement, events);

const orderModalElement = document.querySelector("#modal-order") as HTMLElement;
const orderFormElement = orderModalElement.querySelector(".form") as HTMLFormElement;
const orderModal = new Modal(orderModalElement, events);
const orderForm = new Form(orderFormElement);

const contactModalElement = document.querySelector("#modal-contact") as HTMLElement;
const contactFormElement = contactModalElement.querySelector(".form") as HTMLFormElement;
const contactModal = new Modal(contactModalElement, events);
const contactForm = new ContactForm(contactFormElement);
// ===== Model =====

const itemsData = new ItemsData(events);
const userData = new UserData(events)

// ===== Presenter =====
const basket = new Basket(basketModalElement, events, itemsData);
new BasketPresenter(basket, events,itemsData, basketModal, modalCard);

const detailedInfo = new DetailedInformation(modalElement.querySelector('.modal__content'), events, basket, itemsData);
const cardsPresenter = new CardsPresenter(itemsData, cardTemplate, galleryElement, events, modalCard, detailedInfo, basket);

new FormPresenter(orderForm, orderModal, events, orderButton, basketModal, userData);
const contactFormPresenter = new ContactFormPresenter(contactForm, contactModal, events, userData);
contactFormPresenter.attachOpenHandler(orderFormSubmitButton, orderModal);

// ===== Получение данных =====

api.getItems().then((data) => {
  itemsData.items = data.items;
  cardsPresenter.displayItems();
});

const modalSuccessdully = document.querySelector("#modal-successfully") as HTMLElement;
const successfullyModal = new Modal(modalSuccessdully, events);
const successfullyPresenter = new SuccessfullyPresenter(modalSuccessdully, successfullyModal, events, itemsData, api, userData);

// Кнопка оплаты и контактная модалка
const payButton = document.querySelector('#pay-button') as HTMLButtonElement;
successfullyPresenter.bindPayButton(payButton, contactModal);
# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Данные и типы данных, используемые в приложения

Карточка.

```
export interface ICard {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}
```

Данные пользователя.

```
export interface IUser {
	phone: string;
	email: string;
	address: string;
	payment: string;
}
```

Интерфейс для модели данных карточек.

```
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
```

Интерфейс для модели данных форм.

```
export interface IUserData {
	setUserInfo(data: TUserInfo): void;
	setUserDelivery(data: TUserDelivery): void;
}
```

Данные карточек используемые в форме корзины 

```
export type TCardList = Pick<ICard, 'title' | 'price'>;
```

Данные пользоваетеля при форомление формы способа оплаты и адреса

```
export type TUserDelivery = Pick<IUser, 'address' | 'payment'>;
```

Данные пользоваетеля при форомление формы номера телефона и почты

```
export type TUserInfo = Pick<IUser, 'phone' | 'email'>;
```

Методы для выполнения HTTP-запросов.

```
export type ApiPostMethods = 'POST';
```

Интерфейс, который описывает работу с API-сервером.

```
export interface IApi {
	baseUrl: string;
	get<T>(uri: string): Promise<T>;
	post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}
```

Интерфейс, описывающий контейнер для отображения карточек товаров на странице.

```
export interface ICardsContainer {
	catalog: HTMLElement[];
}
```

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP: 
- слой Model предоставляет данные для пользовательского интерфейса. 
- слой View реализует отображение данных (Модели) и маршрутизацию пользовательских команд или событий Presenterʼу.
- слой Presenter управляет Model и View. Например извлекает данные из Model и форматирует их для отображения в View.

# Базовый код

## Класс Api
Содержит в себе базовую логику отправки запросов. В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.
Методы: 
- `get` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер
- `post` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.

## Класс EventEmitter
Брокер событий позволяет отправлять события и подписываться на события, происходящие в системе. Класс используется в презентере для обработки событий и в слоях приложения для генерации событий.  
Основные методы, реализуемые классом описаны интерфейсом `IEvents`:
- `on` - подписка на событие
- `emit` - инициализация события
- `trigger` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие   

# Слой Model (данных)

## Класс ItemsData

Класс ItemsData отвечает за хранение и обработку данных карточек товаров. Он управляет состоянием каталога и корзины, а также предоставляет методы для работы с товарами. Класс использует брокер событий для отслеживания изменений и взаимодействия с другими компонентами приложения.

Параметры конструктора:
- `events: IEvents` — Экземпляр класса для управления событиями (например, для отслеживания добавления или удаления товаров).

В полях класса хранятся следующие данные:

- `_basket: ICard[]` — Массив объектов товаров, которые находятся в корзине.
- `_preview: string | null` — Идентификатор карточки товара, выбранной для предварительного просмотра (в модальном окне). По умолчанию равен null.
- `_total: number` — Общее количество товаров в массиве _items.
- `events: IEvents` — Экземпляр класса для отслеживания событий. Например, для подписки на события изменения состояния корзины.

Так же класс предоставляет набор методов для взаимодействия с этими данными.

- `set items(items: ICard[])` - Устанавливает массив товаров в каталоге, а также обновляет общее количество товаров.
- `get items(): ICard[]` - Геттер для получения всех товаров в каталоге.
- `get preview(): string | null` - Геттер для получения id выбранной карточки товара для предварительного просмотра.
- `get total(): number` - Геттер для получения общего количества товаров в каталоге.
- `getItem(cardId: string): ICard | null` - Возвращает товар по его id, если такой товар существует в каталоге. Если товар не найден, возвращает null.
- `deleteItem(cardId: string): void` - Удаляет товар из каталога по его id.
- `addToBasket(item: ICard): void` - Добавляет товар в корзину, если его нет в корзине.
- `removeFromBasket(itemId: string):` - void Удаляет товар из корзины по его id.
- `isInBasket(itemId: string): boolean` - Проверяет, есть ли товар с указанным id в корзине.
- `getBasketItems(): ICard[]` - Возвращает все товары, находящиеся в корзине.
- `getBasketTotal(): number` - Возвращает общую стоимость товаров в корзине. Если цена товара null, то она считается равной 0.
- `clearBasket(): void` - Очищает корзину, удаляя все товары из массива _basket.

## Класс UserData

Класс UserData управляет данными текущего пользователя, такими как номер телефона, электронная почта, адрес и способ оплаты. Он предоставляет методы для сохранения и получения информации о пользователе, а также реализует логику для валидации данных, поступающих от пользователя.

Параметры конструктора:
- `events: IEvents` — Экземпляр класса для управления событиями (например, для отслеживания изменений данных пользователя).

В полях класса хранятся следующие данные:

- `phone: string` — Номер телефона пользователя.
- `email: string` — Электронная почта пользователя.
- `address: string` — Адрес пользователя для доставки.
- `payment: string` — Способ оплаты, выбранный пользователем.
- `events: IEvents` — Экземпляр класса для отслеживания событий. Например, для подписки на события изменения данных пользователя.

Так же класс предоставляет набор методов для взаимодействия с этими данными.

- `getUserData(): IUser` - Возвращает объект, содержащий все данные пользователя (телефон, почту, адрес и способ оплаты).
- `setUserInfo(data: TUserInfo): void` - Сохраняет информацию о пользователе, включая номер телефона и электронную почту. Метод - принимает объект типа TUserInfo и сохраняет эти данные.
`setUserDelivery(data: TUserDelivery): void` - Сохраняет информацию о способе доставки пользователя, включая адрес и способ оплаты. Метод принимает объект типа TUserDelivery и сохраняет эти данные.
- `setTelephone(telephone: string): void` - Метод для установки номера телефона. Проверяет, что номер телефона не пустой.
- `setMail(mail: string): void` Метод для установки электронной почты. Проверяет, что почта не пуста.
- `setAddress(address: string): void` - Метод для установки адреса. Проверяет, что адрес не пустой.
- `setPayment(payment: string): void` - Метод для установки способа оплаты. Проверяет, что способ оплаты не пустой.

# Слой View (представления)

## Класс Modal
Класс Modal отвечает за реализацию модального окна с возможностью закрытия как при клике на оверлей, так и по нажатию клавиши Escape, а также с возможностью закрытия через кнопку-крестик.

Параметры конструктора:
- `container: HTMLElement` — Элемент модального окна, который передается в конструктор для управления его открытием и закрытием.
- `events: IEvents` — Экземпляр класса EventEmitter, который используется для инициации событий.

Поля класса:

- `modal: HTMLElement` — Элемент модального окна, с которым будет работать класс.
- `events: IEvents` — Экземпляр брокера событий для обработки событий, связанных с модальным окном.
- `container: HTMLElement` — Элемент, который содержит сам модальный попап и на который устанавливаются обработчики событий.

Методы:

- `open(): void` - Открывает модальное окно. Добавляет класс modal_active на контейнер, что делает окно видимым. Также добавляет слушатель события на клавишу Escape, чтобы окно можно было закрыть по этой клавише.
- `close(): void` - Закрывает модальное окно. Убирает класс modal_active с контейнера, скрывая окно, и удаляет слушатель события для клавиши Escape.
- `handleEscUp(evt: KeyboardEvent): void` - Закрывает модальное окно, если была нажата клавиша Escape. Метод вызывается при событии keyup на документе.
- `setClosePopupEventListeners(): void` - Устанавливает обработчики событий для закрытия окна:
При клике на оверлей (если клик произошел по самой области модального окна, а не по его содержимому) окно закрывается.
При клике на кнопку с классом .modal__close окно также закрывается.

## Класс DetailedInformation
Класс DetailedInformation предназначен для отображения модального окна с детальной информацией о товаре. Он управляет обновлением содержимого окна в зависимости от выбранной карточки товара, а также позволяет добавлять или удалять товар из корзины при взаимодействии с кнопкой.

Параметры конструктора:

- `container: HTMLElement` — Контейнер, в котором находится модальное окно с детальной информацией о товаре.
- `events: IEvents` — Экземпляр класса EventEmitter для инициации событий при добавлении или удалении товара из корзины.
- `basket: Basket` — Экземпляр корзины, необходимый для добавления и удаления товара из корзины.
- `itemsData: ItemsData` — Экземпляр класса ItemsData, используемый для проверки, содержится ли товар в корзине.

Поля класса:

- `description: HTMLElement` — Элемент разметки, в котором отображается описание товара.
- `image: HTMLImageElement` — Элемент разметки для изображения товара.
- `title: HTMLElement` — Элемент разметки для названия товара.
- `category: HTMLElement` — Элемент разметки для категории товара.
- `price: HTMLElement` — Элемент разметки для отображения цены товара.
- `submitButton: HTMLButtonElement` — Кнопка для добавления или удаления товара из корзины.
- `events: IEvents` — Экземпляр класса для обработки событий.
- `container: HTMLElement` — Контейнер, в котором находится модальное окно с детальной информацией.
- `id: string` — Уникальный идентификатор товара.
- `cardData: ICard` — Данные о товаре, которые отображаются в модальном окне.
- `basket: Basket` — Корзина для управления добавлением и удалением товаров.
- `itemsData: ItemsData` — Экземпляр для работы с данными о карточках товаров.

Методы:

- `update(itemData: Partial<ICard>, isInBasket: boolean): void`
Обновляет содержимое модального окна, подставляя данные о товаре:
`itemData` — Частичные данные товара для обновления.
`isInBasket` — Флаг, показывающий, находится ли товар в корзине.
Метод обновляет:
Описание товара.
Изображение товара.
Категорию товара.
Название товара.
Цена товара.
Также обновляется текст на кнопке в зависимости от того, находится ли товар в корзине.
- `private updateButtonText(isInBasket: boolean): void`
Обновляет текст на кнопке в зависимости от того, добавлен ли товар в корзину:
Если товар в корзине, текст кнопки меняется на "Убрать из корзины".
Если товар не в корзине, текст кнопки меняется на "Добавить в корзину".

## Класс Form
Класс Form предназначен для работы с модальной формой, содержащей поля для ввода адреса пользователя и выбора способа оплаты. Он позволяет управлять состоянием формы, отображать ошибки валидации и управлять активностью кнопки подтверждения. При отправке формы сохраняются введенные данные.
Параметры конструктора:
- `formElement: HTMLFormElement` — Элемент формы, с которым будет работать класс.

Поля класса:
- `_form: HTMLFormElement` — Ссылается на элемент формы.
- `submitButton: HTMLButtonElement` — Кнопка подтверждения (подтверждения действия).
- `paymentButtons: NodeListOf<HTMLButtonElement>` — Коллекция кнопок для выбора способа оплаты.
- `addressInput: HTMLInputElement` — Поле ввода для адреса.
- `selectedPayment: string | null` — Выбранный способ оплаты (изначально null, если не выбран).

Методы:
- `selectPayment(event: Event): void`
Обрабатывает выбор способа оплаты. При выборе кнопки:
Устанавливает выбранный способ оплаты.
Обновляет состояние кнопки для отображения активного выбора.
Валидирует форму и обновляет доступность кнопки подтверждения.

- `validateForm(): void`
Выполняет валидацию формы, проверяя, что оба поля — способ оплаты и адрес — заполнены:
Если оба поля заполнены, активирует кнопку подтверждения.
Если хотя бы одно поле не заполнено, кнопка подтверждения остаётся заблокированной.

- `setValid(isValid: boolean): void`
Изменяет состояние кнопки подтверждения:
Если isValid истинно, кнопка активируется.
Если isValid ложно, кнопка остаётся заблокированной.

`getFormData(): { paymentMethod: string | null; address: string | null }`
Возвращает данные формы в виде объекта:
paymentMethod — выбранный способ оплаты.
address — введённый адрес.

- `handleSubmit(event: Event): void`
Обрабатывает отправку формы:
Если форма невалидна (пустой адрес или не выбран способ оплаты), отменяет отправку.
Если форма валидна, очищает стиль активных кнопок и блокирует кнопку подтверждения.

- `resetForm(): void`
Сбрасывает форму:
Очищает все поля формы.
Снимает выделение с кнопок способов оплаты.
Блокирует кнопку подтверждения.


## Класс Basket
Класс Basket предназначен для реализации функционала корзины покупок в модальном окне, где отображаются товары, добавленные пользователем, а также сумма и управление состоянием корзины. Класс отвечает за рендеринг товаров в корзине, вычисление общей стоимости, управление состоянием кнопки оформления заказа и отображение количества товаров в корзине.

Параметры конструктора:
- `container: HTMLElement` — Контейнер, в котором будет отображаться корзина.
- `events: IEvents` — Экземпляр класса для работы с событиями.
- `itemsData: ICardsData` — Данные товаров и логика взаимодействия с ними (например, добавление в корзину, удаление, получение списка товаров в корзине).

Поля класса:
- `itemsList: HTMLElement` — Список товаров в корзине (элемент, в который добавляются товары).
- `totalPriceElement: HTMLElement` — Элемент, отображающий общую стоимость товаров в корзине.
- `template: HTMLTemplateElement` — Шаблон элемента карточки товара для корзины.
- `orderButton: HTMLButtonElement` — Кнопка для оформления заказа.
- `basketCounter: HTMLElement` — Элемент для отображения количества товаров в корзине.
- `itemsData: ICardsData` — Данные о товарах (содержит логику добавления, удаления и получения товаров из корзины).

Методы класса:
- `addItemToBasket(item: ICard): void`
Добавляет товар в корзину, если он ещё не был добавлен. После этого:
Рендерит все товары в корзине.
Обновляет общую стоимость корзины.
Обновляет количество товаров в корзине.
Обновляет состояние кнопки оформления заказа.

- `renderItem(item: ICard): void`
Отображает товар в корзине, используя шаблон для карточки товара:
Устанавливает название и цену товара.
Добавляет обработчик для кнопки удаления товара из корзины.

- `renderAllItems(): void`
Очищает список товаров в корзине и рендерит все товары, добавленные в корзину.

- `updateTotalPrice(): number`
Обновляет отображаемую стоимость товаров в корзине, вычисляя общую цену всех товаров. Возвращает общую сумму.

- `updateBasketCounter(): void`
Обновляет количество товаров в корзине и отображает его в соответствующем элементе.

- `updateOrderButtonState(): void`
Обновляет состояние кнопки оформления заказа:
Если сумма товаров в корзине больше 0, кнопка активна.
Если корзина пуста, кнопка заблокирована.

- `clear(): void`
Очищает корзину, удаляя все товары, и обновляет интерфейс (перерендеривает товары, пересчитывает общую стоимость и обновляет количество товаров).

## Класс Successfully
Класс Successfully отвечает за отображение модального окна с сообщением об успешной покупке. Он обновляет модальное окно с информацией о сумме, списанной с пользователя, после успешного оформления заказа. Модальное окно отображает соответствующее сообщение, информируя пользователя о подтверждении его покупки.

Параметры конструктора:
- `modalElement: HTMLElement` — Элемент, представляющий модальное окно, в котором отображается информация о успешной покупке.

Поля класса:
- `modalElement: HTMLElement` — Основной элемент модального окна, которое будет отображаться пользователю.
- `totalAmountElement: HTMLElement` — Элемент внутри модального окна, в котором отображается сумма, списанная с пользователя.

Методы класса:
- `update(totalAmount: number): void`
Обновляет содержание модального окна, отображая сообщение о том, сколько синапсов было списано с пользователя.

Параметры:
- `totalAmount: number` — Сумма, которая была списана с пользователя (в синапсах).

## Класс Card
Класс Card отвечает за отображение карточки товара на странице. Он использует переданный шаблон HTML для динамического заполнения данных о товаре, таких как категория, название, изображение и цена. Класс позволяет создавать карточки товаров с гибкой настройкой отображения, используя различные варианты верстки. Взаимодействие с карточкой может инициировать события, что позволяет эффективно управлять пользовательскими действиями.

Параметры конструктора:
- `template: HTMLTemplateElement` — Шаблон карточки товара, который используется для формирования новых элементов на странице. Это позволяет гибко использовать различные виды карточек с разной версткой.

Поля класса:
- `cardData: Partial<ICard>` — Хранит данные карточки, такие как категория, описание, цена, изображение и т. д.
- `cardId: string` — Уникальный идентификатор карточки товара.
- `element: HTMLElement` — Элемент DOM, который представляет карточку товара на странице.
- `template: HTMLTemplateElement` — Шаблон HTML для создания карточки товара.

Методы класса:
- `render(itemData: Partial<ICard>): HTMLElement`
Метод возвращает полностью сформированную карточку с заполненными данными. Он наполняет элементы карточки значениями из переданных данных товара.
Параметры:

- `itemData: Partial<ICard>` — Данные карточки товара, которые необходимо отобразить.
Этот метод клонирует шаблон, заполняет его данными и возвращает готовый элемент DOM.

- `private fillCardData(itemData: Partial<ICard>)`
Метод наполняет карточку данными, устанавливая значения для различных элементов карточки (категория, описание, изображение, цена и название). Это позволяет гибко отображать информацию, переданную через параметр itemData.

- `get id(): string`
Геттер, который возвращает уникальный идентификатор карточки товара.

## Класс CardsContainer
Класс CardsContainer отвечает за управление и отображение блока с карточками товаров на главной странице. Он предоставляет методы для добавления карточек, обновления содержимого блока с карточками и очистки контейнера. Это позволяет динамически управлять отображением карточек на странице, заменяя или добавляя их при необходимости.

Параметры конструктора:
`container: HTMLElement `— Контейнер, в который будут добавляться или из которого будут удаляться карточки товаров.

Поля класса:
`container: HTMLElement` — Контейнер для карточек, который был передан в конструктор класса.

Методы класса:
`set catalog(items: HTMLElement[]): void`
Метод заменяет все текущие элементы контейнера на новые элементы карточек. Это позволяет обновить содержимое блока с карточками товаров.

Параметры:
`items: HTMLElement[]` — Массив новых карточек, которые будут отображены в контейнере.
`render(data: Partial<ICardsContainer>): HTMLElement`
Метод позволяет обновить свойства контейнера, используя переданные данные. Он присваивает данные свойствам текущего объекта и возвращает обновленный контейнер.
Параметры:
`data: Partial<ICardsContainer>` — Данные для обновления свойств контейнера.
`addCard(card: HTMLElement): void`
Метод добавляет одну карточку товара в контейнер. Используется для динамического добавления новых карточек в блок с товарами.
Параметры:
`card: HTMLElement` — Элемент карточки товара, который нужно добавить в контейнер.
`clear(): void`
Метод очищает контейнер, удаляя все элементы из блока с карточками. Это полезно для очистки содержимого контейнера перед добавлением новых карточек.

# Слой Presenter (коммуникации)

## Класс AppApi
Класс AppApi является обёрткой над базовым API-клиентом и реализует взаимодействие с backend-сервисом. Предназначен для получения данных с сервера (товаров), получения информации о конкретном товаре, а также отправки заказа.

Конструктор:
- `baseApi: IApi` — экземпляр базового API-клиента, реализующего методы get и post.

Методы:
- `getItems(): Promise<ICardsData>`
Запрашивает список всех товаров с сервера.
Возвращает: Promise<ICardsData> — массив карточек товаров и общая информация по ним.

- `getItem(itemId: string): Promise<ICard>`
Запрашивает подробную информацию о конкретном товаре по его id.

Параметры:

- `itemId: string` — идентификатор нужного товара.
Возвращает: `Promise<ICard>` — объект карточки товара.

- `postOrder(data: { ... }): Promise<{ success: boolean }>`
Отправляет заказ на сервер с полными данными пользователя и списка товаров.

## Класс BasketPresenter
Класс BasketPresenter реализует паттерн "презентер" и служит связующим звеном между моделью данных корзины (ItemsData), представлением корзины (Basket) и модальными окнами. Управляет состоянием и отображением корзины в ответ на пользовательские действия и события приложения.

Параметры:

- `basketView` — экземпляр класса Basket, отображающий список товаров в корзине.
- `events` — экземпляр событийного менеджера IEvents, обрабатывающий взаимодействия.
- `itemsData` — экземпляр модели ItemsData, содержащей состояние корзины и список товаров.
- `modalBasket` — экземпляр модального окна корзины.
- `modalCard` — экземпляр модального окна карточки товара.

Методы:
- `subscribeToEvents(): void`
Устанавливает подписки на события:
`'card:add'` — добавляет товар в корзину, если его там нет.
`'card:remove'` — удаляет товар из корзины, если он там есть.

Каждое из этих действий закрывает модальное окно карточки и обновляет интерфейс корзины.

- `updateView(): void`
Обновляет представление корзины, включая:
Рендер списка товаров;
Обновление общей суммы;
Количество товаров в иконке корзины;
Состояние кнопки оформления заказа.

## Класс CardsPresenter
Класс CardsPresenter отвечает за отображение карточек товаров на странице, связывая модель данных (ItemsData), представление карточек (Card) и модальное окно с подробной информацией о товаре (DetailedInformation). При клике на карточку открывается модальное окно с детальной информацией о выбранном товаре.

Параметры:

- `itemsData` — экземпляр ItemsData, содержащий список всех товаров и состояние корзины.
- `template` — HTML-шаблон карточки товара.
- `container` — DOM-элемент, в который будут вставляться карточки товаров.
- `events` — событийный менеджер для взаимодействия с другими частями приложения.
- `modalCard` — модальное окно, открывающееся при клике на карточку.
- `detailedInfo` — компонент, отображающий подробную информацию о товаре.

`basket` — экземпляр корзины, необходимый для проверки состояния товара (добавлен ли он в корзину).
Методы:
`displayItems(): void`
Отрисовывает все карточки из данных itemsData. Для каждой карточки:
Создаёт и рендерит DOM-элемент с данными товара;
Назначает обработчик клика по карточке, который:
Проверяет, находится ли товар в корзине;
Обновляет компонент с детальной информацией;
Открывает модальное окно карточки.

## Класс ContactFormPresenter
Класс ContactFormPresenter управляет отображением и логикой формы обратной связи, предназначенной для сбора контактной информации пользователя при оформлении заказа. Он обрабатывает отправку формы, сохраняет контактные данные, инициирует события и управляет отображением модального окна.

Параметры:
- `form` — экземпляр класса ContactForm, отвечающий за интерфейс и валидацию формы.
- `modal` — модальное окно, в котором находится форма.
- `events` — событийный менеджер (EventEmitter), через который транслируются события после отправки формы.
- `userData` — хранилище пользовательских данных, используется для сохранения введённых контактных данных.

Методы:
- `protected overrideSubmit(): void`
Переопределяет метод handleSubmit формы. После успешной валидации:
Извлекает данные из формы;
Сохраняет email и номер телефона в UserData;

Отправляет события:
`'contact:submit'` с контактными данными;
`'order:success'` для оповещения о завершении оформления;
Закрывает модальное окно.

- `protected formData(): { email: string; phone: string } | null`
Извлекает и валидирует данные из формы. Возвращает объект с контактной информацией, если данные заполнены корректно, иначе — null.
- `open(): void`
Сбрасывает форму и открывает модальное окно для ввода контактной информации.
- `attachOpenHandler(button: HTMLButtonElement, closeModal?: Modal): void`
Добавляет обработчик клика по переданной кнопке. При клике:
При наличии closeModal — закрывает переданное модальное окно;
Открывает модальное окно с формой.

## Класс FormPresenter
Класс FormPresenter управляет отображением и логикой работы формы оформления заказа. Он связывает визуальную форму (Form), модальное окно (Modal) и хранилище пользовательских данных (UserData). Обеспечивает сбор и валидацию данных формы, а также эмит событий для обработки оформления заказа.

Параметры:
- `form` — экземпляр класса Form, содержащий форму для заполнения данных доставки и оплаты.
- `modal` — модальное окно, в котором отображается форма.
- `events` — объект-эмиттер событий для взаимодействия с другими компонентами приложения.
- `orderButton` — кнопка оформления заказа, при нажатии на которую открывается форма.
- `basketModal` — модальное окно корзины, которое закрывается перед открытием формы.
- `userData` — хранилище пользовательской информации (доставка и оплата).

Поля класса:
- `form: Form` — экземпляр формы оформления заказа.
- `modal: Modal` — модальное окно, содержащее форму.
- `events: IEvents` — объект событий, через который отправляются события оформления.
- `userData: UserData` — объект, содержащий пользовательские данные (доставка, оплата и т.д.).

Методы:
- `overrideSubmit(): void`
Переопределяет метод отправки формы. После отправки:
Валидирует данные.
Обновляет данные пользователя (payment, address).
Эмитит событие 'order:submit' с данными заказа.
Закрывает модальное окно.
- `open(): void`
Сброс формы и открытие модального окна с формой.
- `formData(): { paymentMethod: string, address: string } | null`
Возвращает: объект { paymentMethod, address } или null, если данные не заполнены.
- `updateUserData(paymentMethod: string, address: string): void`
Обновляет хранилище UserData вручную, без отправки формы.

## Класс SuccessfullyPresenter
Класс SuccessfullyPresenter управляет отображением модального окна успешного оформления заказа. Он координирует взаимодействие между визуальной частью (модалкой), данными пользователя, содержимым корзины и отправкой заказа на сервер через API.

Параметры:
- `successModalElement` — DOM-элемент модального окна успешного заказа.
- `modal` — экземпляр класса Modal, управляющий открытием/закрытием окна.
- `events` — объект-эмиттер событий.
- `itemsData` — объект, содержащий данные о товарах и корзине (ItemsData).
- `api` — экземпляр класса AppApi, для отправки данных заказа на сервер.
- `userData` — объект, содержащий информацию о пользователе.
- `basket: Basket` — Экземпляр корзины, необходимый для очистки корзины.

Поля класса:
- `view: Successfully` — представление модального окна об успешной покупке.
- `modal: Modal` — модалка, отображающая подтверждение заказа.
- `events: IEvents` — система событий.
- `itemsData: ItemsData` — данные корзины и товаров.
- `closeButton: HTMLButtonElement` — кнопка закрытия окна.
- `api: AppApi` — API-клиент для отправки заказа.
- `userData: UserData` — объект с пользовательскими данными.

Методы
- `bindPayButton(button: HTMLButtonElement, contactModal: Modal): void`
Привязывает обработчик к кнопке оплаты. При нажатии закрывает контактную форму.
- `protected handleOrderSuccess(): void`
Обработчик события 'order:success':
Получает итоговую сумму и данные пользователя.
Формирует и отправляет заказ на сервер через api.postOrder().
Обновляет UI с информацией о заказе.
Очищает корзину.
Открывает модальное окно успешного заказа.
- `protected handleClose(): void`
Закрывает модальное окно успешного заказа при нажатии кнопки закрытия.

## Взаимодействие компонентов
`index.ts`\
Этот файл служит точкой входа для фронтенд-приложения интернет-магазина. В нём происходит подключение и инициализация всех ключевых компонентов: API, моделей, презентеров, форм, модальных окон и отображения карточек товаров.
### Импорты
Подключаются:
Классы компонентов `(например, Basket, Form, Modal)`
Интерфейсы и типы `(IApi)`
Утилиты `(events, API_URL, settings)`
Основные стили `(styles.scss)`
### Инициализация API
```
const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi);
```
Создается экземпляр `Api`, обернутый в `AppApi`, предоставляющий абстракцию над вызовами к бэкенду.
### DOM-элементы
Получаются ссылки на ключевые HTML-элементы страницы: шаблоны карточек, контейнеры, формы, кнопки, модалки и т.д.
### Модальные окна
Создаются и настраиваются модальные окна:
`basketModal` — модалка корзины
`modalCard` — модалка подробной информации о товаре
`orderModal` — модалка оформления заказа
`contactModal` — контактная форма
`successfullyModal` — сообщение об успешной покупке
### Модели
```
const itemsData = new ItemsData(events);
const userData = new UserData(events);
```
`ItemsData` — хранит список всех товаров и товаров в корзине.
`UserData` — содержит данные, введенные пользователем (контакты, адрес, метод оплаты).
### Презентеры
Презентеры координируют взаимодействие между моделями, представлениями и событиями:
`BasketPresenter` — отображение и логика корзины.
`CardsPresenter` — отображение карточек товаров.
`FormPresenter` — логика и валидация формы заказа.
`ContactFormPresenter` — логика контактной формы.
`SuccessfullyPresenter` — логика окна успешного заказа и отправка данных на сервер.
### Получение и отображение данных
```
api.getItems().then((data) => {
  itemsData.items = data.items;
  cardsPresenter.displayItems();
});
```
После загрузки товаров с сервера, они сохраняются в модель и отображаются через `CardsPresenter`.
### Оплата и завершение заказа
```
successfullyPresenter.bindPayButton(payButton, contactModal);
```
При нажатии на кнопку оплаты:
Закрывается контактная форма.
Срабатывает событие `order:success`, запускающее отправку заказа и показ модального окна об успехе.
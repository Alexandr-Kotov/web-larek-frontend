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
export interface IItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number;
};
```

Данные пользователя.

```
export interface IUser {
  telephone: number;
  mail: string;
  address: string;
  payment: string;
};
```

Интерфейс для модели данных карточек.

```
export interface IItemsData {
  items: IItem[];
  preview: string | null;
  addItem(itemId: string): IItem;
  deleteItem(itemId: string): void;
  getItem(itemId: string): IItem;
};
```

Интерфейс для модели данных форм.

```
export interface IUserData {
  setUserInfo(data: TUserInfo): void;
  setUserDelivery(data: TUserDelivery): void;
  checkUserValidation(data: Record<keyof IUser, string | number>): boolean;
}
```

Данные карточек используемые в форме корзины 

```
export type TItemList = Pick<IItem, 'title' | 'price'>;
```

Данные пользоваетеля при форомление формы способа оплаты и адреса

```
export type TUserDelivery = Pick<IUser, 'address' | 'payment'>;
```

Данные пользоваетеля при форомление формы номера телефона и почты

```
export type TUserInfo = Pick<IUser, 'telephone' | 'mail'>;
```

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP: 
- слой Model предоставляет данные для пользовательского интерфейса. 
- слой View реализует отображение данных (Модели) и маршрутизацию пользовательских команд или событий Presenterʼу.
- слой Presenter управляет Model и View. Например извлекает данные из Model и форматирует их для отображения в View.

### Базовый код

#### Класс Api
Содержит в себе базовую логику отправки запросов. В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.
Методы: 
- `get` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер
- `post` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.

#### Класс EventEmitter
Брокер событий позволяет отправлять события и подписываться на события, происходящие в системе. Класс используется в презентере для обработки событий и в слоях приложения для генерации событий.  
Основные методы, реализуемые классом описаны интерфейсом `IEvents`:
- `on` - подписка на событие
- `emit` - инициализация события
- `trigger` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие   

### Слой Model (данных)

#### Класс ItemsData

Класс отвечает за хранение и логику работы с данными карточек.\
Конструктор класса принимает инстант брокера событий.\
В полях класса хранятся следующие данные:
- `_items: IItem[]` - массив объектов карточек.
- `_preview: string | null` - id карточки, выбранной для просмотра в модальном окне.
- `events: IEvents` - экземпляр класса `EventEmitter` для инициации событий при изменении данных.

Так же класс предоставляет набор методов для взаимодействия с этими данными.
- `addItem(itemId: string): IItem` - добавляет одну карточку в начало массива корзины.
- `deleteItem(itemId: string): void` - удаляет карточку из масива корзины.
- `getItem(itemId: string): IItem` - возвращает карточку по ее id.
- а так-же геттер для получения данных из полей класса.

#### Класс UserData

Класс отвечает за хранение и логику работы с данными текущего пользователя.\
Конструктор класса принимает инстант брокера событий\
В полях класса хранятся следующие данные:
- `telephone: number` - номер телефона.
- `mail: string` - имя почты.
- `address: string` - адрес пользователя.
- `payment: string` - способ оплаты.
- `events: IEvents` - экземпляр класса `EventEmitter` для инициации событий при изменении данных.

Так же класс предоставляет набор методов для взаимодействия с этими данными.
- `setUserInfo(data: TUserInfo): void` - сохраняет данные пользователя в форме информации о пользователе.
- `setUserDelivery(data: TUserDelivery): void` - сохраняет данные пользователя в форме о способе доставки.
- `setTelephone(telephone: number): void` - проверка на пустые значения для номера телефона.
- `setMail(mail: string): void` - проверка на пустые значения для электронной почты.
- `setAddress(address: string): void` - проверка на пустые значения для адреса.
- `setPayment(payment: string): void` - проверка на пустые значения для способа оплаты.

### Слой View (представления)

#### Класс Modal
Реализует модальное окно. Устанавливает слушатели на клавиатуру, для закрытия модального окна по Esc, на клик в оверлей и кнопку-крестик для закрытия попапа.  
Поля класса:
- `modal: HTMLElement` - элемент модального окна.
- `events: IEvents` - брокер событий.

 `constructor(selector: string, events: IEvents)` Конструктор принимает селектор, по которому в разметке страницы будет идентифицировано модальное окно и экземпляр класса `EventEmitter` для возможности инициации событий.

Методы:
- `open(): void` - реализации модального окна открытие.
- `close(): void` - реализации модального окна закрытие.
- `closePopupEsc(): void` - реализации модального окна закрытие на клавишу 'Escape'.
- `setClosePopupEventListeners(): void` - реализации модального окна закрытие оверлей.

#### Класс DetailedInformation
Предназначен для реализации модального окна с детальной информации о товаре. При открытии модального окна получает данные карточки, которое нужно показать.\
Поля класса:
- `_description: HTMLFormElement` - элемент разметки об описание товара.
- `_image: HTMLImageElement` - элемент разметки изображения.
- `_title: HTMLFormElement` - элемент разметки с названием.
- `_category: HTMLFormElement` - элемент разметки категории.
- `_price: HTMLFormElement` -элемент разметки цена товара.
- `submitButton: HTMLButtonElement` - Кнопка добавить в корзину.

#### Класс Form
Предназначен для реализации модального окна с формой содержащей поля ввода о способе оплаты и адреса пользователя. При сабмите сохраняет данные.Предоставляет методы для отображения ошибок и управления активностью кнопки далее.\
Поля класса:
- `submitButton: HTMLButtonElement` - Кнопка подтверждения
- `_form: HTMLFormElement` - элемент формы
- `formName: string` - значение атрибута name формы
- `inputs: NodeListOf<HTMLInputElement>` - коллекция всех полей ввода формы

Методы:
- `setValid(isValid: boolean): void` - изменяет активность кнопки подтверждения
- `setInputValues(data: Record<string, string>): void` - принимает объект с данными для заполнения полей формы
- `get form: HTMLElement` - геттер для получения элемента формы

### Класс Basket
Предназначен для реализации модального окна со списком содержащем о товаров готовых к оформление покупки.\
Поля класса:
- `_title: HTMLFormElement` - элемент разметки с названием.
- `_price: HTMLFormElement` -элемент разметки цена товара.
- `submitButton: HTMLButtonElement` - Кнопка подтверждения.

Методы:
- `summationPrice(data: number): number` - метод для суммирование всех товаров в списке корзины.

### Класс Successfully
Предназначен для реализации модального окна о успешной покупки.\
Поля класса:
- `submitButton: HTMLButtonElement` - Кнопка подтверждения.

#### Класс Card
Отвечает за отображение карточки, задавая в карточке данные категория, названия, изображения, цена. Класс используется для отображения карточек на странице сайта. В конструктор класса передается DOM элемент темплейта, что позволяет при необходимости формировать карточки разных вариантов верстки. В классе устанавливаются слушатели на все интерактивные элементы, в результате взаимодействия с которыми пользователя генерируются соответствующие события.\
Поля класса содержат элементы разметки элементов карточки. Конструктор, кроме темплейта принимает экземпляр `EventEmitter` для инициации событий.\
Методы:
- `setData(itemData: IItem): void` - заполняет атрибуты элементов карточки данными
- `render(): HTMLElement` - метод возвращает полностью заполненную карточку с установленными слушателями
- `геттер id` возвращает уникальный id карточки

#### Класс CardsContainer
Отвечает за отображение блока с карточками на главной странице. В конструктор принимает контейнер, в котором размещаются карточки.

### Слой Presenter (коммуникации)

#### Класс AppApi
Принимает в конструктор экземпляр класса Api и предоставляет методы реализующие взаимодействие с бэкендом сервиса.

## Взаимодействие компонентов
Код, описывающий взаимодействие представления и данных между собой находится в файле `index.ts`, выполняющем роль презентера.\
Взаимодействие осуществляется за счет событий генерируемых с помощью брокера событий и обработчиков этих событий, описанных в `index.ts`\
В `index.ts` сначала создаются экземпляры всех необходимых классов, а затем настраивается обработка событий.

*Список всех событий, которые могут генерироваться в системе:*\
*События изменения данных (генерируются классами моделями данных)*
- `card:selected` - изменение открываемой в модальном окне картинки карточки

*События, возникающие при взаимодействии пользователя с интерфейсом (генерируются классами, отвечающими за представление)*
- `userInfo:open` - открытие модального окна с формой выбора оплаты и указание доставки.
- `userDelivery:open` - открытие модального окна с формой данных  номера телефона и почты о пользователе.
- `card:select` - выбор товара для отображения в модальном окне.
- `card:add` - добавление карточки в список корзины.
- `card:delete` - удаление карточки из списка корзины.
- `order:submit` - сохранение адреса пользователя в модальном окне.
- `contacts:submit` - сохранение номера телефона и почты пользователя в модальном окне.
- `order:validation` - событие, сообщающее о необходимости валидации формы адреса и выбора способа оплаты.
- `contacts:validation` - событие, сообщающее о необходимости валидации формы  номера телефона и почты пользователя.
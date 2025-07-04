# ✅ ToDo Angular

Простое приложение для управления задачами, построенное на Angular 15 с использованием IndexedDB для хранения данных.

## 🔨 Технологии

- **Angular 15**  
- **TypeScript**  
- **RxJS**  
- **IndexedDB**  

## 🧰 Основные возможности

- ✅ Создание, редактирование и удаление задач
- ✅ Изменение статуса задач (Выполнено/Не выполнено) 
- ✅ Поиск по задачам 
- 📁 Локальное хранение данных (не требует сервера)

## ⚙️ Особенности архитектуры

- Reactive Forms
- Router Module
- Модульная структура
- Lazy Loading 


## 🖼️ Скриншоты

_Скриншоты интерфейса:_

<!-- Пример: -->
![Главная страница](https://github.com/BazhenovDev/ToDo-Angular/blob/main/src/assets/images/github-img/main1.png)
![Главная страница 2](https://github.com/BazhenovDev/ToDo-Angular/blob/main/src/assets/images/github-img/main2.png)
![Страница создания задачи](https://github.com/BazhenovDev/ToDo-Angular/blob/main/src/assets/images/github-img/create.png)
![Страница редактирования задачи](https://github.com/BazhenovDev/ToDo-Angular/blob/main/src/assets/images/github-img/edit.png)
![Страница информации о задаче](https://github.com/BazhenovDev/ToDo-Angular/blob/main/src/assets/images/github-img/about.png)

## 🚀 Быстрый старт

```bash
# 1. Клонировать репозиторий
git clone https://github.com/bazhenovdev/todo-angular.git
cd todo-angular

# 2. Установить зависимости
npm install

# 3. Запустить проект
ng serve -o

# 4. Приложение будет доступно по адресу:
http://localhost:4200/tasks
```

## 📁 Структура проекта

```text
src/
├── app/
│   ├── shared/                  # Общие модули и сервисы
│   │   ├── components/          # Переиспользуемые компоненты
│   │   ├── constants/           # Константы приложения
│   │   ├── layout/              # Layout страницы
│   │   ├── services/            # Общие сервисы
│   │   └── shared.module.ts     # Модуль общих компонентов
│   │
│   └── views/                   # Основные view-компоненты
│      ├── main/                 # Главная страница (/tasks)
│      └── pages/                # Страницы pages модуля
│          ├── create/           # Страница создания
│          ├── edit/             # Страница редактирования
│          └── viewing/          # Страница просмотра
│   
│
├── assets/                      # Статические файлы
│   ├── fonts/                   # Шрифты
│   ├── images/                  # Изображения
│   └── styles/                  # Стили
│
├── ...                          # Остальные корневые файлы
```



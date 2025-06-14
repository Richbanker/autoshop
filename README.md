# Автосалон — Next.js/React/TypeScript

## Описание

Веб-приложение автосалона с современным интерфейсом: карточки автомобилей, сортировка, пагинация, адаптивная верстка, интеграция с внешним API. Все состояния синхронизируются с URL. UI выполнен на Tailwind CSS, поддерживается мобильная версия.

## Стек технологий
- **Next.js** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS**

## Возможности
- Просмотр автомобилей в виде карточек
- Сортировка по цене (по возрастанию/убыванию)
- Пагинация (синхронизирована с URL)
- Современный адаптивный дизайн
- Кнопки "Купить", "Избранное", "Сравнить"
- Прокси-роут для работы с внешним API

## Запуск проекта

1. **Установите зависимости:**
   ```bash
   npm install
   # или
   yarn install
   ```

2. **Запустите локальный сервер разработки:**
   ```bash
   npm run dev
   # или
   yarn dev
   ```

3. Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Структура проекта
- `src/components/` — основные компоненты (CarList, Sort, Pagination)
- `src/app/api/cars/route.ts` — проксирующий API-роут
- `src/app/page.tsx` — главная страница
- `next.config.js` — настройка домена для изображений

## Примечания
- Для корректной работы изображений внешний домен добавлен в `next.config.js`.
- Все состояния (сортировка, страница) синхронизируются с query-параметрами URL.
- UI полностью адаптивен и оптимизирован для мобильных устройств.

---

**Автор:** [richbanker]

# Sunday Club 🏛️

Книжный клуб в стиле **Dark Academia**. Платформа для управления встречами, регистрациями и контентом сайта.

## 🛠 Технологии
- **Next.js 15** (App Router, Server Actions)
- **Tailwind CSS v4** (Modern aesthetic)
- **Google Sheets API** (Serverless Database)
- **Lucide React** (Icons)

## 🚀 Быстрый старт

### 1. Клонирование репозитория
```bash
git clone https://github.com/zhumabekmadi4-coder/Sunday-club.git
cd sunday-club
```

### 2. Установка зависимостей
```bash
npm install
```

### 3. Настройка переменных окружения
Создайте файл `.env.local` в корне проекта и заполните его данными из вашего Google Cloud Console (Service Account):
```env
GOOGLE_CLIENT_EMAIL="your-service-account@project.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID="your-google-sheet-id"
```

### 4. Запуск в режиме разработки
```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## 📁 Структура проекта
- `src/app/` — Роутинг и основные страницы (Next.js App Router).
- `src/app/admin/` — Панель управления (CMS).
- `src/app/register/` — Форма регистрации с интеграцией Google Sheets.
- `src/lib/googleSheets.ts` — Хелпер для работы с базой данных Google Таблиц.

## 🎨 Дизайн
Проект выполнен в эстетике **Dark Academia**:
- Цвета: Глубокий зеленый, бордовый, античное золото.
- Шрифты: `Cormorant Garamond` для атмосферных заголовков.

---
*Sunday Club — Место, где смыслы важнее слов.*

# CampusCourses

## Сайт для работы с кампусными курсами

## Сервис включает в себя следующие функции:

Для всех пользователей:
- Авторизация и регистрация пользователей
- Редактирование профиля
- Просмотр списка групп
- Возможность посмотреть список курсов в группе
- Возможность посмотреть подробную информацию о курсе

  В системе предусмотрена иерархия ролей (Администратор <- Главный преподаватель <- преподаватель <- студент <- обычный пользователь). Каждая следующая роль имеет функционал предыдущей.
  При этом, роли "Главный преподаватель", "Преподаватель", "Студент" существуют только в рамках конкретного курса, а не всей системы (на разных курсах у одного и того же пользователя разные роли)

Для администратора: 
- Создание, удаление, редактирование групп 
- Создание, удаление, редактирование курсов
Для главного преподавателя:
- Редактирование курса (только описание и требования)
Для преподавателя
- Редактирование, просмотр оценок студентов
- Создание уведомлений
- Одобрение или отклонения заявок на встувление на курс
Для студента
- Подача заявки на курс (если курс открыт для записи)
- Просмотр только своих оценок

## Стэк технологий:

- Npm
- Vite
- Typescript
- React
- React-Router-Dom
- Redux-Toolkit
- Formik
- Axios
- MUI
- Eslint



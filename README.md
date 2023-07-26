## توضیحات پروژه

این پروژه، یک پروژه تمرینی برای یادگیری فریم ورک [NestJs](nestjs.com) است و هدف از ساخت این پروژه، ساخت یک API برای یک بلاگ بود.

تقریبا تمام ویژگی هایی که از یک بلاگ ساده انتظار میرود در این پروژه پیاده سازی شده است و همچنین تا جایی که ممکن بود سعی شده نکات امنیتی مربوط به بک‌اند در این پروژه رعایت شود.

## [Documentation](https://64c100e52dd7a65c3baac365--startling-cajeta-e7e08d.netlify.app/)

## ✨ ویژگی ها

- سیستم Authentication و Authorizatoin

- دریافت اطلاعات مقاله ها همراه با دسته بندی های مربوطه و اطلاعات نویسنده آن

- داشتن سیسستم RBAC برای کنترل بیشتر بر نقش ها و دسترسی های مختلف

- رعایت کردن best practice ها و داشتن کدی بهینه

## ⚒️ ساخته شده با:

- [NestJs](nestjs.com) - یک چارچوب پیشرو Node.js برای ساخت برنامه‌های کاربردی، قابل اعتماد و مقیاس‌پذیر.

- [Prisma](https://www.prisma.io/) - Prisma سطح جدیدی از تجربه توسعه دهندگان را هنگام کار با پایگاه داده فراهم میکند

- [AccessControl](https://github.com/onury/accesscontrol) - کنترل دسترسی مبتنی بر نقش و ویژگی برای Node.js

- [Typescript](https://www.typescriptlang.org/) - TypeScript یک زبان برنامه نویسی استاتیک تایپ است که بر اساس جاوا اسکریپت ساخته شده است

## 💽 نحوه اجرای پروژه

### # مرحله ۱:

ابتدا باید یک فایل به نام `.env` در روت پروژه ساخته شود و پس از آن، متغیر هایی که در فایل ‍‍‍`.env.example` مشخص شده است را با مقادیر مناسب پر کنید

یک مثال واقعی از مقدار هایی که میتوان در فایل ‍‍‍‍`.env` وجود داشته باشد در زیر آمده است:

```
MYSQL_ROOT_PASSWORD = test

POSTGRES_USER = root

POSTGRES_PASSWORD = test

DATABASE_URL = mysql://root:test@localhost:3307/nest-blog?connect_timeout=300


ADMIN_USERNAME = admin

ADMIN_EMAIL = example@example.com

ADMIN_PASSWORD = 123456
```

> نکته: این مقادیر فقط برای تست هستند و شما میتوانید این مقادیر را به دلخواه خودتان تغییر دهید

### # مرحله ۲:

#### راه اندازی پروژه به دو حالت مختلف تقسیم میشود

۱- حالت توسعه
۲- حالت پروداکشن

**برای حالت توسعه نیاز است که بخش api از فایل `docker-compose.yml` همانگونه که در زیر مشخص شده است کامنت شود.
اما برای حالت پروداکشن نیازی به کامنت کردن این بخش نیست**‍‍‍‍‍‍

```
services:
    # api:
    #   build:
    #      dockerfile: Dockerfile
    #      context:
    #   depends_on:
    #      - mysql
    #   environment:
    #      DATABASE_URL: ${DATABASE_URL}
    #      NODE_ENV: development
    #      PORT: 3000
    #   ports:
    #      - "5000:3000"
```

### # مرحله ۳:

حال میتوانیم با اجرا کردن دستور `docker-compose up` در ترمینال خود در حالی که در روت پروژه خود قرار داریم پروژه را ران کنیم.

### # مرحله ۴:

اگر حالت پروداکشن را انتخاب نمودید و بخش api را از فایل `docker-compose.yml` کامنت نکردید ، میتوانید این مرحله را نادیده بگیرید.
در غیر این صورت نیاز است که ترمینال دیگری در روت پروژه خود باز کنید و دستور `yarn start:dev` را اجرا کنید.

## با من در ارتباط باشید

- Author - [Mohammad Rezaei](https://github.com/mohammadrz003)

- Website - [Moonfo.com](https://moonfo.com/)

- Twitter - [@mmdrz003](https://twitter.com/mmdrz003)

## لایسنس

[MIT license](LICENSE)

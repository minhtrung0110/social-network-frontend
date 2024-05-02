# SnapGram - Social Media Platform

SnapGram is a social media platform inspired by Instagram, allowing users to share moments and connect with friends in
real-time. The platform is built using NestJs, Socket.io, Redis, JWT Authentication, Prisma, Pactum, and Docker.

## Overview

- [Introduction](#introduction)
- [Authentication](#authentication)

- [Getting Started](#getting-started)
- [Contribution](#contribution)
- [License](#license)

## Introduction

SnapGram provides users with a seamless and engaging experience for sharing visual content. The use of real-time
communication and modern technologies enhances user interactions.

## Authentication

    Trong dự án này chúng tôi sử dụng 2 phương án để Auth
        1. Authorization Beaber Token
        2. Cookies

### Authorization Beaber Token

### Cookies

- Quy ước: Trong dự án này Cookie được set HttpOnly do đó ko truy cập bằng JS.

- Ưu điềm: Khi set-cookie mỗi khi request ta ko cần truyền vào header Authoriztion Beaber token vì cookie được lưu trên
  browser.

- Nhược điểm: Chỉ nhận cookie của từ các request của các domain giống nhau nếu muốn nhận từ 1 domain khác phải cấu hình
  CORS. VD : Khi ta đăng nhập google tự động đăng nhập các youtube... là vì họ sử dụng token
- Lưu ý :

````angular2html
- Ta chỉ lấy được value cookie khi ở server component. Nếu muốn lấy cookie ở client component thì cookie phải
lưu ở localstorage,...
- Khi ta dùng cookie từ next/cookie là hệ thống sẽ chuyển sang Dynamic Rendering.
<a href='https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-rendering'
   target='_blank'>Next.js Dynamic Rendering</a>
-

````

Backend : Cấu hình CORS để nhận Cookie từ domain của Frontend.

````
    app.enableCors({
    credentials: true,
    origin: process.env.FRONTEND_URL || 'http://localhost:3000/',
    });
````

## Getting Started

1. **Clone the Repository:**

```bash
   git clone https://github.com/minhtrung0110/social-network-backend
````

2. **Install Dependencies:**

````
yarn install
````

3. **Configure Environment:**

- Copy the .env.example file to .env and update the variables accordingly.

4. **Run the Application:**

````
            yarn dev
 ````

## Usage

Visit http://localhost:3000 in your browser.
Sign up or log in with existing credentials.
Explore features, upload media, and connect with friends.

## Contribution

- Contributions are welcome! Please follow our Contribution Guidelines.

## License

- This project is licensed under the MIT License.
# MEAN To do App

Simple to do app build from scratch using MEAN stack.

## MEAN stack:

- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [Angular](https://angular.io/)
- [Node.js](https://nodejs.org/en/)

## Syles:

- [Bootstrap](https://getbootstrap.com/)

## Scripts

These scripts are for backend server so use this in root of this mean-todo-app folder.

- `npm run dev`
  - starts backend server in development mode.
- `npm run build`
  - builds backend server
- `npm run build:client`
  - builds client side
- `npm run build:all`
  - builds server and client side
- `npm start`
  - starts server on production mode. **after build!**

## Installation:

Start by installing [Angular CLI](https://angular.io/cli) if you dont already have it.

```sh
npm install -g @angular/cli
```

1. Clone this repository:

```sh
git clone https://github.com/Muugmaster/LUT-fullstack-2021.git
```

2. Go to mean-todo-app folder

```sh
cd project/mean-todo-app
```

3. Rename `.env.example` to `.env` and fill your enviromental variables:

```sh
PORT=<Port number where you wanna run this server>
MONGODB_URL=<Connection string to your mangodb server>
SECRET=<whatever random string>
```

4. Install dependecies for backend and frontend

```sh
npm install
cd client
npm install
```

5. In root of project run build script to create **production** build

```sh
npm run build:all
```

6. Start production build:

```sh
npm start
```

7. Go to `http://localhost:5000`

## OR

5. Start development build. Server and client side separetly:

```sh
npm run dev
cd client
ng serve --open
```

6. Backend API starts at: `http://localhost:5000` and client side angular app at: `http://localhost:4200`

## Run in Docker

If you have docker installed on your machine you can easily run this project:

1. Clone this repository:

```sh
git clone https://github.com/Muugmaster/LUT-fullstack-2021.git
```

2. Go to mean-todo-app folder

```sh
cd project/mean-todo-app
```

3. Rename `.env.example` to `.env` and fill your enviromental variables:

```sh
PORT=<Port number where you wanna run this server>
MONGODB_URL=<Connection string to your mangodb server>
SECRET=<whatever random string>
```

4. Build docker image:

```sh
docker build . -t mean-todo-app
```

5. Run docker image on port 5000:

```sh
docker run -p 5000:5000 mean-todo-app
```

6. Go to `http://localhost:5000`

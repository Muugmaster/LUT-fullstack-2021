# MEAN To do App

Simple to do app build from scratch using MEAN stack.

## MEAN stack:

- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [Angular](https://angular.io/)
- [Node.js](https://nodejs.org/en/)

## Installation:

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

5. In root of project run build script to run prod build

```sh
npm run build:all
```

6. Go to `http://localhost:5000`

### Run in Docker

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

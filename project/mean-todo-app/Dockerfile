FROM node as prod

WORKDIR /app

COPY package*.json ./

RUN npm install && npm install -g typescript

COPY . .

RUN npm run build

WORKDIR /app/client

COPY ./client/package*.json ./

RUN npm install && npm install -g @angular/cli && ng build --prod

WORKDIR /app

COPY . .

RUN useradd -m myuser

USER myuser

CMD [ "node", "dist/index.js" ]
FROM node:20.11.0

RUN apt-get update

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

CMD npm run prod
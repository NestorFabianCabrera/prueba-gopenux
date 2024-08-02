FROM node:14

WORKDIR /./my-app/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

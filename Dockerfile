FROM node:10.15.2

WORKDIR /user/src/app

COPY package*.json ./

run npm install

COPY . .

EXPOSE 3333

CMD ["npm", "start"]
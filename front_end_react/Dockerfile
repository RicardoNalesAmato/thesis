FROM node:8.4

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm install yarn

RUN yarn

RUN yarn build

WORKDIR /usr/src/app/dist

EXPOSE 9090

CMD [ "node", "server.js" ]
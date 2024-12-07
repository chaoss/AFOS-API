FROM node:18

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "src/server.js"]
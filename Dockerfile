FROM node:boron

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

EXPOSE 3001
EXPOSE 3002

ENV NODE_ENV=production

CMD [ "npm", "start" ]
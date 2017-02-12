FROM node:latest

# Setup Yarn package manager
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN npm install -g yarn

WORKDIR /var/www

COPY package.json yarn.lock /var/www/

RUN yarn # Install all dependencies

COPY . /var/www

EXPOSE 3001
EXPOSE 3002

CMD ["npm", "start"]
FROM node:14

WORKDIR /off/
COPY ./package.json /off/
COPY . /yarn.lock /off/
RUN yarn install

COPY . /off/
CMD yarn start:dev

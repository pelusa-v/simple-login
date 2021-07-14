FROM node:10-alpine

RUN mkdir /app
WORKDIR /app
COPY auth-web/package.json /app
RUN npm install
COPY ./auth-web/ /app

CMD ["npm", "start"]
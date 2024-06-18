FROM node:18-alpine

WORKDIR /sehha-front/

COPY package.json /sehha-front/

RUN npm install

COPY public/ /sehha-front/public

COPY src/ /sehha-front/src

CMD ["npm", "start"]
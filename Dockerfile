FROM mongo:4.4
ONBUILD ADD --network host

FROM node:14.15.5
ONBUILD ADD --network host

WORKDIR home/X-meme

COPY . /

WORKDIR /backend

RUN npm install

ENV db=mongodb://localhost:27017/xmemeDB

ENV PORT=8081

CMD ["npm", "start"]
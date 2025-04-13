FROM node:20-alpine

WORKDIR /opt

COPY . .
RUN npm install

RUN npm run build

USER node

CMD ["node", "build/main.js"]

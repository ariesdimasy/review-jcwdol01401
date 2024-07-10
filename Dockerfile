FROM node:20

WORKDIR /src
COPY package.json .
RUN npm install
COPY . .
EXPOSE 2000
VOLUME ['/app/node_modules']
CMD ["npm","run","dev"]
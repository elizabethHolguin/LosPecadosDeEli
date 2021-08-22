FROM node:12.22.5-alpine3.14
ENV NODE_ENV=producton
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install -g @angular/cli && npm i
COPY . .
CMD [ "ng", "serve" ]

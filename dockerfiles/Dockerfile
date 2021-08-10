FROM node:12-alpine AS build
WORKDIR /app
RUN apk add --no-cache git

COPY ./package.json /app/
COPY ./yarn.lock /app/
COPY ./start.sh /app/
RUN yarn install
COPY ./env /app/env/
COPY ./nuxt /app/nuxt/
COPY ./src /app/src/

FROM node:12-alpine
WORKDIR /app
COPY --from=build /app /app/
RUN chmod +x /app/start.sh
CMD ./start.sh

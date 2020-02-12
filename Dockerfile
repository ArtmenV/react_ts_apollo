#build stage for a Node.js application
FROM node:alpine as build-stage
WORKDIR /app
#RUN apk add --update py-pip && pip install -U pip && pip install transifex-client
# optimise layer caching:
COPY package*.json ./ 
COPY yarn.lock ./ 
RUN yarn
COPY . .
RUN yarn extract
RUN yarn compile
RUN yarn build --prod

#production stage
FROM abiosoft/caddy:no-stats as production-stage
COPY --from=build-stage /app/build /frontend
EXPOSE 80
EXPOSE 443


### BUILDING STAGE ###
FROM node:16.15.1-alpine3.16 as script
WORKDIR /usr/src/app
COPY package.json  ./
COPY yarn.lock  ./
RUN yarn install --prod
COPY . .
CMD [ "yarn", "start" ]

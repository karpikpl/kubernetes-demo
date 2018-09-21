FROM node:8

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app

#RUN npm i yarn -g
RUN yarn

EXPOSE 8000
CMD [ "node", "index.js" ]

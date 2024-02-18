FROM node:lts

WORKDIR /app

COPY src/ /app

# Install the dependencies
RUN npm install

RUN npm install -g nodemon


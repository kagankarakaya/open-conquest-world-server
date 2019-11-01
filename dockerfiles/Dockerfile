FROM node:alpine
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
EXPOSE 1337
COPY . .
CMD ["npm", "run", "start"]
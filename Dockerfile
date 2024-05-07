FROM node:20.11.1 

WORKDIR /app

COPY ./ ./  

RUN npm install

CMD ["npm", "start"]


FROM node:14

WORKDIR C:\Users\ASUS\Desktop\CODE\POW_backend_node

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 3000
CMD ["node", "app.js"]
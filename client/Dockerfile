FROM node:16-alpine3.12
 
# Add the following line 
ENV CI=true
 
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./
 
CMD ["npm", "start"]
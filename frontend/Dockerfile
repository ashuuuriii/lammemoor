FROM node:16.14.0

WORKDIR /app/frontend/
COPY package.json package-lock.json ./
RUN npm install npm@8.19.0
RUN npm install

COPY . .
CMD ["npm", "run", "start"]
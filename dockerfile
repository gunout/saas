# Backend
FROM node:16-alpine as backend
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["node", "dist/server.js"]

# Frontend Web
FROM node:16-alpine as frontend-web
WORKDIR /app
COPY web/package*.json ./web/
RUN npm ci --prefix web
COPY web ./web
RUN npm run build --prefix web
EXPOSE 3000
CMD ["npm", "start", "--prefix", "web"]
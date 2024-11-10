FROM node:16
WORKDIR /app
COPY package.json ./
RUN npm install
COPY src/ src/
CMD ["node", "src/index.js"]
EXPOSE 3001

FROM node:20 as build

RUN apt-get update && \
    apt-get install -y python3 g++ make && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-slim

WORKDIR /app
COPY --from=build /app /app

EXPOSE 3000

CMD ["npm", "start"]

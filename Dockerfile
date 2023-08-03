FROM node:16 AS builder

RUN mkdir /app

WORKDIR /app

COPY . .

RUN npm install && npm run build

FROM node:17-bullseye-slim

RUN mkdir /app
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

EXPOSE 3000

CMD ["node", "./dist/server.js"]

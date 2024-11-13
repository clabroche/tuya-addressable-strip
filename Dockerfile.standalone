FROM alpine:3.20.3 AS builder
RUN apk --no-cache add gcc g++ make python3 nodejs npm yarn

WORKDIR /app
COPY yarn.lock ./yarn.lock
COPY .yarn .yarn
COPY .yarnrc.yml .yarnrc.yml
COPY package.json ./package.json
RUN yarn install
COPY . .

FROM alpine:3.20.3
RUN apk --no-cache add nodejs
WORKDIR /app
RUN mkdir /app/dist
COPY --from=builder /app .

CMD ["node", "src/index.js"]
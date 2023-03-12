#베이스 이미지
FROM node:17.4.0

WORKDIR /app

COPY package.json .

    RUN yarn set version berry

COPY yarn.lock .yarn .yarnrc.yml ./


RUN yarn install 

COPY . .


EXPOSE 3000


#커맨드 실행
CMD ["yarn", "start"]
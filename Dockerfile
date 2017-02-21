FROM node:6.9.2

MAINTAINER Hoang Vu
ENV LOGGER_DIRECTORY = /usr/src/logs

# Tạo thư mục chứa source code
RUN mkdir -p /usr/src/app

# Tạo thư mục chứa file log
RUN mkdir -p /usr/src/logs

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install --only=production

EXPOSE 8081

CMD ["npm", "start"]
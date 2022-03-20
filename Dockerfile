FROM mcr.microsoft.com/playwright:focal
ADD . /app
VOLUME /app/environments
WORKDIR /app
RUN npm install --production --registry=https://registry.npm.taobao.org
EXPOSE 3000
CMD [ "node", "." ]

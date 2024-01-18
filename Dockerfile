FROM mcr.microsoft.com/playwright:focal
ADD . /app
VOLUME /app/environments
WORKDIR /app
RUN npm install --production
EXPOSE 3000
CMD [ "node", "." ]

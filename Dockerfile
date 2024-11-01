FROM mcr.microsoft.com/playwright:v1.46.1-focal
ADD . /app
VOLUME /app/environments
WORKDIR /app
RUN npm install --production
EXPOSE 3000
CMD [ "node", "." ]

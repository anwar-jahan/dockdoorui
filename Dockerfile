FROM node:9-alpine
EXPOSE 8080
COPY . /code

RUN cd /code \
    && mkdir /app \
    && mv /code/*.json /app \
    && mv /code/Dockerfile /app \
    && rm -rf /code
WORKDIR /app
CMD npm start

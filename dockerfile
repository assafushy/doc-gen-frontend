# build environment
FROM node:slim
WORKDIR /app
COPY package.json /app/package.json

RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
COPY . /app
ENTRYPOINT ["/bin/bash","./src/deployment/env-uri-init.sh"]
# CMD ["npm", "start"]

FROM node:5-wheezy

WORKDIR /opt

RUN npm install sentiment express@4 morgan@1 body-parser@1

COPY server.js /opt/
CMD ["node", "/opt/server.js"]

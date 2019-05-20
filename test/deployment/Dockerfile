# Must be ran with -f from the project root

FROM       node:12.0.0-slim
WORKDIR    /sentiment
COPY       . .
RUN        npm ci
RUN        npm run build
WORKDIR    /sentiment/test/deployment
RUN        npm i /sentiment
ENTRYPOINT [ "node", "." ]

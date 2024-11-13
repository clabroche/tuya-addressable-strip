ARG BUILD_FROM
FROM $BUILD_FROM

WORKDIR /app

COPY run.sh /
RUN chmod a+x /run.sh

CMD [ "node", "src/index.js" ]
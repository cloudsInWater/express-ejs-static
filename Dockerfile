FROM cargo.caicloud.io/caicloud/node:8.9.0-slim

EXPOSE 3000

WORKDIR /app
ADD . /app/

RUN npm install && npm run build

# Set the default timezone to Shanghai
RUN echo "Asia/Shanghai" > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata

CMD ["npm", "run", "start"]
FROM php:8.3-apache AS web

RUN mkdir -p /var/www/html/

# installing and enabling dependencies for the php mysqli interface
RUN apt-get update && apt-get install -y \
    libmariadb-dev \
    && docker-php-ext-install mysqli pdo_mysql \
    && docker-php-ext-enable mysqli pdo_mysql

WORKDIR /var/www/html/

RUN mkdir config control includes modal view

# Copying code to container
COPY  index.php .
COPY  config config/
COPY includes includes/
COPY control control/
COPY modal modal/
COPY view view/

FROM mysql:8.0 AS db

WORKDIR /

RUN mkdir -p /schema
COPY misc/ecommerce.sql /docker-entrypoint-initdb.d/

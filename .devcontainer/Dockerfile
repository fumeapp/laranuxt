FROM ubuntu:22.04

ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID

ENV DEBIAN_FRONTEND=noninteractive

ENV NODE_VERSION 16.13.0
ENV NVM_DIR /usr/local/nvm
ENV PATH $NVM_DIR/versions/node/$NODE_VERSION/bin:$PATH
RUN mkdir -p $NVM_DIR

# Install dependencies
RUN apt-get -y update --no-install-recommends \
    && apt-get -y install --no-install-recommends \
    build-essential \
    curl \
    ca-certificates \
    apt-utils \
    dialog \
    git \
    openssh-server \
    && apt-get autoremove -y \
    && apt-get clean -y

# PHP
RUN apt-get -y update && apt-get -y upgrade \
    && apt-get -y install software-properties-common \
    && add-apt-repository ppa:ondrej/php \
    && apt-get -y update \
    && apt-get -y install php8.2 php8.2-gd php8.2-xml php8.2-soap php8.2-mbstring php8.2-mysql php8.2-pgsql php8.2-dev php8.2-zip php8.2-curl

# XDEBUG Setup
RUN echo "xdebug.mode = develop,debug" >> /etc/php/8.2/cli/conf.d/20-xdebug.ini \
    && echo "xdebug.start_with_request = yes" >> /etc/php/8.2/cli/conf.d/20-xdebug.ini \
    && echo "xdebug.client_host = localhost" >> /etc/php/8.2/cli/conf.d/20-xdebug.ini \
    && echo "xdebug.discover_client_host=1" >> /etc/php/8.2/cli/conf.d/20-xdebug.ini \
    && echo "xdebug.client_port = 9003" >> /etc/php/8.2/cli/conf.d/20-xdebug.ini \
    && echo "xdebug.log = /var/log/xdebug.log" >> /etc/php/8.2/cli/conf.d/20-xdebug.ini

RUN touch /var/log/xdebug.log

# Yarn
RUN curl https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y yarn

# Composer
RUN cd ~
RUN curl -sS https://getcomposer.org/installer -o composer-setup.php \
    && HASH=`curl -sS https://composer.github.io/installer.sig` \
    && php -r "if (hash_file('SHA384', 'composer-setup.php') === '$HASH') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" \
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer

# Nvm & Node
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
RUN /bin/bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION"
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# Set User and Group
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME

# Set Xdebug logging file
RUN chown $USER_UID:$USER_GID /var/log/xdebug.log

ENV DEBIAN_FRONTEND=dialog

USER $USERNAME

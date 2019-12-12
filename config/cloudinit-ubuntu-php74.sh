#! /bin/sh
#
# cloudinit-php74.sh
# Copyright (C) 2019 kevin olson <acidjazz@gmail.com>
#
# Distributed under terms of the APACHE license.
#

PROJECT=laranuxt
ENV=staging
PORT=8000
MAXSIZE=25G
MAXMEMORY=1G

REPO=git@github.com:acidjazz/laranuxt.git
BUCKET=project-$ENV-vault
HOSTNAME=$PROJECT-$ENV

hostname $HOSTNAME

snap install aws-cli

DEBIAN_FRONTEND=noninteractive

curl -sL https://deb.nodesource.com/setup_12.x | bash -

apt -y update
apt-get -y -o DPkg::options::="--force-confdef" -o DPkg::options::="--force-confold" upgrade


apt -y install software-properties-common
add-apt-repository ppa:ondrej/php
apt -y update

apt -y install php7.4 php7.4-fpm php7.4-common php7.4-mysql php7.4-xml php7.4-xmlrpc php7.4-curl php7.4-gd php7.4-imagick php7.4-cli php7.4-mbstring php7.4-opcache php7.4-zip php7.4-intl

apt -y install nginx awscli nodejs

aws s3 cp s3://${BUCKET}/keys/id_rsa /home/ubuntu/.ssh/id_rsa
chmod 0700 /home/ubuntu/.ssh/id_rsa
chown -R ubuntu:ubuntu /home/ubuntu/.ssh/

# nginx config

echo "
user  ubuntu;
worker_processes  4;
pid        /var/run/nginx.pid;
events {
  worker_connections  1024;
}
http {
  include       /etc/nginx/mime.types;
  default_type  application/octet-stream;
  access_log  /var/log/nginx/access.log;
  error_log /var/log/nginx/error.log;
  sendfile        on;
  keepalive_timeout  65;
  gzip on;
  gzip_disable "msie6";
  client_max_body_size $MAXSIZE;
  server {
    listen $PORT;
    root /home/ubuntu/$PROJECT/public;
    index index.php;
    charset utf-8;
    location / {
      try_files \$uri \$uri/ /index.php?\$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
      fastcgi_pass unix:/var/run/php/www.sock;
      fastcgi_index index.php;
      fastcgi_param SCRIPT_FILENAME \$realpath_root\$fastcgi_script_name;
      include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }

  }
}
" > /etc/nginx/nginx.conf


# php-fpm config

echo '
[www]
user = ubuntu
group = ubuntu
listen.owner = ubuntu
listen.group = ubuntu
listen = /run/php/www.sock
pm = dynamic
pm.max_children = 50
pm.start_servers = 5
pm.min_spare_servers = 5
pm.max_spare_servers = 35
slowlog = /var/log/php-fpm/www-slow.log
php_admin_value[error_log] = /var/log/php-fpm/www-error.log
php_admin_flag[log_errors] = on
php_value[session.save_handler] = files
php_value[session.save_path]    = /var/lib/php/session
php_value[soap.wsdl_cache_dir]  = /var/lib/php/wsdlcache
' > /etc/php/7.4/fpm/pool.d/www.conf

# php.ini updates

memory_limit=$MAXMEMORY
upload_max_filesize=$MAXSIZE
post_max_size=$MAXSIZE
max_execution_time=100
max_input_time=223

for key in memory_limit upload_max_filesize post_max_size max_execution_time max_input_time
do
 sed -i "s/^\($key\).*/\1 $(eval echo = \${$key})/" /etc/php/7.4/fpm/php.ini
done

service php7.4-fpm restart
service nginx restart

# Install Composer
curl -sS https://getcomposer.org/installer | HOME="/home/ubuntu" php -- --install-dir=/usr/local/bin --filename=composer
chown ubuntu:ubuntu /home/ubuntu/.composer -R
chmod 775 /home/ubuntu/.composer

su ubuntu -c "
cd ~/
ssh-keyscan github.com >> ~/.ssh/known_hosts
curl -o- -L https://yarnpkg.com/install.sh | bash
source ~/.bashrc
~/.yarn/bin/yarn global add pm2
"

su ubuntu -c "
cd ~/
git clone $REPO
cd $PROJECT
~/.yarn/bin/yarn
~/.yarn/bin/yarn mdi
composer storage
composer install
~/.yarn/bin/yarn apicache
~/.yarn/bin/yarn $ENV-new
"

#! /bin/sh
#
# cloudinit.sh - AMI creation for the laranuxt boilerplate https://github.com/acidjazz/laranuxt
# Copyright (C) 2019 kevin olson <acidjazz@gmail.com>
#
# Distributed under terms of the APACHE license.
#

# variables
PROJECT=laranuxt
ENV=staging
REPO=git@github.com:laranuxt/laranuxt.git

# grab our keys
aws s3 cp s3://${PROJECT}-vault/keys/id_rsa /home/ec2-user/.ssh/id_rsa
chmod 0700 /home/ec2-user/.ssh/id_rsa
chown -R ec2-user:ec2-user /home/ec2-user/.ssh/

# update our server and install our extras
yum -y update
amazon-linux-extras install nginx1.12 php7.2
yum -y install git php-pear php-devel gcc ImageMagick ImageMagick-devel php-mbstring php-bcmath php-pecl-zip

# compile and install image magick
pecl install imagick
echo "extension=imagick.so" > /etc/php.d/30-imagick.ini

# nginx config
echo "
user  nginx;
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
  server {
    listen 81;
    return 301 https://\$host\$request_uri;
  }
  server {
    listen       8000;
    index   index.php;
    server_name  localhost;
    client_max_body_size 1000m;
    client_body_timeout 180s;
    root         /home/ec2-user/${PROJECT}/public/;
    location / {
      if (!-e \$request_filename) {
        rewrite ^(.*)$ /index.php;
      }
    }
    location ~ \.php$ {
      fastcgi_split_path_info ^(.+\.php)(/.+)$;
      fastcgi_pass unix:/var/run/php-fpm/www.sock;

      fastcgi_index index.php;
      include fastcgi_params;
      fastcgi_param  SCRIPT_FILENAME \$document_root\$fastcgi_script_name;
    }
  }
}
" > /etc/nginx/nginx.conf

# php-fpm config

echo '
[www]
user = ec2-user
group = ec2-user
listen = /run/php-fpm/www.sock
listen.acl_users = apache,nginx,ec2-user
listen.allowed_clients = 127.0.0.1

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
' > /etc/php-fpm.d/www.conf

# php.ini updates

upload_max_filesize=999M
post_max_size=999M
max_execution_time=100
max_input_time=223

for key in upload_max_filesize post_max_size max_execution_time max_input_time
do
 sed -i "s/^\($key\).*/\1 $(eval echo = \${$key})/" /etc/php.ini
done

systemctl restart php-fpm.service
systemctl restart nginx.service

# Install Composer
curl -sS https://getcomposer.org/installer | HOME="/home/ec2-user" php -- --install-dir=/usr/local/bin --filename=composer
chown ec2-user:ec2-user /home/ec2-user/.composer -R
chmod 775 /home/ec2-user/.composer

su ec2-user -c "
cd ~/
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
chmod a+x ~/.nvm/nvm.sh
~/.nvm/nvm.sh
source ~/.bashrc
nvm install 12.3.0
nvm alias default 12.3.0
nvm use 12.3.0
curl -o- -L https://yarnpkg.com/install.sh | bash
source ~/.bashrc
ssh-keyscan github.com >> ~/.ssh/known_hosts
cd ~/
yarn global add pm2
"

su ec2-user -c "
cd ~/
source ~/.bashrc
git clone $REPO
cd $PROJECT
yarn
yarn mdi
/usr/local/bin/composer install
yarn logs
yarn apicache
"

systemctl stop php-fpm.service
systemctl stop nginx.service

## clean up log files so the AMI has fresh ones
# rm -rf /var/log/cloud*
# rm -rf /var/lib/cloud/instance/user-*
# rm -rf /var/lib/cloud/instance/vendor-*
# rm -rf /var/lib/cloud/instance/scripts/part-001

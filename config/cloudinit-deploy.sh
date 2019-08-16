#! /bin/sh
#
# cloudinit.sh - Launch Config for the laranuxt boilerplate https://github.com/acidjazz/laranuxt
# Copyright (C) 2019 kevin olson <acidjazz@gmail.com>
#
# Distributed under terms of the APACHE license.
#

# variables
PROJECT=laranuxt
ENV=staging

# start up our services
systemctl start php-fpm.service
systemctl start nginx.service

# pull in the latest and update it
su ec2-user -c "
cd ~/$PROJECT
source ~/.bashrc
git pull
yarn
/usr/local/bin/composer update
yarn ${ENV}-new
"

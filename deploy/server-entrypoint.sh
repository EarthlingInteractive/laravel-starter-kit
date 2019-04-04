#!/bin/bash

echo "NPM Install"
cd /var/www/server && npm install --quiet

echo "Composer install";
composer install -d /var/www/server

echo "Setting directory permissions";
chown -R www-data.www-data /var/www && chmod 775 /var/www;

echo "Run migrations";
php /var/www/server/artisan migrate --force

exec "$@"

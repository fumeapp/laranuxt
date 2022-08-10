To use within Dev Container you need to make sure your `.env` is using the proper configuration. The you can open VS Code in Remote Container. This will build the app and configure your database and tools like Mailhog.

For your Database config it should look like:

```
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=laranuxt
DB_USERNAME=root
DB_PASSWORD=password
```

If you want to use Mailhog built within the container make sure your config looks like
```
MAIL_MAILER=smtp
MAIL_HOST=mailhog
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"
```

If you need to use tools like Ray, you can copy this `ray.php` file and move to the root of your project
and then in your `.env` you change update these to your spec

```
# To use Ray
RAY_HOST=host.docker.internal
RAY_REMOTE_PATH=/workspace

# Set this to your working directory
RAY_LOCAL_PATH=/path/to/working/folder
```

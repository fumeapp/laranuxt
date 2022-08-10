# Dev Container


## Running Dev Container

If you need/prefer the option you can build and use this template within a Dev Container, which you can run locally or with GitHub Codespaces.

To build and run locally you must first have docker and docker compose installed for your OS.

Once you have those installed you can click on the prompt:

![image](https://user-images.githubusercontent.com/25044744/184038681-593065e5-f4d5-4aa2-bbe4-3da157a2c39d.png)

Or by using the option in VSCode:

![image](https://user-images.githubusercontent.com/25044744/184038895-fa330419-29bb-4a01-a58e-c4ea70503910.png)
![image](https://user-images.githubusercontent.com/25044744/184038953-000377c6-627e-4c5a-b9fd-f46a49325b95.png)


## Configuring Dev Container

After you click to run the app within a dev container you need to make sure your application `.env` is setup to use the proper configuration.

This means updating the following:

1. Database Connection
2. Mailer

> The DB connection your `.env` should match the following:

```
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=laranuxt
DB_USERNAME=root
DB_PASSWORD=password
```

> And if you are using Mailhog as a development mail server:

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

These `.env` entires are important to update since the HOST must match what was configured in the dockerize'd environment. Otherwise your database and mail server will not get connected.


## Dev Container Extras

To use tools like Spatie Ray you need to configure the dev container to do so.

First copy the `ray.php` file and add it to the root of this apps directory.

```bash
cp .devcontainer/ray.php ray.php
```

Next within your `.env` add the following entires:

> Keep in mind the value `RAY_LOCAL_PATH` should be set to your machines full path to the app.
```
RAY_HOST=host.docker.internal
RAY_REMOTE_PATH=/workspace

# Set this to your working directory
RAY_LOCAL_PATH=/path/to/working/folder
```

## Additional configuration

If you need to change any of the ports the dev container needs to map to you can add the following to your `.env`

```
DOCKER_PORT_MYSQL
DOCKER_PORT_MAILHOG_1
DOCKER_PORT_MAILHOG_2
```

Then set the value equal to the port you want it to run at.

For example if the mysql port of 3306 will not work for your locally, maybe you have another instance running.

You may set it to the value you want:

> To run instead at port 13306

```
DOCKER_PORT_MYSQL=13306
```

## After Dev Container Build

Once the Dev Container successfully built you can run your typically `artisan`/`composer`/`yarn` commands. 

We suggest after everything is built opening up 2 integrated terminals.

> To migrate and seed container database & To run API server
1. One to run `yarn seed` && `yarn api`

> To run Nuxt server
2. `yarn dev`


But before both if this is the first time building the app you would still need to:

```bash
composer install && yarn install
```

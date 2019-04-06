
# laravel-starter-kit

Spin up clean laravel instance with authentication and postgresql db.

## Installing / Getting started

First, clone the project. Copy `server/.env.example` to `server/.env`

Run the following command:

```shell
docker-compose up -d
```

This will first build the image based off the project's `Dockerfile`.  After the image is built, it will start and the current working directory will be mounted to the app container's `/var/www`.

To seed the database:

```shell
docker exec -it laravel-starter-kit-server php server/artisan db:seed
```

## Developing

### Built With

The current technologies used by the starter kit are as follows:

| Type | Selected Technology | Reasoning |
| ---- | ------------------- | --------- |
| Transpiler | [TypeScript](https://www.typescriptlang.org/) | Static types make for code that is less buggy and easier to reason about.  A basic TypeScript cheatsheet can be found [here](https://www.sitepen.com/blog/2013/12/31/typescript-cheat-sheet/) and more extensive documentation [here](https://www.typescriptlang.org/docs/tutorial.html) and [here](https://www.sitepen.com/blog/2013/12/31/definitive-guide-to-typescript/) |
| Backend Server | [Laravel](https://laravel.com/docs/5.8) | Well documented and widely supported web framework |
| Data Mapping Framework | [Eloquent ORM](https://laravel.com/docs/5.8/eloquent) | Included with Laravel |
| Database Migrations | [Laravel Migrations](https://laravel.com/docs/5.8/migrations) | Provided by Laravel, so no additional dependencies |
| Data Store | [PostgreSQL](https://www.postgresql.org/) | Open source, rock solid, industry standard |
| Package Manager | [npm](https://www.npmjs.com/) / [composer](https://getcomposer.org/) | The battle-tested choices for node/php development |
| Containerization | [Docker](https://www.docker.com/) | Containers make deployment easy |

### Prerequisites

- Docker

### Setting up Dev

See Getting Started section for steps.

Once spun up, you can shell into the server instances like:

```shell
docker exec -it laravel-starter-kit-server bash
```

### Building

Build javascript and sass:

```shell
cd server/ && npm run prod
```

Compiling is done via [Laravel Mix](https://laravel-mix.com/docs/4.0/mixjs).

### Deploying / Publishing


To eek out best performance, should also run `php server/artisan config:cache` and `php server/artisan route:cache`, and make sure `APP_DEBUG` is false and `NODE_ENV=production` and `APP_ENV=production`.

## Configuration

See the .env.example files in client and server directories.

## Tests

```shell
cd server && ./vendor/bin/phpunit
```

## Artisan

Laravel has a CLI tool called [Artisan](https://laravel.com/docs/5.8/artisan). To use it:

```shell
docker exec -it laravel-starter-kit-server php server/artisan YOUR_COMMAND
```

Do `list` to see available commands.

### How to make a new API endpoint

- Make Model and DB Migration:

```
php artisan make:model Todo -m
```

-  Make Controller:

```
php artisan make:controller TodoController --resource --model=Todo
```

-  Add Routes

```
Route::apiResource('todos', 'TodoController');
```

-  Add Authorization Policies:

```
php artisan make:policy TodoPolicy --model=Todo
```

Register policy in `AuthServiceProvider`:

```
Todo::class => TodoPolicy::class,
```


## Style guide

TBD

## Api Reference

TBD

## Database

Using postgres v9.11. For local development, database runs in docker container. `server/database` contains migrations, and seeds.

You can connect to the database with your favorite client at `localhost:5432`!

#### Run migrations:

```shell
php artisan migrate
```

#### Run seeds:

```shell
php artisan db:seed
```

#### Create new seeds:

```shell
php artisan make:seeder TodosTableSeeder
```

Add it to `DatabaseSeeder.php`:

```
$this->call(TodosTableSeeder::class);
```

## Licensing

[MIT License](LICENSE.md)

---

## Tips and Tricks

### Windows Line Endings

Make sure git globally has line endings set to LF.  This needs to be set ***before*** cloning the project.

- For windows: `git config --global core.autocrlf false`
- For linux/mac: `git config --global core.autocrlf input`

If you forget to do this in windows, you make get errors starting docker like `file not found`. 
Update the line endings of any files that are crlf to lf and try again.

## Atlas Fractional


#### example diagram to talk about gateway and other micro services
![](https://romankudryashov.com/blog/2020/12/graphql-rust/images/architecture.png)


Lerna monorepo that holds common platform code and all packages

## Getting Started

Install dependencies

```
npm ci
npm run bootstrap
```

Build

```
npm run build
```
### Setting up the whole platform Locally 

This platform contains all these components 

- User Manegement service
- Home Manager service
- Gateway Service
- Home Manager Service

### Running all these services 

> we are using docker-compose to bootstrap all container only (database containers)
> in the root of the project run
```
docker-compose up
```
> check the longs and make sure databases has been created 
```
git clone https://github.com/MobileLeapLabs/atlas-fractional.git
cd atlas-fractional
cd packages
```
### Running Auth service

```sh
cd auth-service
vi .env
```
update env with this content 
```
DATABASE_URL= postgres://api:development_pass@localhost:5431/auth-api
SENDGRID_API_KEY=23456754324567854324567
SENDGRID_VERIFIED_SENDER_EMAIL=ack@gmail.com
DEBUG="qapi:*"
LOG_LEVEL=http
PORT=5006
NODE_ENV=local
JWT_SECRET=BLABLABLA
JWT_EXPIRE_IN=3600*24
```
Now run application in watch mode it will be live on localhost:5006 
```sh
npm run start:dev
```


### Running Home Manager

```sh
cd home-manager
vi .env
```
update env with this content 
```
NODE_ENV=local
LOG_LEVEL=http
PORT=5003
SECRET_KEY=BLABLABLA
NEW_RELIC_KEY=
DATABASE_URL=postgres://api:development_pass@localhost:5433/home-manager-api
```
Now run application in watch mode it will be live on localhost:5003 
```sh
npm run start:dev
```

### Running Booking Manager

```sh
cd booking-manager
vi .env
```
update env with this content 
```
NODE_ENV=local
LOG_LEVEL=http
PORT=5004
JWT_SECRET=BLABLABLA
JWT_EXPIRE_IN=3600*24
DATABASE_URL=postgres://api:development_pass@localhost:5434/booking-manager-api
```
Now run application in watch mode it will be live on localhost:5003 
```sh
npm run start:dev
```


### Running Gateway Service

```sh
cd gateway-service
vi .env
```
update env with this content 
```
NODE_ENV=local
LOG_LEVEL=http
PORT=5002
NEW_RELIC_KEY=
SECRET_KEY=BLABLABLA
```
Now run application in watch mode it will be live on localhost:5002 
```sh
npm run start:dev
```
Once all services are up we can use gateway service to connect with all apis
```sh
http://localhost:5002/graphql
```


## Helpful command for Lerna

Full list of commands

```
lerna add <pkg> [globs..]  Add a single dependency to matched packages
lerna bootstrap            Link local packages together and install remaining package dependencies
lerna changed              List local packages that have changed since the last tagged release [aliases: updated]
lerna clean                Remove the node_modules directory from all packages
lerna create <name> [loc]  Create a new lerna-managed package
lerna diff [pkgName]       Diff all packages or a single package since the last release
lerna exec [cmd] [args..]  Execute an arbitrary command in each package
lerna import <dir>         Import a package into the monorepo with commit history
lerna init                 Create a new Lerna repo or upgrade an existing repo to the current version of Lerna.
lerna link                 Symlink together all packages that are dependencies of each other
lerna list                 List local packages [aliases: ls, la, ll]
lerna publish [bump]       Publish packages in the current project.
lerna run <script>         Run an npm script in each package that contains that script
lerna version [bump]       Bump version of packages changed since the last release.
```

## Reference

- [Lerna versioning](https://github.com/lerna/lerna/blob/main/commands/version/README.md)
- [Lerna bootstrap command](https://github.com/lerna/lerna/tree/main/commands/bootstrap#readme)
- [Issue. Lerna bootstrap does not install all dependencies](https://github.com/lerna/lerna/issues/1457)
- [Issue. bootstrap removes node_modules from root (during hoist)](https://github.com/lerna/lerna/issues/2361)
- [Blog. Multi-Package Repos with Lerna](https://www.christopherbiscardi.com/post/multi-package-repos-with-lerna)
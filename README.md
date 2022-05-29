# nestjs-with-apollo-federation-gateway

nestjs with apollo federation gateway to compose sub graphs from different microservices

This is a demo example to showcase how we can have a federated gateway composing all sub-graphs from different microsercices 
With this whole Demo we want to have different microservices exposing graphql schema and gateway is composing all to expose from single api endp-point

![](./snap/snap.png)

![](https://raw.githubusercontent.com/rkudryashov/graphql-federation/master/architecture.png)

We will build 

- nestjs graphql gateway service
- nestjs user auth service 
- nestjs user blog service
- nestjs user comment service

I am covering blog series on the same topic as there is no much resources available on how should we build graphql gateway in nestjs 

- https://tkssharma.com/nestjs-with-apollo-federation-for-microservices-part-1/
- https://tkssharma.com/nestjs-with-apollo-federation-for-microservices-part-2/
- https://tkssharma.com/nestjs-with-apollo-federation-for-microservices-part-3/
- https://tkssharma.com/nestjs-with-apollo-federation-for-microservices-part-4/

### Why we need apollo federation or schema stitching 

#### Federation
These days we are only talking about microservice and with that how can we build distributed arcthitecture. Now a days GraphQL is becoming the preferred query language due to its flexibility. As we know microservices are difficult to work with. For example, how do you avoid multiple endpoints for users? One solution is to implement federation.

Before Federation cam einto picture we were doing those things with Schema stitching, we can just quicky check how both of these are different

#### Federation vs schema stitching
Schema stitching was the previous solution for microservice architecture. Both federation and schema stitching do offer the same functionality on the surface, gathering multiple services into one unified gateway, but the implementation is different.

With GraphQL federation, you tell the gateway where it needs to look for the different objects and what URLs they live at. The subgraphs provide metadata that the gateway uses to automatically stitch everything together. This is a low-maintenance approach that gives your team a lot of flexibility.

With schema stitching, you must define the “stitching” in the gateway yourself. Your team now has a separate service that needs to be altered, which limits flexibility. The use case for schema stitching is when your underlying services are not all GraphQL. Schema stitching allows you to create a gateway connected to a REST API, for example, while federation only works with GraphQL.


In this whole demo we will talk about nestjs with apollo federation gateway, how gateway is composing all sub-graphs and making out task easy to compose all sub-graphs and expose only a single graohql end point, we don't need to do stitching with apollo federation 

### Nestjs with Graphql

Nest offers two ways of building GraphQL applications, the code first and the schema first methods. You should choose the one that works best for you. Most of the chapters in this GraphQL section are divided into two main parts: one you should follow if you adopt code first, and the other to be used if you adopt schema first.

- schema first approach
- code first approach

example you can explore from here 
https://github.com/tkssharma/nodejs-graphql-world/tree/master/Graphql%20using%20Apollo


In the code first approach, you use decorators and TypeScript classes to generate the corresponding GraphQL schema. This approach is useful if you prefer to work exclusively with TypeScript and avoid context switching between language syntaxes.


lets See this in action 

- we need docker-compose up so we can have all database available for TypeORM 
- `docker-compose up` will crate container 
- install package dependencies in all projects 
- run applications and final run gateway 

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
git clone <repo>
cd nestjs-with-apollo-federation-gateway
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
SENDGRID_API_KEY=SSSS
SENDGRID_VERIFIED_SENDER_EMAIL=ssss@gmail.com
DEBUG="ssss:*"
LOG_LEVEL=http
PORT=5006
NODE_ENV=local
JWT_SECRET=HELLO
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
SECRET_KEY=HELLO
NEW_RELIC_KEY=
DATABASE_URL=postgres://api:development_pass@localhost:5433/home-manager-api
```
Now run application in watch mode it will be live on localhost:5003 
```sh
npm run start:dev
```
docker-compose up
![](./snap/service-snap-3.png)

Auth Apis `npm run start:dev`
![](./snap/service-snap-4.png)

Home Apis `npm run start:dev`
![](./snap/service-snap-5.png)

For Gateway also trigger same command `npm run start:dev`
![](./snap/service-snap-6.png)

Now lets test our application 
Our Gateway is connected to both sub-graphq apis running on different ports 
We have to make sure both service are running before running gateway service 
```json
{ name: 'User', url: 'http://localhost:5006/graphql' },
{ name: 'Home', url: 'http://localhost:5003/graphql' },
```
If you are using same PORT and env then Gateway will run on `http://localhost:5002/graphql`

![](./snap/service-snap-2.png)

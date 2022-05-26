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




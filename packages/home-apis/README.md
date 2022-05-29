## Home-manager APIs [NestJS APIs]

### Installation and Setup

```bash
# install from package-lock.json (quicker)
npm ci
# install and update deps at package-lock.json (slower)
npm i
```

##### Copy files
```
cp env.example .env
cp docker-compose.override.example.yml docker-compose.override.yml
```

## populating postgres tables

- Validate configuration and enable for npm install and Migration
```
version: "3"
services:
  node:
    command: npm run start:debug
    container_name: document_node
    environment:
      NPM_INSTALL: ENABLE
      TYPEORM_MIGRATION: ENABLE
```
### Keep NPM_INSTALL and TYPEORM_MIGRATION as ENABLED to run Migration
```
 NPM_INSTALL: ENABLE
 TYPEORM_MIGRATION: ENABLE
```


Running in docker using docker-compose
```
docker-compose build
docker-compose up
```

# Running tests
```
docker-compose exec node npm run test


> contract-repository@1.0.0 pretest /app
> npm run test:migration


> contract-repository@1.0.0 test:migration /app
> dotenv -e env.test --  typeorm migration:run
```

# Running tests (only unit or e2e)

```
docker-compose exec node npm run test:unit
docker-compose exec node npm run test:e2e
```

Please ensure to set the right environment variables in the .env file.

## Debugging:
For debugging support, copy the provided docker compose override

```
cp docker-compose.override.debug.yml docker-compose.override.yml
```
This will expose debugger port 5858, rest you just need to have launch.json file in root of pr project

Just configure your inspector to attach to port 5858
add launch.json in .vscode folder [vscode editor] for docker container debugging 

```
{
  "configurations": [
    {
      "name": "Docker: Attach to Node",
      "type": "node",
      "request": "attach",
      "port": 5858,
      "address": "0.0.0.0",
      "localRoot": "${workspaceFolder}",
      "remoteRoot": "/",
      "protocol": "inspector"
    }
  ]
}
```

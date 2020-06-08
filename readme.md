## Vehicle-API

### Installation

```cd vehicle-api```
```npm install```
```npm start```

open http://localhost:3000/ in your browser for verify the express API is running or not

### Edit .env

Update MONGO_DB_CONN_STRING in .env with your local mongodb connection string

Currently MONGO_DB_CONN_STRING is configured against docker configuration.


## Docker

```docker build -t vehicle-api .```

```docker-compose up```

open http://localhost:3000/ in your browser for verify the express API is running or not


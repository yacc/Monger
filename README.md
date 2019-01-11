
# Building the app

```csh
cd Monger
➜ npm install
```

When running in development make sure to run `npm install --only=dev`
This will enable loading credentials from environment variable (through .env)

# Starting the app in development mode

## Setup the environment

Set the following enviroment variables in the `.env` file
```
NODE_ENV=development
MONGER_URL=https://www.themonger.com
MONGER_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxx
MONGER_ID=xxx
SEACREST_WP_IP=::1
```

## Start the node server
```csh
cd Monger
➜ npm run dev
Listening on port 4000

➜ npm run dev

> Monger@1.0.0 dev TheMonger/Monger
> NODE_ENV=development node_modules/.bin/nodemon index.js

[nodemon] 1.18.9
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node index.js`
Listening on port 4000
=====================
Monger Request: https://www.themonger.com/api/filters/products.json
{
    "url": "https://www.themonger.com/api/filters/products.json",
    "method": "GET",
    "headers": {
        "Authorization": "xxxxxxxxxxxxxxxxxxx|xxxx"
    }
}
=====================
```

# Testing the api server

## List all filters
```csh
curl "localhost:4000/api/v1/filters"
```

## List all products from category 11
```csh
curl "localhost:4000/api/v1/search/products.json?category_ids=11"
```


# The Monger API

```
curl --header "Authorization: xxxxxxxxxxxxxxxxxxx|xxxx" \
     https://www.themonger.com/api/filters/products.json
```

```
curl --header "Authorization: xxxxxxxxxxxxxxxxxxx|xxxx" \
     https://www.themonger.com/api/products.json
```

curl -v -g --header "Authorization: xxxxxxxxxxxxxxxxxxx|xxxx" "https://www.themonger.com/api/search/products.json?category_ids=11"

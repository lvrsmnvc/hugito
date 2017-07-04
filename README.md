# hugito-frontend

[![Build Status](https://travis-ci.com/joaodias/hugito-frontend.svg?token=sUutqTfvfqWU1UcqaFtD)](https://travis-ci.com/joaodias/hugito-frontend)

The frontend for the [Hugito App](https://github.com/joaodias/hugito-app). Deployed to: `www.hugito.surge.sh`.

## How to deploy

1. Build the frontend with webpack:

```
webpack
```

2. Copy images, styles and html to the public folder:

```
cp images public/
cp app.css public/
cp index.html public/
```
3. Deploy to surge. Be sure to select the public folder and to add the domainas `hugito.surge.sh`:

```
surge
````


# HITCHHIKER

## Setup

```
heroku login
```

```
bundle install
```

Install redis (if not installed)

```
brew install redis

```

Start the redis server

```
redis-server
```

or to start in background

```
redis-server --daemonize yes
```

run app

```
heroku local web
```

Using foreman we can boot the application.

```
$ foreman start
```

deploy

```
git push heroku main
```

URL: http://localhost:5000 to see the application.

URL Live: https://arcane-headland-39513.herokuapp.com/

Heroku App Name: arcane-headland-39513

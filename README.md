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

URL: http://localhost:5000 to see the application.

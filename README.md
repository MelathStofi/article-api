# article-api

# description

A REST API that lists articles. The articles can be viewed with valid token.
New articles can be created and an image can be attached to it either by URL or through static upload.

# setup

1. install MySQL and create a database
2. create a '.env' named file in the root directory
   - these are the required environment variables:
     DB_HOST=localhost
     DB_PORT=3306
     DB_USERNAME=username
     DB_NAME=dbname
     DB_PASSWORD=password
     DB_NO_SYNC=false
     DB_NO_LOGS=true
3. run 'yarn' command in the root directory of the project
4. run 'yarn start' command
   - you might need to restart it in case the database has not synchronized

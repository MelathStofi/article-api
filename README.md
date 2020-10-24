# article-api

# description

A REST API that lists articles. The articles can be viewed with valid token.
New articles can be created and an image can be attached to it either by URL or through static upload.

# requirements

- MySQL: https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en
- yarn: https://classic.yarnpkg.com/en/docs/install

# setup

1. Create a database in MySQL

2. Create a '.env' named file in the root directory

   - these are the required environment variables:

     DB_HOST=localhost
     DB_PORT=3306
     DB_USERNAME=username
     DB_NAME=dbname
     DB_PASSWORD=password
     DB_NO_SYNC=false
     DB_NO_LOGS=true

3. Run 'yarn' command in the root directory of the project

4. Run 'yarn start' command

   - you might need to restart it in case the database has not synchronized

5. Go to http://localhost:8080 and see the API documentation

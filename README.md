# Organizer Project
This next.js project can be used to create, update, delete and visualize tasks. A task holds a title, description and date. 
The project consists of a Frontend and Backend and uses different approaches to view and manipulate the data. 
The Project reliese on a persistence layer implemented with mysql. 

Check the documentation on how to setup the project and get a more indepth view about the implementation.

## Getting Started

### Clone the Repo
```bash
git clone https://github.com/Ironmomo/organizer-app.git
```

### Initialize the Database

It is mandatory to setup a mysql database. To initialize use the following script: [init.sql](db/init.sql).

To make it more easy for you I recommend to set up a docker container with the following Dockerfile. Make shure to use the correct path to the init.sql script

```Dockerfile
#Dockerfile
# Use the official MySQL image as the base image
FROM mysql

# Set environment variables for MySQL root user password
ENV MYSQL_ROOT_PASSWORD=12345678

# Copy the init.sql script into the Docker container's /docker-entrypoint-initdb.d/ directory
# This directory is used by the MySQL Docker image to automatically initialize databases during container startup
COPY init.sql /docker-entrypoint-initdb.d/

# Expose port 3306 to allow external connections to the MySQL server
EXPOSE 3306
```

Start the docker container
```bash
# build the image
docker build . mysql_organizer

# Start the container
docker run --name mysql_organizer_container -d -p 3306:3306 mysql_organizer
```

### Setup the environment

Create a .env.local file in the root directory
```
#.env.local
DB_USER=root
DB_HOST=localhost
DB_DATABASE=OrganizerDB
DB_PASSWORD=12345678
```

### Build and Run the Project

```bash
npm run build

npm run start
```

Open up [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## About the Project

### Functionality

### Implementation overview

### Security concerns
This project should only give a brief overlook about the way I structure a simple project and how I writte code. 
Because of time concerns and for you to be able to gain a quick overview about the project there are not many security implementations like authentications. 
Nevertheless some basic Security Requirements have been defined:

#### Security Requirements
1. The web application must not directly access the underlying operating system

2. Database access must be implemented securily to prevent SQL Injection Attacks

3. All data recieved from user or the system are concedered un-trusted and therefore must be validated before processing it any further to prevent potential malicious content.
   
![dfd](https://github.com/Ironmomo/organizer-app/assets/75339997/ba6702b4-37f5-4dca-a126-d031605f0925)

#### Threads
1. An attacker can make use of a web application vulnerability to get access to the underlying file system of the web server.
   
2. An attacker can provocate a web application error to gather information about the technologie and or implementation details.

3. An attacker can interact with the SQL Database in a way it was not intendet by the developer by using sql injection.

4. An attacker can do a xss attack by uploading javascript like input to the web application which then gets send back to the browser if a potential victim is requesting this data.

5. An attacker can do a CSRF attack by sending requests to the web application backend from another website.


#### Security Design implemented in the project
1. To prevent Thread 1, don't use any vulnerable functions such as exec.

2. To prevent Thread 2, don't send any detailed error message from the backend to the frontend by implementing an ErrorObject which overwrittes the Error Message and set the Error Stack to null.

3. To prevent Thread 3, only use prepared sql statements.

4. To prevent Thread 4, sanitize the input data by html encode the data before processing the data in the backend or the frontend.

5. To prevent Thread 5, use the default settings of the next js api response and don't set any CORS Headers

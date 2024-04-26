# Organizer Project
This next.js project can be used to manage some tasks.

## Getting Started

### Clone the Repo
```bash
git clone https://github.com/Ironmomo/organizer-app.git
```

### Initialize the Database

It is mandatory to setup a mysql database. To initialize use the following script: [init.sql](db/init.sql).

To make it more easy for you set up a docker container with the following Dockerfile. Make shure to use the correct path to the init.sql script

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## About the Project

### Functionality

### Implementation overview

### Security concerns
This project should only give a brief overlook about the way I structure a simple project and how I writte code. Therefore there are not many security implementations like authentications. 
Nevertheless some basic Security Requirements have been defined:

#### Security Requirements
1. The web application must not directly access the underlying operating system

2. Database access must be implemented securily to prevent SQL Injection Attacks

3. All data recieved from user or the system are concedered un-trusted and therefore must be validated before processing it any further

#### Threads
1. 


#### Security Design

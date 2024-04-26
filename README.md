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
docker build . mysql_test

# Start the container
docker run --name mysql_pwdtest -d -p 3306:3306 mysql_test
```

### Setup the environment

Create a .env.local file in the root directory
```
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


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

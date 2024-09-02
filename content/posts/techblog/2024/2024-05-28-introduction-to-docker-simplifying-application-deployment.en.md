---
title: 'Introduction to Docker: Simplifying Application Deployment'
date: 2024-05-28T16:18:18+03:30
layout: single
author_profile: true
url: 2024/05/28/introduction-to-docker-simplifying-application-deployment/
shortlink: https://g.omid.dev/GrFA1uO
tags:
  - Docker
  - Containerization
  - DevOps
  - Docker Compose
lang: en
categories: 
  - techblog
---
In the modern era of software development, Docker has become an indispensable tool for developers and DevOps engineers. It streamlines the process of deploying applications by providing a consistent environment across different stages of development, testing, and production. In this blog post, we'll explore what Docker is, how to install it, and demonstrate a common use case: running a local WordPress site using Docker Compose.

## What is Docker?

Docker is an open-source platform that automates the deployment, scaling, and management of applications. It does this by using containerization, which packages an application and its dependencies into a single, lightweight container. Containers are isolated from each other and the host system, ensuring that the application runs consistently regardless of the environment.

### Key Benefits of Docker

1. **Consistency**: Docker containers ensure that the application works the same way in any environment, eliminating the "it works on my machine" problem.
2. **Isolation**: Each container is isolated, meaning that different applications can run on the same host without interfering with each other.
3. **Scalability**: Docker makes it easy to scale applications up or down by adding or removing containers.
4. **Efficiency**: Containers share the host OS kernel, making them more lightweight and faster to start than traditional virtual machines.

## How to Install Docker

### Prerequisites

- A 64-bit version of Windows 10 or later, macOS, or a modern Linux distribution.

### Installation Steps

#### For Windows and macOS

1. **Download Docker Desktop**:
   - Go to the [Docker Desktop download page](https://www.docker.com/products/docker-desktop) and download the installer for your operating system.

2. **Install Docker Desktop**:
   - Run the installer and follow the on-screen instructions. For Windows, you may need to enable the WSL 2 (Windows Subsystem for Linux) feature during the installation.

3. **Start Docker Desktop**:
   - After installation, launch Docker Desktop. You may need to sign in with your Docker Hub account.

#### For Linux

##### For Debian-based Distributions (Ubuntu, Debian)

1. **Update your package index**:

   ```bash
   sudo apt-get update
   ```

2. **Install Docker**:

   ```bash
   sudo apt-get install docker-ce docker-ce-cli containerd.io
   ```

3. **Start Docker**:

   ```bash
   sudo systemctl start docker
   ```

4. **Enable Docker to start on boot**:

   ```bash
   sudo systemctl enable docker
   ```

5. **Post-Installation Steps** (Optional):

   - To run Docker commands without `sudo`, create a Docker group and add your user to it:

     ```bash
     sudo groupadd docker
     sudo usermod -aG docker $USER
     ```

     Log out and back in to apply the group changes.

##### For Arch Linux

1. **Update your package database**:

   ```bash
   sudo pacman -Syu
   ```

2. **Install Docker**:

   ```bash
   sudo pacman -S docker
   ```

3. **Start Docker**:

   ```bash
   sudo systemctl start docker
   ```

4. **Enable Docker to start on boot**:

   ```bash
   sudo systemctl enable docker
   ```

5. **Post-Installation Steps** (Optional):

   - To run Docker commands without `sudo`, add your user to the Docker group:

     ```bash
     sudo usermod -aG docker $USER
     ```

     Log out and back in to apply the group changes.

## Running a Local WordPress Site with Docker Compose

Docker Compose is a tool that allows you to define and manage multi-container Docker applications. To illustrate its power, we'll set up a local WordPress site.

### Step-by-Step Guide

1. **Create a Project Directory**:

   ```bash
   mkdir my_wordpress
   cd my_wordpress
   ```

2. **Create a `docker-compose.yml` File**:

   ```yaml
    services:
      db:
        # We use a mariadb image which supports both amd64 & arm64 architecture
        image: mariadb:10.6.4-focal
        # If you really want to use MySQL, uncomment the following line
        #image: mysql:8.0.27
        command: '--default-authentication-plugin=mysql_native_password'
        volumes:
          - db_data:/var/lib/mysql
        restart: always
        environment:
          - MYSQL_ROOT_PASSWORD=somewordpress
          - MYSQL_DATABASE=wordpress
          - MYSQL_USER=wordpress
          - MYSQL_PASSWORD=wordpress
        expose:
          - 3306
          - 33060
      wordpress:
        image: wordpress:latest
        volumes:
          - wp_data:/var/www/html
        ports:
          - 8000:80
        restart: always
        environment:
          - WORDPRESS_DB_HOST=db
          - WORDPRESS_DB_USER=wordpress
          - WORDPRESS_DB_PASSWORD=wordpress
          - WORDPRESS_DB_NAME=wordpress
    volumes:
      db_data:
      wp_data:
   ```

3. **Run Docker Compose**:

   ```bash
   docker-compose up -d
   ```

   This command tells Docker Compose to start the containers in detached mode (`-d`).

4. **Access Your WordPress Site**:
   - Open your web browser and go to `http://localhost:8000`. You should see the WordPress installation page.

### Explanation of `docker-compose.yml`

- **version**: Specifies the Docker Compose file format version.
- **services**: Defines the two services: `db` (database) and `wordpress` (WordPress application).
  - **db** service uses the Mariadb 10.6.4 image, with environment variables for database setup.
  - **wordpress** service uses the latest WordPress image and links it to the `db` service.
- **volumes**: Creates persistent storage for both the database and WordPress files, ensuring data is retained between container restarts.

## Common Issues and Configuration

### How to use local proxy

- Create a folder for configuring the Docker service through systemd

  `mkdir /etc/systemd/system/docker.service.d`

- Create a service configuration file at `/etc/systemd/system/docker.service.d/http-proxy.conf` and put the following in the newly created file

```yaml
[Service]
 # NO_PROXY is optional and can be removed if not needed
 # Change proxy_url to your proxy IP or FQDN and proxy_port to your proxy port
 # For Proxy servers that require username and password authentication, just add the proper username and password to the URL. (see example below)

 # Example without authentication
 Environment="HTTP_PROXY=http://proxy_url:proxy_port" "NO_PROXY=localhost,127.0.0.0/8"

 # Example with authentication
 Environment="HTTP_PROXY=http://username:password@proxy_url:proxy_port" "NO_PROXY=localhost,127.0.0.0/8"

 # Example for SOCKS5
 Environment="HTTP_PROXY=socks5://proxy_url:proxy_port" "NO_PROXY=localhost,127.0.0.0/8"
```

- Reload systemctl so that new settings are read

  `sudo systemctl daemon-reload`

- Verify that docker service Environment is properly set

  `sudo systemctl show docker --property Environment`

- Restart docker service so that it uses updated Environment settings

  `sudo systemctl restart docker`

### Credentials Error

You may receive error similar to this one:

```bash
Error saving credentials: error storing credentials - err: exit status 1, out: `error getting credentials - err: exit status 1, out:` no usernames for https://index.docker.io/v1/``
```

***Solution***

 1. first stop docker with this command

    `sudo systemctl stop docker`

 2. remove old docker config

     `rm ~/.docker/config.json`

 3. start docker

    `sudo systemctl start docker`

## Conclusion

Docker simplifies the process of deploying and managing applications by encapsulating them in containers. Using Docker Compose, you can easily define and run multi-container applications like WordPress. Whether you are a developer looking to streamline your workflow or an operations engineer aiming for consistent deployment environments, Docker is an essential tool in your toolkit.

---
title: "Mastering Docker for Full-Stack Development"
description: "Complete guide to containerizing your applications with Docker, from basics to advanced multi-container setups with Docker Compose."
date: "2025-01-06"
author: "Your Name"
tags: ["docker", "containers", "devops", "deployment", "fullstack"]
category: "DevOps"
readTime: "15 min read"
featured: true
---

# Mastering Docker for Full-Stack Development

Docker has revolutionized how we develop, test, and deploy applications. In this comprehensive guide, we'll explore everything from basic containerization to advanced multi-container orchestration.

## Why Docker Matters for Developers

- **Consistency**: "It works on my machine" becomes "It works everywhere"
- **Isolation**: Applications run in isolated environments
- **Scalability**: Easy horizontal scaling
- **Deployment**: Simplified deployment process
- **Development**: Consistent development environments

## Docker Fundamentals

### Understanding Images and Containers

```bash
# Pull an image
docker pull node:18-alpine

# List images
docker images

# Run a container
docker run -d --name my-app node:18-alpine

# List running containers
docker ps

# Stop a container
docker stop my-app

# Remove a container
docker rm my-app
```

## Dockerizing a Node.js Application

### 1. Basic Dockerfile

Create a `Dockerfile` for a Node.js app:

```dockerfile
# Use Node.js LTS Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start the application
CMD ["npm", "start"]
```

### 2. Optimized Multi-Stage Dockerfile

For production optimization:

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./

USER nextjs

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/server.js"]
```

### 3. .dockerignore File

Create `.dockerignore` to exclude unnecessary files:

```gitignore
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.nyc_output
coverage
.cache
dist
.DS_Store
*.log
```

## Building and Running Your Container

```bash
# Build the image
docker build -t my-node-app:latest .

# Run with environment variables
docker run -d \
  --name my-app \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  my-node-app:latest

# View logs
docker logs my-app

# Execute commands in running container
docker exec -it my-app sh
```

## Multi-Container Applications with Docker Compose

### Full-Stack Application Setup

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  # Frontend React App
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:5000
    depends_on:
      - backend
    volumes:
      - ./frontend:/app
      - /app/node_modules
    networks:
      - app-network

  # Backend Node.js API
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=development
      - PORT=5000
      - DATABASE_URL=mongodb://mongo:27017/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      - mongo
      - redis
    volumes:
      - ./backend:/app
      - /app/node_modules
    networks:
      - app-network

  # MongoDB Database
  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=password
      - MONGO_INITDB_DATABASE=myapp
    volumes:
      - mongo-data:/data/db
      - ./mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro
    networks:
      - app-network

  # Redis Cache
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    networks:
      - app-network

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - frontend
      - backend
    networks:
      - app-network

volumes:
  mongo-data:
  redis-data:

networks:
  app-network:
    driver: bridge
```

### Advanced Production Compose

For production with scaling and monitoring:

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.prod
    deploy:
      replicas: 2
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
    environment:
      - REACT_APP_API_URL=https://api.yourdomain.com
    networks:
      - web
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.frontend.rule=Host(\`yourdomain.com\`)"

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.prod
    deploy:
      replicas: 3
      restart_policy:
        condition: on-failure
    environment:
      - NODE_ENV=production
      - DATABASE_URL=mongodb://mongo-cluster:27017/myapp
    secrets:
      - jwt_secret
      - db_password
    networks:
      - web
      - backend
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  mongo:
    image: mongo:6
    deploy:
      placement:
        constraints:
          - node.role == manager
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD_FILE=/run/secrets/db_password
    secrets:
      - db_password
    volumes:
      - mongo-data:/data/db
    networks:
      - backend

  # Monitoring
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
    networks:
      - monitoring

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana-data:/var/lib/grafana
    networks:
      - monitoring

volumes:
  mongo-data:
  grafana-data:

networks:
  web:
    external: true
  backend:
    driver: overlay
  monitoring:
    driver: overlay

secrets:
  jwt_secret:
    external: true
  db_password:
    external: true
```

## Docker Commands Cheat Sheet

### Container Management

```bash
# Build and run
docker build -t app:tag .
docker run -d --name app -p 8080:80 app:tag

# Lifecycle
docker start app
docker stop app
docker restart app
docker pause app
docker unpause app

# Cleanup
docker rm app
docker rmi app:tag
docker system prune -a

# Logs and debugging
docker logs -f app
docker exec -it app bash
docker inspect app
```

### Docker Compose Commands

```bash
# Start services
docker-compose up -d

# Scale services
docker-compose up -d --scale backend=3

# View logs
docker-compose logs -f backend

# Execute commands
docker-compose exec backend npm test

# Stop and cleanup
docker-compose down
docker-compose down -v  # Remove volumes too
```

## Advanced Docker Patterns

### 1. Development vs Production Configurations

Create `docker-compose.override.yml` for development:

```yaml
version: '3.8'

services:
  backend:
    build:
      target: development
    volumes:
      - ./backend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - DEBUG=*
    command: npm run dev

  frontend:
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - FAST_REFRESH=true
    command: npm start
```

### 2. Health Checks and Dependencies

```dockerfile
# In Dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
```

```yaml
# In docker-compose.yml
services:
  backend:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/health"]
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 30s
    depends_on:
      mongo:
        condition: service_healthy
```

### 3. Security Best Practices

```dockerfile
# Use non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Install security updates
RUN apk update && apk upgrade

# Use specific versions
FROM node:18.17.0-alpine3.18

# Scan for vulnerabilities
RUN npm audit --audit-level high

USER nextjs
```

## Docker Networking and Volumes

### Custom Networks

```bash
# Create custom network
docker network create my-network

# Run containers on custom network
docker run -d --name app1 --network my-network nginx
docker run -d --name app2 --network my-network redis
```

### Volume Management

```bash
# Create named volume
docker volume create app-data

# Use volume in container
docker run -d -v app-data:/data nginx

# Backup volume
docker run --rm -v app-data:/source -v $(pwd):/backup ubuntu tar czf /backup/backup.tar.gz -C /source .
```

## Performance Optimization

### 1. Layer Caching

```dockerfile
# Bad - cache busted on any file change
COPY . .
RUN npm install

# Good - cache dependencies separately
COPY package*.json ./
RUN npm ci --only=production
COPY . .
```

### 2. Multi-stage Builds

```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runtime
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package*.json ./
CMD ["npm", "start"]
```

## Troubleshooting Common Issues

### 1. Container Won't Start

```bash
# Check logs
docker logs container-name

# Run interactively
docker run -it --rm image-name sh

# Check exit code
docker ps -a
```

### 2. Port Already in Use

```bash
# Find process using port
lsof -i :3000

# Use different port
docker run -p 3001:3000 app
```

### 3. Permission Issues

```dockerfile
# Fix permissions in Dockerfile
RUN chown -R node:node /app
USER node
```

## Monitoring and Logging

### Centralized Logging

```yaml
services:
  app:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  # ELK Stack for log aggregation
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.8.0
  
  logstash:
    image: docker.elastic.co/logstash/logstash:8.8.0
  
  kibana:
    image: docker.elastic.co/kibana/kibana:8.8.0
```

## Deployment Strategies

### 1. Blue-Green Deployment

```bash
# Deploy new version
docker-compose -f docker-compose.blue.yml up -d

# Test new version
curl http://blue.example.com/health

# Switch traffic
# Update load balancer configuration

# Cleanup old version
docker-compose -f docker-compose.green.yml down
```

### 2. Rolling Updates

```yaml
services:
  app:
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
        failure_action: rollback
```

Docker transforms the development and deployment experience by providing consistent, scalable, and portable application containers. Master these patterns and you'll be ready for modern containerized development!

## Next Steps

1. **Learn Kubernetes** for container orchestration at scale
2. **Explore CI/CD** integration with Docker
3. **Security scanning** with tools like Snyk or Trivy
4. **Performance monitoring** with Prometheus and Grafana
5. **Service mesh** technologies like Istio

# Stage 1: Build React App
FROM node:18 as build

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve React App using Nginx
FROM nginx:alpine

# Copy build output to Nginx root directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy Nginx configuration (use /etc/nginx/nginx.conf instead of conf.d/)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 8080 for Cloud Run compatibility
EXPOSE 8080

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

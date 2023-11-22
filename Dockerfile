# Use the official Node.js image as the base image
FROM node:18.17.0
# Set the working directory in the container
WORKDIR /app
# Copy package.json and package-lock.json to the container
COPY package*.json ./
# Install application dependencies
RUN rm -rf node_modules && npm install --frozen-lockfile && npm cache clean
# Copy application files to the container
COPY . .
# Expose the port on which the application will run
EXPOSE 5000
# Command to start the application
CMD ["node", "app.js"]
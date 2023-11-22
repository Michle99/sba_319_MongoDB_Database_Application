# Use Node.js as base image
FROM node:latest
# Create a directory express mongodb app
RUN mkdir -p /usr/src/app
# set working directory in the docker container
WORKDIR /usr/src/app
# Copy the package.json file dependencies from project
COPY package*.json /usr/src/app
# Install the dependencies
RUN npm install 
# Copy the sourc code of the express app
COPY . /usr/src/app
# Expose container port number
EXPOSE 5000
# Run express app in container
CMD ['node', 'run' 'app.js', 'dev', 'test']


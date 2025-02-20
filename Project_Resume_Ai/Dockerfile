# Use an official Node.js runtime as the base image
FROM node:18
# Set the working directory inside the container
WORKDIR /src
# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./
# Install dependencies
RUN npm install
COPY . .
# Expose the port the app runs on
EXPOSE 3000
# Start the application from the correct location
CMD ["npm", "run", "dev"]
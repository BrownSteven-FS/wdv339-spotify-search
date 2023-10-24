# Use the specified Node version with Alpine
FROM node:20.8.1-alpine3.18

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json first, for better caching
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 5000 (or whichever port your app uses)
EXPOSE 3001

# Start the application
CMD ["npm", "start"]

FROM node:20.8.1-alpine3.18
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json first, for better caching
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 3001
EXPOSE 3001

# Start the application
CMD ["npm",  "start"]

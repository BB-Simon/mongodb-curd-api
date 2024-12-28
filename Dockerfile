FROM node:alpine3.18

# Create app directory
WORKDIR /app

# Copy packsge json file
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose port
EXPOSE 5000


# Start the app
CMD ["npm", "start"]

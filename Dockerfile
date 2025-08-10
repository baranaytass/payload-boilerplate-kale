FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY pnpm-lock.yaml* ./
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
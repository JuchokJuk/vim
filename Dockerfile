# Base image: Node.js 18 (LTS)
FROM node:22-alpine3.19

# Set working directory in the container
WORKDIR /app

# Install pnpm globally using npm
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml (or pnpm-lock.json) to the container
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm with the frozen-lockfile option
RUN pnpm install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the SvelteKit application
RUN pnpm build

# Expose port 3000 (or any other port depending on your server configuration)
EXPOSE 3000

# Start the app in production mode
CMD ["node", "build"]

FROM node:22-alpine

WORKDIR /app

# Install pnpm
RUN corepack enable

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY apps/backend ./apps/backend

# Set working directory to backend
WORKDIR /app/apps/backend

# Expose port
EXPOSE 3000

# Start in development mode
CMD ["pnpm", "start:dev"]
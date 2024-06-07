FROM node:18-alpine AS builder

ARG CACHEBUST=1

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

RUN npm run prisma:generate

#RUN npm i -g prisma

RUN npm run build

# Expose the port that the application will listen on
#EXPOSE 8000

# Start the application
#CMD ["startup.sh"]

# 2nd step, to run migrations
FROM node:18-alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
# 👇 copy prisma directory
COPY --from=builder /app/src/database ./src/database

EXPOSE 8000

CMD [  "npm", "run", "start:migrate:prod" ]
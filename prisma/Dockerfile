# Use the official PostgreSQL image as the base image
FROM postgres:13

# Set the working directory to /app
WORKDIR /app

# Copy the .env file into the container
COPY ../.env /app/

# Expose port 5432
EXPOSE 5432

# Define environment variable
ENV POSTGRES_DB=filofax
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=123

# Specify the volume to store PostgreSQL data
VOLUME /var/lib/postgresql/data

# Command to run on container start
CMD ["postgres"]
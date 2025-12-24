# Maison Delamance Ecommerce Website.

## Steps to test it out on your machine.

1. Clone the repository.
>```bash
>git clone https://github.com/kakeetopius/maison-delamance.git maison-delamance
>cd maison_delamance
>```

2. Ensure docker and docker-compose is installed. If not use your preferred package manager.

3. Spin up the containers with the following. It might take some time to fetch the images used (apache-php and mysql) if not already available
>```bash
>docker compose up -d --build
>```

4. Visit the webiste at the following url
>```text
>http://localhost:8080
>```

5. After testing out, you can stop the containers with the following
> ```bash
>docker compose down
>```

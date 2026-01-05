# Dozentenverwaltungssystem

Dieser Backend läuft in Docker.

## Quick start

Zum schnellen Start führe auf deinem Server folgendes aus:

```
git clone
sudo docker compose up --build
```

## Development usage

```
npm install
npm run start
```

## Additional information

Damit der Server fürs Development funktioniert, muss eine Datenbank erstellt werden:

```
npx sequelize-cli db:create
```

Datenbank-Migrations testen:

```
npx sequelize-cli db:migrate
npx sequelize-cli db:migrate:undo
```

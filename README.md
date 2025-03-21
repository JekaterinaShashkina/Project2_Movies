# Movie API

REST API filmide, näitlejate ja kategooriate juhtimiseks 

## Tehnoloogiad

- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL

## Kuidas käivitada projekti

### installida dependencies

*npm install*

### luua .env file andmebaasi seadistusega

DB_HOST=localhost
DB_PORT=5432
DB_NAME=movies_db
DB_USER=postgres
DB_PASS=yourpassword

## Serveri käivitamine

*node index.js*

Server hakkab töötama **http://localhost:3000** aadressil

## API Routes

### Kategooriad

| Metood | URL | Kirjeldus |
|-------|-----|----------|
| `GET` | `/categories` | Saada kõik kategfooriad|
| `GET` | `/categories/:id` | Saada kategooria ID järgi|
| `POST` | `/categories` | Uue kategooria lisamine|
| `PUT` | `/categories/:id` | Uuendada kategooria info |
| `DELETE` | `/categories/:id` | Eemaldada kategooria |

### Filmid
| Metood | URL | Kirjeldus |
|-------|-----|----------|
| `GET` | `/movies` | Saada kõik filmid |
| `GET` | `/movies/:id` | Saada filmi ID järgi|
| `POST` | `/movies` | Lisada uue filmi |
| `PUT` | `/movies/:id` | Uuendada filmi info |
| `DELETE` | `/movies/:id` | Eemaldada filmi |

### Otsing
| Meetod | URL | Kirjeldus |
|-------|-----|----------|
| `GET` | `/search/movies/:title` | Filmi otsing pealkirja järgi.   |
| `GET` | `/search/actor/:actor` | Filmi otsing näitleja järgi. |
| `GET` | `/search/language/:language_id` | Filmi otsing keele järgi. 
| `GET` | `/search/category/:category_id` | Filmi otsing kategooria järgi.  
| `GET` | `/search/actors/:film_id` | Filmis osalenud näitlejate nimekirja saamine.  

## Võimalikud  vead

- *400 Bad Request* – Vigased sisendandmed
- *404 Not Found* – Andmeid ei leitud
- *500 Internal Server Error* – Serveri viga
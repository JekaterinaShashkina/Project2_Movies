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

### Näitlejad
| Metood | URL | Kirjeldus |
|-------|-----|----------|
| `GET` | `/actors` | Saada kõik näitlejad |
| `GET` | `/actors/:id` | Saada näitleja ID järgi|
| `POST` | `/actors` | Lisada uue näitleja |
| `PUT` | `/actors/:id` | Uuendada näitleja info |
| `DELETE` | `/actors/:id` | Eemaldada näitleja |

### Otsing
| Meetod | URL | Kirjeldus |
|-------|-----|----------|
| `GET` | `/search/movies/:title` | Filmi otsing pealkirja järgi.   |
| `GET` | `/search/actor/:actor` | Filmi otsing näitleja järgi. |
| `GET` | `/search/language/:language_id` | Filmi otsing keele järgi. 
| `GET` | `/search/category/:category_id` | Filmi otsing kategooria järgi.  
| `GET` | `/search/actors/:film_id` | Filmis osalenud näitlejate nimekirja saamine.  

## Pagineerimine
Pagineerimine töötab kui soovite saada kõik filmid ja kõik näitlejad
Päringud koos leheküljendusega võtavad vastu parameetreid **?page=** ja **?limit=**.

Vaikimisi, kui page ja limit pole määratud → kuvatakse esimene lehekülg 10 kirjetega.
Päringute näited:
**GET /movies** - Esimene lehekülg, 10 filmi (vaikimisi)
**GET /movies?page=2&limit=5** - Teine lehekülg, 5 filmi
**GET /actors?page=3&limit=20** - Kolmas lehekülg, 20 näitlejad 

## Võimalikud  vead

- *400 Bad Request* – Vigased sisendandmed
- *404 Not Found* – Andmeid ei leitud
- *500 Internal Server Error* – Serveri viga
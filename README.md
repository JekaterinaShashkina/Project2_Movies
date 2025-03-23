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

- DB_HOST=host
- DB_PORT=5432
- DB_NAME=database name (movies)
- DB_USERNAME=postgres username
- DB_PASS=yourpassword

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

### Keeled
| Metood | URL | Kirjeldus |
|-------|-----|----------|
| `GET` | `/language` | Saada kõik keeled |
| `GET` | `/language/:id` | Saada keel ID järgi|
| `POST` | `/language` | Lisada uue keele |
| `PUT` | `/language/:id` | Uuendada keele info |
| `DELETE` | `/language/:id` | Eemaldada keel |

### Otsing
| Meetod | URL | Kirjeldus |
|-------|-----|----------|
| `GET` | `/search/movies/:title` | Filmi otsing pealkirja järgi.   |
| `GET` | `/search/actor/:actor` | Filmi otsing näitleja järgi. |
| `GET` | `/search/language/:language_id` | Filmi otsing keele järgi. 
| `GET` | `/search/category/:category_id` | Filmi otsing kategooria järgi.  
| `GET` | `/search/actors/:film_id` | Filmis osalenud näitlejate nimekirja saamine.  

## Autentimine ja autoriseerimine
API on kaitstud autoriseerimisega ja toetab kasutajate autentimist JSON Web Tokeni (JWT) abil.

### Kasutaja registreerimine

**POST /auth/register**

### Sisselogimine (login)
**POST /auth/login**

Kui parool on korrektne, tagastab:
    {
    "message": "Logged in",
    "token": "<JWT-token>"
    }

### Kaitstud päringute tegemine
Et pääseda ligi kaitstud API otspunktidele (nt filmide lisamine, kustutamine vms), tuleb lisada JWT token päisesse:

Näide (Thunder Client / Postman): 
*Authorization: Bearer <sinu_token_siia>* 

## Pagineerimine
Pagineerimine töötab kui soovite saada kõik filmid ja kõik näitlejad.

Päringud koos leheküljendusega võtavad vastu parameetreid **"?page="** ja **"?limit="**.

Vaikimisi, kui page ja limit pole määratud → kuvatakse esimene lehekülg 10 kirjetega.

Päringute näited:
- `GET /movies` - Esimene lehekülg, 10 filmi (vaikimisi)
- `GET /movies?page=2&limit=5` - Teine lehekülg, 5 filmi
- `GET /actors?page=3&limit=20` - Kolmas lehekülg, 20 näitlejad 

## Sorteerimine
Võimalus sorteerimist **movie** ja **actor** tunnuste jaoks

Vaikimisi sorteeritakse filmid ja näitlejad id järgi.

Filmid saab sorteerida 'title', 'release_year' ja 'rating' järgi.

Näitlejad saab sorteerida 'first_name' ja 'last_name' järgi.

Saab valida järjekorda kas 'DESC' või 'ASC'

Päringute näited:
- `/movies?sortBy=title&order=asc` - filmide sorteerimine pealkirjate järgi
- `/movies?sortBy=release_year&order=desc` - filmide sorteerimise väljalaske aastate järgi kahenevas järjekorras
- `/actors?sortBy=first_name `- näitlejate sorteerimine eesnimede järgi 
- `/movies?page=2&limit=5&sortBy=rating&order=asc `- filmide pagineerimine ja sorteerimine reitingu järgi

## Võimalikud  vead

- *400 Bad Request* – Vigased sisendandmed
- *404 Not Found* – Andmeid ei leitud
- *500 Internal Server Error* – Serveri viga
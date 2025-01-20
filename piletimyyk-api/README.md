# Piletimüügi Rakendus

## Kirjeldus
Piletimüügi rakendus, mis võimaldab kasutajatel osta ja hallata pileteid.

## Kuidas käivitada
1. Ava terminal projektikaustas.
2. Kasuta käsku `npm start`, et käivitada backend ja frontend samaaegselt.

## Tehnoloogiad
- **Node.js**: Serveri poole arendamiseks.
- **Express**: Veebiraamistik.
- **MySQL**: Andmebaasi haldamiseks.
- 
## Andmebaasi Struktuur
### Tabelid
- **User**
  - `user_id` (integer, PK)
  - `first_name` (varchar)
  - `last_name` (varchar)
  - `email` (varchar(100), UNIQUE)

- **Event**
  - `event_id` (integer, PK)
  - `title` (varchar(100))
  - `description` (text)
  - `date` (date)
  - `time` (time)
  - `price` (decimal(10,2))
  - `location` (text)

- **Ticket**
  - `ticket_id` (integer, PK)
  - `event_id` (integer, FK)
  - `user_id` (integer, FK)
  - `purchase_date` (timestamp)
  - `quantity` (integer)

## Meeskonna Ressursid
- [API dokumentatsioon](https://studio.apicur.io/apis/113095/)
- [Trello projekt](https://trello.com/b/436EYyWL/)

![image](https://github.com/user-attachments/assets/60c35213-93a3-4a18-bc0a-b2c2855cda8c)

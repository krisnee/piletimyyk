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
- **Body-parser**: HTTP päringute töötlemiseks.
- **CORS**: Erinevate domeenide vahelise suhtluse lubamiseks.

## Andmebaasi Struktuur
### Tabelid
- **User**
  - `id` (PK)
  - `first_name` (varchar(50))
  - `last_name` (varchar(50))
  - `email` (varchar(50))
  - `password_hash` (string)
  - `role` (enum: organizer, user)

- **Event**
  - `id` (PK)
  - `user_id` (FK)
  - `title` (text)
  - `description` (text)
  - `location` (text)
  - `event_date` (date)
  - `start_time` (time)
  - `end_time` (time)

- **Ticket**
  - `id` (PK)
  - `event_id` (FK)
  - `user_id` (FK)
  - `price` (numeric)
  - `qr_code` (string)
  - `purchase_date` (timestamp)

## Kuidas andmebaasi seadistada
1. Loo MySQL andmebaas nimega `piletimyyk`.
2. Käivita järgmised SQL käsud, et luua vajalikud tabelid:
   ```sql
   CREATE TABLE User (
       id INT AUTO_INCREMENT PRIMARY KEY,
       first_name VARCHAR(50),
       last_name VARCHAR(50),
       email VARCHAR(50),
       password_hash VARCHAR(255),
       role ENUM('organizer', 'user')
   );

   CREATE TABLE Event (
       id INT AUTO_INCREMENT PRIMARY KEY,
       user_id INT,
       title TEXT,
       description TEXT,
       location TEXT,
       event_date DATE,
       start_time TIME,
       end_time TIME,
       FOREIGN KEY (user_id) REFERENCES User(id)
   );

   CREATE TABLE Ticket (
       id INT AUTO_INCREMENT PRIMARY KEY,
       event_id INT,
       user_id INT,
       price NUMERIC,
       qr_code VARCHAR(255),
       purchase_date TIMESTAMP,
       FOREIGN KEY (event_id) REFERENCES Event(id),
       FOREIGN KEY (user_id) REFERENCES User(id)
   );
   ```

## Meeskonna Ressursid
- [API dokumentatsioon](https://studio.apicur.io/apis/113095/)
- [Trello projekt](https://trello.com/b/436EYyWL/)

![image](https://github.com/user-attachments/assets/8366eaa2-5b77-49bf-8df3-3c50379f741c)


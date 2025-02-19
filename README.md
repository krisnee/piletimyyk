# Piletimyyk application

## Description
Ticket sales application that allows users to purchase and manage tickets.

## How to run
1. Open terminal in project folder
2. Use command `npm start` to run backend and frontend simultaneously

## Technologies
- **Node.js**: For server-side development.
- **Express**: Web framework.
- **MariaDB**: For database management.
- 
## Database structure
### Tables
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

## Team resources
- [API documentation](https://studio.apicur.io/preview?aid=113095)
- [Trello project](https://trello.com/b/436EYyWL/)

![image](https://github.com/user-attachments/assets/33c0a115-b1a5-4d42-a1cc-9fd39580cdc7)

## Routes

| HTTP Method | URL         | Request Body                   | Success status  | Error status  | Description        |
| ----------- | ----------- | ------------------------------ | --------------- | ------------- | ------------------ |
| GET         | `/`         |                                | 200             | 404           | Check if user is logged in and return Home page        |
| POST        | `/signUp`   | {email, password}              | 200             | 401           | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session          |
| POST        | `/login`   | {userName, email, password}    | 201             | 404            | Checks if fields not empty (422) and user not exists (404),  and if password matches (404), then stores user in session                  |
| POST        | `/logout`   | {empty}                       | 204             | 400            | logout the user                  |



## ER Diagram:
![ERD](https://user-images.githubusercontent.com/92247926/146616334-5b9af3b9-c8a3-4ca2-94f1-db2f15e40302.png)

## UML Diagram:
![Screenshot (307)](https://user-images.githubusercontent.com/92247926/146642620-f8a25529-f3d8-4575-b88b-b5f100884a1e.png)

## Routes

| HTTP Method | URL                | Request Body                               | Success status  | Error status  | Description       |
| ----------- | ------------------ | ----------------------------------------- | --------------- | ------------- | ------------------ |
| POST        | `/signUp`          | {email, password}                         | 200             | 401           | Checks if fields not empty and user not exists, then create user with encrypted password, and store user in session   |
| POST        | `/login`           | {userName, email, password}               | 201             | 404           | Checks if fields not empty  and user not exists, and if password matches (404), then stores user in session           |
| POST        | `/logout`          | {empty}                                   | 204             | 400           | logout the user               |
| GET         | `/getAllUsers`     |                                           | 200             | 400           | Get all users                 |
| POST        | `/addPost`         | {title, images, description, isDel, date} | 201             | 400           | service provider create posts|
| PUT         | `/updPost`         | {title, images, description}              | 200             | 400           | service provider edit post                   |
| DELETE      | `/delPost`         | {empty}                                   | 200             | 400           | service provider delete post               |
| GET         | `/getAllPosts`     |                                           | 200             | 400           | all get all posts         |
| GET         | `/getOnePost`      |  {id}                                     | 200             | 400           | all get one post by id    |
| POST        | `/createRole`      |  {role, permission}                       | 201             | 404           | create role (admin, service provider, users|
| GET         | `/getRoles`        |                                           | 200             | 400           | admin get all roles    |
| POST        | `/addAppointment`  | {Date, user, isDel}                       | 201             | 400           | add appointment   |
| PUT         | `/updAppointment`  | {id}                                      | 200             | 400           | update appointment   | 
| DELETE      | `/delAppointment`  | {id}                                      | 200             | 400           | delete appointment   | 
| GET         | `/getAppointment`  |                                           | 200             | 400           | service provider get appointment   | 
| POST        | `/addInquiry`      | {title, description, Date}                | 201             | 404           | All add inquiry or quistion   | 
| PUT         | `/updInquiry`      |   {title, description}                    | 200             | 400           |  update  inquiry or quistion   | 
| DELETE      | `/delInquiry`      |   {id}                                    | 200             | 400           |  delete  inquiry or quistion   | 
| GET         | `/getInquiries`    |                                           | 200             | 400           |  Get all inquiry or quistion   | 
| GET         | `/getOneInquiry`   |   {id}                                    | 200             | 400           |  Get one inquiry or quistion by id   | 












## ER Diagram:
![ERD](https://user-images.githubusercontent.com/92247926/146616334-5b9af3b9-c8a3-4ca2-94f1-db2f15e40302.png)

## UML Diagram:
![Screenshot (307)](https://user-images.githubusercontent.com/92247926/146642620-f8a25529-f3d8-4575-b88b-b5f100884a1e.png)

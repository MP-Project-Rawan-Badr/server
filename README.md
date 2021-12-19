<div align="center">

 <h2> project name: Wmeedh  :high_brightness: </h2>
<h4> It is a backend for a wmeedh site <h4/>
 
</div>

<div>

<h2> :pencil: start server by use: </h2>

- ![Node.js](https://img.shields.io/badge/Node.js-404137?style=for-the-badge&logo=node.js&logoColor=white)   
- ![Express.js](https://img.shields.io/badge/Express.js-ffffff?style=for-the-badge&logo=express.js&logoColor=black)
- ![mongoDB](https://img.shields.io/badge/mongoDB-43853D?style=for-the-badge&logo=mongodb&logoColor=white)
- ![Postman](https://img.shields.io/badge/Postman-ff9933?style=for-the-badge&logo=postman&logoColor=white)

</div>

<br/>

# :paperclip: Links:

### :heavy_check_mark: `Trello:`
https://trello.com/b/p0lIavji/mprawanbadr

### :heavy_check_mark: `Slides:`
https://slides

### :heavy_check_mark: `Client Repositories:`
https://github.com/MP-Project-Rawan-Badr/client/blob/main/README.md
### :heavy_check_mark: `Deploy:`
https://deploy

<br/>


 <h2> :pencil: library </h2>

- ![express](https://img.shields.io/badge/express-ffffff?style=for-the-badge&logo=express&logoColor=black)
- ![cors](https://img.shields.io/badge/cors-ffcccc?style=for-the-badge&logo=cors&logoColor=white)
- ![morgan](https://img.shields.io/badge/morgan-dca3a3?style=for-the-badge&logo=morgan&logoColor=white)
- ![dotenv](https://img.shields.io/badge/dotenv-black?style=for-the-badge&logo=dotenv&logoColor=white)
- ![mongoose](https://img.shields.io/badge/mongoose-43853D?style=for-the-badge&logo=mongoose&logoColor=white)
- ![bcrypt](https://img.shields.io/badge/bcrypt-943838?style=for-the-badge&logo=bcrypt&logoColor=white)
- ![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-f1dada?style=for-the-badge&logo=jsonwebtoken&logoColor=white)



## :file_folder: Routes

| HTTP Method | URL                | Request Body                               | Success status  | Error status  | Description       |
| ----------- | ------------------ | ----------------------------------------- | --------------- | ------------- | ------------------ |
| POST        | `/signUp`          | {email, password}                         | 201             | 400           | Checks if fields not empty and user not exists, then create user with encrypted password, and store user in session   |
| POST        | `/login`           | {userName, email, password}               | 201             | 404           | Checks if fields not empty  and user not exists, and if password matches (404), then stores user in session           |
| POST        | `/logout`          | {empty}                                   | 200             | 400           | logout the user               |
| GET         | `/getAllUsers`     |                                           | 200             | 400           | Get all users                 |
| POST        | `/addPost`         | {title, images, description, isDel, date} | 201             | 400           | service provider create posts|
| PUT         | `/updPost`         | {title, images, description}              | 200             | 400           | service provider edit post                   |
| DELETE      | `/delPost`         | {empty}                                   | 200             | 400           | service provider delete post               |
| GET         | `/getAllPosts`     |                                           | 200             | 400           | all get all posts         |
| GET         | `/getOnePost`      |  {id}                                     | 200             | 400           | all get one post by id    |
| POST        | `/createRole`      |  {role, permission}                       | 201             | 400           | create role (admin, service provider, users|
| GET         | `/getRoles`        |                                           | 200             | 400           | admin get all roles    |
| POST        | `/addAppointment`  | {Date, user, isDel}                       | 201             | 400           | add appointment   |
| PUT         | `/updAppointment`  | {id}                                      | 200             | 400           | update appointment   | 
| DELETE      | `/delAppointment`  | {id}                                      | 200             | 400           | delete appointment   | 
| GET         | `/getAppointment`  |                                           | 200             | 400           | service provider get appointment   | 
| POST        | `/addInquiry`      | {title, description, Date}                | 201             | 400           | All add inquiry or quistion   | 
| PUT         | `/updInquiry`      |   {title, description}                    | 200             | 400           |  update  inquiry or quistion   | 
| DELETE      | `/delInquiry`      |   {id}                                    | 200             | 400           |  delete  inquiry or quistion   | 
| GET         | `/getInquiries`    |                                           | 200             | 400           |  Get all inquiry or quistion   | 
| GET         | `/getOneInquiry`   |   {id}                                    | 200             | 400           |  Get one inquiry or quistion by id   | 

## :triangular_ruler: UML Diagram:
![UML_Dia_backend_m](https://user-images.githubusercontent.com/92247926/146682123-785f2836-ca08-4250-b02e-973c90646e8c.png)

<br/>

## :file_folder: Models

- :bookmark: roles model

| key        | type   | options          | default value |
| -----------| ------ | ---------------- | ------------- |
| role       | String | required, unique | n/a           |
| permission | Array  | required         | n/a           |



- :bookmark: user model

| key        | type            | options          | default value |
| ---------- | --------------- | ---------------- | ------------- |
| userName   | String          | required, unique | n/a           |
| email      | String          | required, unique | n/a           |
| password   | String          | required         | n/a           |
| role       | Schema <role>   | required         | n/a           |
| isDel      | Boolean         | n/a              | false         |

  
- :bookmark: post model

| key        | type            | options          | default value |
| ---------- | --------------- | ---------------- | ------------- |
| Title      | String          | required         | n/a           |
| Images     | Array           | required         | n/a           |
| Description| String          | required         | n/a           |
| isDel      | Boolean         | n/a              | false         |
| Date       | new Date        | required         | n/a           |
| user       | Schema <user>   | required         | n/a           |
  
 - :bookmark: inquiry model

| key         | type            | options          | default value |
| ----------  | --------------- | ---------------- | ------------- |
| Title       | String          | required         | n/a           |
| Descripssion| String          | required         | n/a           |
| isDel       | Boolean         | n/a              | false         |
| Date       | new Date        | required         | n/a           |
| user       | Schema <user>   | required         | n/a           |

 - :bookmark: appointment model

| key        | type            | options          | default value |
| ---------- | --------------- | ---------------- | ------------- |
| Date       | new Date        | required         | n/a           |
| user       | Schema <user>   | required         | n/a           |
| isDel      | Boolean         | n/a              | false         |





## :triangular_ruler: ER Diagram:
![ERD](https://user-images.githubusercontent.com/92247926/146616334-5b9af3b9-c8a3-4ca2-94f1-db2f15e40302.png)


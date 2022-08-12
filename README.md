## Welcome to Drop In

### Drop In is an AllTrails clone, but instead of trails it features skateparks.

#### I personally use AllTrails to locate and look up information on trails, and I thought 'this would be a cool idea for skateparks!', and so the idea was born. This is my second solo project I have completed so far. I have put a lot of time and care into this project and I am really proud of it. I hope you enjoy the site as well!

#### Check out the live site [here](https://drop-in-skate.herokuapp.com/)!

## Technologies Used
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

## Sneak Peak
![Homepage](https://user-images.githubusercontent.com/46910262/184025061-fd9d2cd1-5a3c-430d-8365-6106c222b6cf.png)
![Explore page](https://user-images.githubusercontent.com/46910262/184025144-278eb3a7-1e4f-4125-abcc-b838230bd723.png)

## Local Setup
1. Clone this repository

   ```
   git clone https://github.com/jay-bean/DropIn
   ```

2. Install dependencies

   ``` npm install ``` in ``` ./backend```
   ``` npm install ``` in ``` ./frontend```

3. Create a **.env** file based on the example with proper settings for your
   development environment
   
4. Setup your PostgreSQL user and password, and make sure it matches your **.env** file

5. Create, migrate, and seed your database 

   ```
   npx dotenv sequelize db:create
   ```

   ```
   npx dotenv sequelize db:migrate
   ```

   ```
   npx dotenv sequelize db:seed:all
   ```
   
   ``` npm start ``` in both back and frontend
 
6. If browser does not open right away, navigate to localhost:3000 and enjoy!

### Future Features
* Thumbnails when adding photos to skateparks
* The ability to add and delete photos when editing a skatepark

### Index
* [Feature List](https://github.com/jay-bean/DropIn/wiki/feature-list)
* [DataBase Schema](https://github.com/jay-bean/DropIn/wiki/database-schema)
* [Frontend Routes Document](https://github.com/jay-bean/DropIn/wiki/front-end-routes)
* [API Routes Document](https://github.com/jay-bean/DropIn/wiki/api-documentation)
* [User Stories](https://github.com/jay-bean/DropIn/wiki/user-stories)
* [State Shape](https://github.com/jay-bean/DropIn/wiki/State-Shape)
* [Wireframes](https://github.com/jay-bean/DropIn/wiki/Wireframes)

1. nyalakan xampp 
2. npm install
3. buat database dengan nama "hpai"
4. ganti file example.env menjadi .env
5. buka cmd

- command migration : npx sequelize-cli db:migrate
- command seeder : npx sequelize-cli db:seed

6. npm run start
7.buka postman
8.import file di folder data_postman
9. lakukan pengetesan

unit test
-untuk unit test : di command : npm test
-untuk test delete pastikan id dari user yang di delete ada di database
-unuk test add pastikan email yang di input belum ada di database
-untuk test yang memerlukan login pastikan user id dan role nya ada di database
-unuk test login pastikan email dan password benar dan user ada di database

*note
-DFD dan ERD ada di dalam folder documentation

Terimakasih.

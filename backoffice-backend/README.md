# Sebastian viajes backoffice backend
clientes, parametros, personal, proveedores
## Usage:
UPDATE `clientes` SET `EMail`='tomas80868086@gmail.com' WHERE EMail != '';
UPDATE `parametros` SET `EMail`='tomas80868086@gmail.com' WHERE EMail != '';
UPDATE `parametros` SET `EMail2`='tomas80868086@gmail.com' WHERE EMail != '';
UPDATE `personal` SET `EMail`='tomas80868086@gmail.com' WHERE EMail != '';
UPDATE `proveedores` SET `EMail`='tomas80868086@gmail.com' WHERE EMail != '';
You should copy `.env.sample` to `.env` and then:

`npm run dev` - Run the development server.

`npm test` - Run tests.

`npm run test:watch` - Run tests when files update.

`npm run build` - Builds the server.

`npm start` - Runs the server.

## Run python script
pip install mysql-connector-python
pip install python-dotenv

#Podemos usar la imagen node 20 si quieren, es la ultima LTS
FROM node:22-alpine

#Carpeta clasica para guardar los archivos
WORKDIR /usr/src/app 

#Copia clasica de package.json
COPY package*.json ./

RUN npm install

# Copiamos el resto del proyecto al contenedor
COPY . .

#Puerto para Nest, despues definimos si va a ser 3000 u otro
EXPOSE 3000

# Comando por defecto para el contenedor
CMD ["npm", "run", "start:dev"]

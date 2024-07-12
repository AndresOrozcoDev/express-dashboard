# Utilizar una imagen base de Node.js
FROM node:14

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto que utiliza la aplicación
EXPOSE 80

# Comando para ejecutar la aplicación
CMD ["npm", "run", "dev"]
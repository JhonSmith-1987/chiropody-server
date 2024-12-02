# Utiliza una imagen base de Node.js
FROM node:20.18.0

# Establece el directorio de trabajo en la carpeta de la aplicación
WORKDIR /jmjrr

# borramos node mudules
RUN rm -rf node_modules package-lock.json

# Copia todos los archivos del proyecto al directorio de trabajo
COPY . /jmjrr

# Instala las dependencias del proyecto
RUN npm install

# Compila el código TypeScript a JavaScript
RUN npm run build

# Expon el puerto 4000 en el contenedor
EXPOSE 4000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
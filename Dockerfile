# Usar uma imagem base oficial do Node.js
FROM node:20 as base

# Definir o diretório de trabalho no container
WORKDIR /usr/src/app

# Copiar os arquivos package.json e package-lock.json para o container
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código para o container
COPY . .

# Expor a porta que a aplicação vai rodar
EXPOSE 3000

# Comando padrão para rodar a aplicação em produção
CMD ["npm", "start"]

# Estágio de teste
FROM base as test
ENV NODE_ENV=test
CMD ["npm", "test"]

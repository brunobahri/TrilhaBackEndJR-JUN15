# Usar uma imagem base oficial do Node.js
FROM node:20

# Definir o diretório de trabalho no container
WORKDIR /usr/src/app

# Copiar os arquivos package.json e package-lock.json para o container
COPY package*.json ./

# Instalar as dependências
RUN npm install --production

# Copiar o restante do código para o container
COPY . .

# Expor a porta que a aplicação vai rodar
EXPOSE 3000

# Comando padrão para rodar a aplicação em produção
CMD ["npm", "start"]

# Comando específico para testes (remova ou comente esta parte)
# FROM node:20 as test
# ENV NODE_ENV=test
# CMD ["npm", "test"]

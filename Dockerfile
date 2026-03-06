# Build Stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production Stage
FROM nginx:alpine
# Copia o build do Vite
COPY --from=build /app/dist /usr/share/nginx/html
# Configuração básica do Nginx para SPA
COPY <<-"EOT" /etc/nginx/conf.d/default.conf
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOT
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

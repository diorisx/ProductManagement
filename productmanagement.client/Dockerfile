FROM node:latest AS build

WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install
RUN npm run build


FROM nginx:latest
COPY --from=build /usr/local/app/dist/productmanagement.client/browser /usr/share/nginx/html
EXPOSE 80

# docker build -t productmanagement.client .
# docker run -p 4200:80 productmanagement.client
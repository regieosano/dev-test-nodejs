FROM node:14

# Create app directory
WORKDIR /usr/src/index

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

ARG buildtime_OCPKEY=cc238828849d4089b92686d4b25bd990
ENV OCPKEY=$buildtime_OCPKEY

ARG buildtime_SsoApi=ottdevapi.azure-api.net
ENV SsoApi=$buildtime_SsoApi


# expose 3000
EXPOSE 8888
CMD [ "npm", "start" ]
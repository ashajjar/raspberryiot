## Angular2 Express for RaspberryIOT

- Angular 2 ( 2.x )
- ExpressJS ( 4.x - with compression )
- Webpack ( angular-cli )


## Concepts

- Advanced routing

## Install / Development

```bash
git clone https://github.com/ssunils/raspberryiot.git

# Install dependencies
npm install

# start client / Angular App
npm run start:client


# start server / NodeJs App
npm run start:server

# Client url: http://localhost:4200
# Application ( epxress ) API: http://localhost:4300
```

## IOT Certificates location

place your IOT certificates in the 'cert' directory in root
```bash
# Naming convention

 - certificate.pem.crt
 - private.pem.key
 - root-CA.crt
 
```
## Build / Production

```bash

npm run build

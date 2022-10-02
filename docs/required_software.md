# Getting Started

## Installing Required Software
- Install Node.js version 14.17.5 (LTS) or 16.8.0 (Latest)
- Install browsersync by running
```console
$ npm install browser-sync
```
- Install esm by running 
```console
$ npm install esm
```
- Install Express.js by running
```console
$ npm install express
```
- Install md5 by running
```console
$ npm install md5
```
- Install better-sqlite by running
```console
$ npm install better-sqlite3
```

# Starting the Game
- To start, run the following command in one terminal to start the server
```console
$ node -r esm server.js
```
- In a separate terminal, run the following command
```console
$ npx browser-sync start -sw
```
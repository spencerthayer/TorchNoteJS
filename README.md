![TorchNoteJS](/blob/master/public/img/torchchat-logo.png?raw=true "TorchNoteJS") [![solarized dualmode](https://github.com/altercation/solarized/raw/master/img/solarized-yinyang.png)]
[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/spencerthayer/TorchNoteJS)
===========

An end-to-end encrypted (E2EE) client-side chat using Node.js, Express, Socket.io and CryptoJS.

### Usage


- Install Node.js (http://howtonode.org/how-to-install-nodejs)
- Clone the project:
```sh
git clone http://github.com/spencerthayer/TorchNoteJS.git
```
- Install TorchNoteJS dependencies:
```sh
npm install
```
- Start the TorchNoteJS server: 
```sh
node server.js
```
- Deploy the TorchNoteJS server to Heroku: 
```sh
heroku create;git add .;git push heroku master;heroku restart;heroku open;heroku logs -t;
```
![TorchNoteJS](https://raw.githubusercontent.com/spencerthayer/TorchNoteJS/master/public/img/torchchat-logo.png?raw=true "TorchNoteJS") [![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/spencerthayer/TorchNoteJS)

=========== 

A single use end-to-end encrypted (E2EE) client-side chat using Node.js, Express, Socket.io and CryptoJS. 

###What?


The idea behind TorchNoteJS is that any sensative end-to-end conversation should be encrypted from both the server or anyone else. Yet given a long enough timeline any crypto system is vulnerable to exploitation.

TorchNoteJS tries to alievate this by only existing when you need it.

When you need to have a sensative conversation online deploy a new TorchNoteJS app to Heroko. Once you've finished communicatidng simply elete the app from the Heroku GUI and you're done!

##Usage

- Discretely share the URL with your contacts using a private self destructing note services like [NoteDip](http://www.notedip.com/) or [Privnote](https://privnote.com/).
- Share the **Pass Phrase** with your contacts 

##Installation 

####Easy way:
- [Create a Heroku account](https://id.heroku.com/signup)
- Click "[Deploy to Heroku](https://heroku.com/deploy?template=https://github.com/spencerthayer/TorchNoteJS)" to build the app.
- If you would like add an optional name, the default random name is a little more secure, and then click `Deploy for Free`.
- There will then be a build phase with a **red**/**green** or **pass**/**fail** monitor. *If your build fails please contact [me@spencerthayer.com](mailto:me@spencerthayer.com).*
- Once your app is built on Heroku click the `View it` at the bottom to open the chat app.

####Hard way:
- [Install Node.js](http://howtonode.org/how-to-install-nodejs)
- Clone the project:
```sh git clone http://github.com/spencerthayer/TorchNoteJS.git```
- Install TorchNoteJS dependencies:
```sh npm install```
- Run local test:
```sh open http://localhost:3700;npm start;```
- Deploy the TorchNoteJS server to Heroku:
```sh heroku create;git add .;git push heroku master;heroku restart;heroku open;heroku logs -t; ```
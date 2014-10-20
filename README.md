![TorchNoteJS](https://raw.githubusercontent.com/spencerthayer/TorchNoteJS/master/public/img/torchchat-logo.png?raw=true "TorchNoteJS")

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/spencerthayer/TorchNoteJS)

=========== 

A single use end-to-end encrypted (E2EE) client-side chat using Node.js, Express, Socket.io and CryptoJS. 

#What?
The goal behind any EE2E chat is that all sensitive communication should be encrypted from both the server and everyone else who does not have the *passphrase*. The problem with most encrypted chat is that given a long enough timeline anything online is vulnerable to exploitation.

TorchNoteJS tries to alleviate this by only running when you need it.

When sensitive communication is necessary simply deploy a new TorchNoteJS app to Heroko and delete the app using the Heroku GUI when done.


##Installation 

###Easy way:
- [Create a Heroku account](https://id.heroku.com/signup)
- Click "[Deploy to Heroku](https://heroku.com/deploy?template=https://github.com/spencerthayer/TorchNoteJS)" to build the app.
- If you would like add an optional name, the default random name is a little more secure, and then click `Deploy for Free`.
- There will then be a build phase with a **red/green** or **pass/fail** monitor.
 - *If your build fails please contact [me@spencerthayer.com](mailto:me@spencerthayer.com).*
- Once your app is built on Heroku click the `View it` at the bottom. This will open your app's new URL.
- Please see **usage** instructions for further details.

###Hard way:
- [Install Node.js](http://howtonode.org/how-to-install-nodejs)
- Clone the project:
```sh
git clone http://github.com/spencerthayer/TorchNoteJS.git
```
- Install TorchNoteJS dependencies:
```sh
npm install
```
- Run local test:
```sh
open http://localhost:3700;npm start;
```
- Deploy the TorchNoteJS server to Heroku:
```sh
heroku create;git add .;git push heroku master;heroku restart;heroku open;heroku logs -t;
```
- **PROTIP:** The final command `heroku open;heroku logs -t;` starts the app and a running log in the terminal window. This allows you to monitor all I/O data passed by Heroku. If you know what you're looking for, you should be able to watch out for any suspect traffic.
- Please see **usage** instructions for further details.

##Usage
- Discretely share the app URL with your contacts using private self destructing note services like [TMWSD](https://xn--uih.ws/), [Privnote](https://privnote.com/) or [OneShare](https://oneshar.es/create).
- Please do not share the passphrase with your contacts online.

####Common sense passphrase tips:
- Don't ever leave the passphrase blank or keep its default value.
- Don't use the same passphrase twice.
- SERIOUSLY, DO NOT REUSE A PASSPHRASE.
- Don't use something shared on social media, such as Facebook or Twitter.
- Don't use a sample passphrase (such as those below).
- *Be creative.* The best passphrase is one that has never been used before.

####Passphrase tips and suggestions:
- Consider a passphrase of several (5 or more) random words strung together, e.g. "*strainer walking trusty comic giraffe*."
- Make up a sentence that is relevant to you but is stated in such a way that it is not easily guessable, e.g., "*jazz is a passion, pizza too*."
- Base your password on things relevant to you, but not easily discoverable.
- Consider using passphrase strengtheners like: broken grammar, incomplete words, uncommonly misspelled words or number and letter substitutions.

####Complex Passphrase Pro-Tips:
(COMING SOON)

####Passphrases to avoid:
- Common dictionary words
- Sequential letters or numbers (e.g. 1234567890, abcdefghij, qwertyuiop)
- Trivial passwords (e.g. password, passwd,mypassword,p@ssw0rd)
- Easily discoverable personal data (e.g., netID, names, birthday, address, pets)

## Deletion
(COMING SOON)

##Questions
####Isn't Javascript supposed to have weak crypto services?
Yeah it does. Totally. No one here is going to argue that NodeJS is better at security and encryption than SSL, except for when it isn't, *cough [Heartbleed](http://heartbleed.com/)*. Nor am I interested in a debate about how NodeJS cannot compete with many of the more robust server-side languages when it comes to security. No duh!

####So why would I use TorchNoteJS?
Those other solutions **cost money**, are **complicated to develop** and can't be turned on at the drop of a hat. TorchNoteJS is a free solution that is very easy to deploy and more importantly permanently delete.

####Meh, why not just use ... ?
Yes, there are other solutions for secure EE2E and I suggest you use them if you believe this application is not sufficient. If you do find a legitimate reason to be suspect of TorchNoteJS please create an issue because I really don't want to promote something that is broken.
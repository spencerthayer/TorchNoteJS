[![TorchNoteJS](https://raw.githubusercontent.com/spencerthayer/TorchNoteJS/master/public/img/torchchat-logo.png?raw=true "TorchNoteJS")](http://torchnote.heroku.com)

[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/spencerthayer/TorchNoteJS)
[![Dependencies-Status](https://david-dm.org/spencerthayer/TorchNoteJS.png)](https://david-dm.org/spencerthayer/TorchNoteJS)
[![Build-Status](https://travis-ci.org/spencerthayer/TorchNoteJS.svg?branch=master)](http://travis-ci.org/spencerthayer/TorchNoteJS)


[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/spencerthayer/TorchNoteJS)

#TorchNoteJS 0.0.12 [DEMO](http://torchnote.heroku.com)
A single use end-to-end encrypted (E2EE) client-side chat using Node.js, Express, Socket.io and CryptoJS.

##Coming with 0.0.13
> Better information. Alerts for user joins and exists. Hide bot obfuscation.

##New to 0.0.12
> BOTS! Now chat bots will inject random AES code into the chat to obfuscate the actual conversation.

##New to 0.0.12
> INCREASED SECURITY! Removed CDN dependencies. All scripts are localized increasing security. All EAS data origin is checked. Minor improvement but will be important when I introduce Bots next update.


##Quick explanation:
The correct way to use TorchNoteJS is by creating and hosting your own Heroku apps. Once the app is built the next step is to send the URL to your recipients by using a TMWSD application. Ensure you are anonymizing your connection by using the TOR browser and an anonymous VPN. The recipient should also be using a similar setup. TorchChatJS is only as strong as the security of the passphrase, so be sure it is shared or agreed upon securely. Once communication is completed you will need to remove the app from Heroku to ensure all trace of the conversation is deleted with the domain.

##Why TorchNoteJS

Proper encryption, unfortunately, isn't always easy to use. The inconvenience posed by encryption systems is counter-balanced by the protection against much more than overzealous law enforcement agents. Your Internet communications are vulnerable to a wide range of governmental and private adversaries in addition to law enforcement, whether it's the National Security Agency or a hacker trying to intercept your information, and encryption will help you defend against those adversaries as well.

The goal behind any EE2E chat is that all sensitive communication should be encrypted from both the server and everyone else who does not have the *passphrase*. The problem with most encrypted chat is that given a long enough timeline anything online is vulnerable to exploitation.

TorchNoteJS tries to alleviate this by only running when you need it. When sensitive communication is necessary simply deploy a new TorchNoteJS app to Heroku and then delete the app using the Heroku GUI when done.

##App Installation

###Easy way:
- [Create a Heroku account](https://id.heroku.com/signup)
- Click "[Deploy to Heroku](https://heroku.com/deploy?template=https://github.com/spencerthayer/TorchNoteJS)" to build the app.
- Add an optional app name, by default the name is random, and then click `Deploy for Free`.
- There will then be a build phase with a **red/green** **pass/fail** monitor.
 - *If your build fails please contact [me@spencerthayer.com](mailto:me@spencerthayer.com), [open a support ticket](https://github.com/spencerthayer/TorchNoteJS/issues/new) or talk to me on [Gitter](https://gitter.im/spencerthayer/TorchNoteJS)*.
- Once your app is built it's time to use it, click the `View it` link at the bottom.
- Please see **usage** instructions for further details.

###Hard way:
####Prerequisites:
- [Install GIT](http://git-scm.com/book/en/Getting-Started-Installing-Git)
- [Install Node.js](http://howtonode.org/how-to-install-nodejs)
- [Install Heroku Toolbelt](https://toolbelt.heroku.com)

####Step One: Install TorchNoteJS on Localhost and test
- Clone the project:
```sh
git clone http://github.com/spencerthayer/TorchNoteJS.git;cd TorchNoteJS;
```
- Install TorchNoteJS dependencies:
```sh
npm install;
```
- Run local test:
 - Node test:
```sh
(sleep 1;open http://localhost:3700) & npm start;
```
 - Heroku Test
```sh
(sleep 1;open http://localhost:3700) & foreman start;
```
**STEP ONE, ONE SHOT:**
```sh
git clone http://github.com/spencerthayer/TorchNoteJS.git;cd TorchNoteJS;npm install;(sleep 1;open http://localhost:3700) & npm start;
```

####Step Two: Deploy TorchNoteJS to Heroku:

- Create the Heroku app:
```sh
heroku create;
```
- Add TorchNoteJS to Heroku Git:

```sh
git add .;
```
- Push TorchNoteJS to Heroku:
```sh
git push heroku master;
```
- Your TorchNoteJS application is now live so open it:
```sh
heroku open;heroku logs -t;
```
- Please see **usage** instructions for further details.

**STEP TWO, ONE SHOT:**
```sh
heroku create;git add .;git push heroku master;heroku open;heroku logs -t;
```

**COMPLETE SETUP ONE SHOT:**
```sh
git clone http://github.com/spencerthayer/TorchNoteJS.git;cd TorchNoteJS;heroku create;git add .;git push heroku master;heroku open;heroku logs -t;
```

**HEROKU CHANGES UPDATE ONE SHOT:**
```sh
heroku create;git add .;git push heroku master;heroku restart;heroku open;heroku logs -t;
```

---
**PROTIP:** The final command `heroku open;heroku logs -t;` opens the app in your browser and starts log mode. This allows you to monitor all your app's I/O data passed by Heroku. If you know what you're looking for, you should be able to watch out for any suspicious traffic

## App Deletion
Part of what makes TorchNoteJS unique is that it is designed to be removed. A permanent app installation will makes the interception of your chats by way of code vulnerabilities likely. Do not trust long running TorchNoteJS applications.

###How to delete the app:
- Go to your [Heroku App Panel](https://dashboard-next.heroku.com/apps/).
- Click on the name of the app, e.g. *infinite-sierra-8516*.
- In the App details page click the `Settings` option in the right hand of the top menu.
- In the Settings page highlight and copy the app name, e.g. *infinite-sierra-8516*.
- Scroll to the bottom of the page and click `Delete app..`
- Upon the delete prompt paste the name of the app, e.g. *infinite-sierra-8516*, and choose to `Delete the App`.

Below is the command to delete all Heroku apps (don't use if you use Heroku for other sites!):
```sh
for app in $(heroku apps); do heroku apps:destroy --app $app --confirm $app; done
```

##Usage
An important thing to remember when using good encryption standards is to keep all communication hidden. In other words keep in mind that more than just the chat itself will need to be obscured. With TorchNoteJS there are the following vulnerabilities: **connection**, **operating system**, **browser**, **application URL** and finally **passphrase**.

####Connection
TorchNoteJS encrypts all messages data through the server and is as strong as your passphrase. You should consider all communication through the app to be secure as long as you're confident with your passphrase.

However if your connection is being monitored and your passphrase is weakit is possible for a skilled cryptographer to intercept your messages. You can add additional layers of security using an anonymous VPN and/or TOR.

The integrity and stability of leading anonymous VPN software changes frequently so it is best to do your research on [which VPN to choose](http://torrentfreak.com/which-vpn-services-take-your-anonymity-seriously-2014-edition-140315/).

Unlike a VPN Tor does not protect all of your computer's Internet traffic when you run it only THOSE applications that are properly configured to send their Internet traffic through Tor. Before using Tor please read up on [how to properly use the service](https://torproject.org/about/overview.html.en).

####Operating System
All operating systems are prone to interception, however [Tails OS](https://tails.boum.org) is the only OS designed specifically to address this problem.

Tails is a live operating system, that you can start on almost any computer from a DVD, USB stick, or SD card. It aims at preserving your privacy and anonymity, and helps you to:
 - use the Internet anonymously and circumvent censorship
 - all connections to the Internet are forced to go through the Tor network
 - leave no trace on the computer you are using unless you ask it explicitly
 - use state-of-the-art cryptographic tools to encrypt your files, emails and instant messaging

####Browser
Do not use Chrome, Firefox, Safari, Opera, Internet Explorer or any other public use browser. None of of these browsers are designed for the anonymous network traffic critical in secure E2EE communication.

Use the [Tor Browser](https://www.torproject.org/projects/torbrowser.html.en). It is pre-configured to protect your privacy and anonymity on the web as long as you're browsing with the Tor Browser itself. Almost any other web browser configuration is likely to be unsafe to use with Tor.

####Application URL

Discretely share the app URL with your contacts using private self destructing note services like [TMWSD](https://xn--uih.ws/), [Privnote](https://privnote.com/) or [OneShare](https://oneshar.es/create).

####Passphrase
The last thing you and your contacts will want to to do is make sure that the E2EE communication is tied up neatly with a unique, easy-to-remember-but-impossible-to-crack passphrase or "[key]()". A key length of 80 characters is generally considered the minimum for strong security with symmetric encryption algorithms. 128-bit keys are commonly used and considered very strong.

When you and your contacts have agreed upon a passphrase you each will need to put the passphrase into the `Passphrase:` field within the live TorchNoteJS app. For maximum security use a [runnig cipher](http://wikipedia.org/wiki/Running_key_cipher) where the passphrase is changed based on logic throughout the conversation.

#####Common sense passphrase tips:
- Do not ever leave the passphrase blank.
- Do not use the same passphrase twice.
- SERIOUSLY, DO NOT REUSE A PASSPHRASE.
- Do not use something shared on social media, such as Facebook or Twitter.
- Do not use a sample passphrase (such as those below).
- *Be creative.* The best passphrase is one that has never been used before.

#####Passphrase suggestions:
- Consider a passphrase of several (5 or more) random words strung together, e.g. "*pirate fighting a thirsty cosmic giraffe*."
- Make up a sentence that is relevant to you but is stated in such a way that it is not easily guessable, e.g., "*thrash till death, pizza too*."
- Consider using passphrase strengtheners like: broken grammar, incomplete words, uncommonly misspelled words or number and letter substitutions.
- "[Schneier scheme](https://chneier.com/essay-246.html)" recommends that you create a passphrase ("*Man, those six flights of stairs to my New York apartment were killer.*") and then abstract it, possibly with the first letters. (“*M,tsfostmNYawk.*”)
- Find a good passphrase manager like LastPass or my personal project [Passcloud](https://passcloud.me).
- Use a pre-shared Passphase scheme (more below).

#####Pre-shared Passphrase Pro-Tips:
- Do not share a passphrase with your contacts on the unencrypted Internet, sharing  a passphrase offline is *always* best. Clear text exchange of a passphrase would enable any interceptor to immediately learn the key to any encrypted data.
- Share the passphrase using private self destructing note services like [TMWSD](https://xn--uih.ws/), [Privnote](https://privnote.com/) or [OneShare](https://oneshar.es/create).
- Use a cryptovariable cipher scheme for your passphrase.
 - The [one-time pad](http://wikipedia.org/wiki/One-time_pad) is the **only** encryption technique that has been mathematically proven to be uncrackable. It is however nearly impossible to use effectively. This is because the passphrase must be at least as long as the message for each message!
 - Use a [Book cipher](http://www.drdobbs.com/security/the-book-cipher-algorithm/210603676) where the letters or words in some text or book are used a the passphrase to encode a message. A code of 238 21 56 02 76 32 89 67 can be sent in plaintext to the contact indicating page 238 word numbers 21, 56 etc. It is important to note that the books edition must match between all contacts.
 - Use a newspaper time cipher where the first sentence in the headline article of todays edition of a popular newspaper or magazine is used as a passphrase.
 - Use any variation of any [Substitution cipher](http://wikipedia.org/wiki/Substitution_cipher#Homophonic_substitution) as long as all contacts understand and agree.

#####Passphrases to avoid:
- Common dictionary words.
- Sequential letters or numbers (e.g. 1234567890, abcdefghij, qwertyuiop)
- Trivial passwords (e.g. password, passwd,mypassword,p@ssw0rd).
- Easily discoverable personal data (e.g., netID, names, birthday, address, pets).

##Questions
####Isn't Javascript supposed to have weak crypto services?
Yeah it does. Totally. No one here is going to argue that NodeJS is better at security and encryption than SSL, except for when it isn't, *cough [Heartbleed](http://heartbleed.com/)*. Nor am I interested in a debate about how NodeJS cannot compete with many of the more robust server-side languages when it comes to security. No duh!

This is exactly why TorchNoteJS does not rely on the main server to exchange the cryptocipher. TorchNoteJS uses AES256 encryption as it's the most secure and fastest encryption available. it doesn't bother attempting to secure the connection as that is impossible using JavaScript technology.

####So why would I use TorchNoteJS?
Those other solutions **cost money**, are **complicated to develop** and can't be turned on at the drop of a hat. TorchNoteJS is a free solution that is very easy to deploy and more importantly permanently delete.

####This is too much work.
The TorchNoteJS goal is not about making a one click solution to online communication. *Those do not exist.* Instead it is to be used as part of an encryption suite each part increasing your personal security. You can use TorchNoteJS without any additional security steps and it will still encrypt your conversation but that doesn't mean your conversation was not intercepted.

####Meh, why not just use ... ?
Yes, there are other solutions for secure EE2E and I suggest you use them if you believe this application is not sufficient. If you do find a legitimate reason to be suspect of TorchNoteJS please create an issue because I really don't want to promote something that is broken.

---
##I DON'T GET ANY OF THIS!
Perhaps then this might help.
[![Go Hard](https://raw.githubusercontent.com/spencerthayer/TorchNoteJS/master/public/img/go_hard.jpg)](http://youtu.be/0llr2_g11mE)

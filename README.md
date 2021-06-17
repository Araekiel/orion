<img alt="Orion" src="https://raw.githubusercontent.com/Araekiel/orion/master/public/images/logo.webp" height="100">

# Orion
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)]()
[![Version](https://badge.fury.io/gh/tterb%2FHyde.svg)]()

Orion is an Open-Source Search Engine for social networking websites, that displays search results in the form of a well designed feed with links to the original post like you would expect from a conventional social networking website.
<br/>
<br/>
Currently the data that Orion can lookup is:
- Top Posts from Instagram 
- Verified and Unverified Users from Instagram
- Top Tweets from Twitter
<br/>

#### UPDATE:
The Instagram and Twitter APIs have changed. Orion doesn't display tweets anymore and the number of Instagram top posts have reduced. Orion only displays data from Instagram at the moment and considering the pace at which Instagram updates it API, this project probably won't recieve anymore updates. <br>
> Last Update: Added image proxy to fix the Instagram image CDN issue. 

<img alt="Gif" src="https://raw.githubusercontent.com/Araekiel/orion/master/public/images/other/orion.gif">

> Orion doesn't display latest posts and tweets, they aren't always relevant to the search 

## Prerequisites

- Git is need to clone repository on your machine.
- npm is needed to install packages.
- Node.js is needed to run Orion.

### Ubuntu

Install git, Node.js and npm on your machine running Ubuntu:

```bash
$ sudo apt-get install git-core
$ sudo apt install nodejs
$ sudo apt install npm
```
### Windows 

Use the official links for downloading on Windows:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)

Run the following commands to confirm if the installation was successful:

```bash
$ git --version
$ node --version
$ npm --version 
```

## Installation

Clone the repo and cd into the directory: 

```bash
$ git clone https://github.com/Araekiel/orion.git
$ cd orion 
```

Then install the node-modules in package.json:

```bash
$ npm install
```

## Configuration 

Make a .env file and set the following environment variables: 
- **PORT** - For the port the server is going to run on
- **MORGAN_METHOD** - For the method that morgan is going to log requests

## Running

Run the app with the following command:

```bash
$ npm start
```

Or if you want to run the app with nodemon: 

```bash
$ npm run dev
```

Open a browser and type **localhost:_port_**

## Authors

- **Araekiel** - [Github](https://github.com/Araekiel)

## License

[MIT](https://choosealicense.com/licenses/mit/)

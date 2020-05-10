<img alt="Orion" src="https://raw.githubusercontent.com/KSSBro/orion/master/public/images/logo.webp" height="100">

# Orion
[MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)
[Version](https://badge.fury.io/gh/tterb%2FHyde.svg)

Orion is an Open-Source Search Engine for social networking websites, that displays search results in the form of a well designed feed with links to the original content like you would expect from a conventional social networking website.
<br/>
<br/>
Currently the data that Orion can lookup is:
- Top Posts from Instagram 
- Verified and Unverified Users from Instagram
- Top Tweets from Twitter
<br/>

> Orion doesn't display latest posts and tweets, they aren't always relevant to the search 

## Prerequisites

- Git is need to clone repository on your machine.
- npm is needed to install packages.
- Node.js is needed to run Orion.

### Ubuntu

Install git, Node.js and npm on your machine running Ubuntu:

``` 
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

```
$ git --version
$ node --version
$ npm --version 
```

## Installation

Clone the repo and cd into the directory: 

```
$ git clone https://github.com/KSSBro/orion.git
$ cd orion 
```

Then install the node-modules in package.json:

```
$ npm install
```

## Configuration 

Make a .env file and set the following environment variables: 
- **PORT** - For the port the server is going to run on
- **MORGAN_METHOD** - For the method that morgan is going to log requests

## Running

Run the app with the following command:

```
$ npm start
```

Or if you want to run the app with nodemon: 

```
$ npm run dev
```

Open a browser and type **localhost:_port_**

## Authors

- **KSSBro** - [Github](https://github.com/KSSBro)

## License

[MIT](https://choosealicense.com/licenses/mit/)

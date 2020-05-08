<img alt="Orion" src="https://raw.githubusercontent.com/KSSBro/orion/master/public/images/logo.webp" height="100">

# Orion

Orion is an open-source Search Engine for social media websites built with Node.js.
<br/>
<br/>
**Currently under development.**
<br/>
<br/>


## Getting Started

### Prerequisites

[Git](https://git-scm.com/) is needed to clone the repository on your machine.
Use [Node.js](https://nodejs.org/en/download/) and the package manager [npm](https://www.npmjs.com/get-npm) that is installed along with it to run Orion on your machine.

### Installing and Running

After installing git, clone the repository on your machine

```
git clone https://github.com/KSSBro/orion.git
```

Then install the node-modules in package.json

```
npm install
```

Make a .env file and set the following environment variables: 
- *PORT*: For the port the server is going to run on
- *MORGAN_METHOD*: For the method that morgan is going to log requests

Then run the app

```
npm start
```

Or if you want to run the app with nodemon 

```
npm run dev
```

Open a browser and type **localhost:_port_**

## Authors

- **KSSBro** - [Github](https://github.com/KSSBro)

## License

[MIT](https://choosealicense.com/licenses/mit/)

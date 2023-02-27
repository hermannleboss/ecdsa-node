## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.


All generated wallet to use for testing

```js 

let data = [
    {
        "private_key": "a5eb46117a4a174fd237e0eac630332a784711fdfc06358d7dcad6509ce0ab0c",
        "public_key": "042b6b11ab1699f7ff95ae46a742005e0a1ff9aa725e8c30447eb64e49088b09610f0337772ed1eecefbc9f8ff2bda5b79451088bd2e85d1f4cc2f4582623fb553",
        "address": "c611121019e56f6a284a475672c51541022cbf62"
    },
    {
        "private_key": "fe91bf32be32aed7749680551585edc2db599ff2e069cd9a691714ee16581f10",
        "public_key": "045c75e3afe7c3bc614a6fdfde2daee009a9d70384d09806acbc44dd2b847d0eddbb112bf1430b70cf6dd5c6e5b1d9d6cbb77b3c916ab1683159d747f1da0dc604",
        "address": "67218648aff7e98028f8e50395287917672dc957"
    },
    {
        "private_key": "1c4768bfdef0cacc0ff077b468dc0ea34e787ff2f8e7ec3c54d51ad836cf8050",
        "public_key": "04271e5de02110fc8f8bcde8033c41cad610c88b387bc3f8e74f6aea74ad0d16a8cd23746dbddc0e4e05c10604d4029ceaf283a96377ab8ca95704cd32bdf1649e",
        "address": "595fed25db450f0ff500b39ae4dd41089c61a4ef"
    }
]
```

import { create } from 'ipfs-http-client';

const infuraApiKey = '2YBDXfVJuKDoHj42MfzJDG1zjta';

const projectSecret = '7fdb3976668f0c09e69e9bbaa77ff93b'; 

const auth = "Basic " + btoa(infuraApiKey + ":" + projectSecret);

const ipfs = create({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      authorization: auth,
    },
});

console.log('IPFS client:', ipfs);

export default ipfs;
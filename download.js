import fetch from 'node-fetch'
import ethers from 'ethers'
import fs from "fs"
var server;
import express from 'express';
import http from "http";
const app = express();
const downloadFile = async (url, path) => {
    const res = await fetch(url);
    const fileStream = fs.createWriteStream(path);
    await new Promise((resolve, reject) => {
        res.body.pipe(fileStream);
        res.body.on("error", reject);
        fileStream.on("finish", resolve);
    });
};


const readData = async ()=>{
    const content = fs.readFileSync("./bitci/index.json");
    const tokenList = JSON.parse(content.toString()).tokens;

    tokenList.map((item)=>{
        const address = ethers.utils.getAddress(item.address)
        const logoURI = item.logoURI
        console.log("ADDRESS:",address, "LOGO:",logoURI)
        const savePath1 =  `./bitci/tokens/${address}`
        const savePath2 = `${savePath1}/`


        if (!fs.existsSync(savePath1)){
            fs.mkdirSync(savePath1);
        }
        if (!fs.existsSync(savePath2)){
            fs.mkdirSync(savePath2);
        }

        const saveFileName = `${savePath2}/logo.svg`

        console.log(saveFileName)
        downloadFile(logoURI,saveFileName)
        //downloadFile("https://api.coinmarketcap.com/data-api/v3/uniswap/all.json","/Users/ninja/Desktop/PROJECTS/bitci/assets/test.json").then(console.log("tamam"))

    })


}


readData();


console.log("running on http");
server = http.Server(app);

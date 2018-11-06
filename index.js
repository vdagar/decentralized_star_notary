/*
 * Using strict mode to avoid some unwanted errors
 */
"use strict";

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3');
const fs = require('fs');

const testnet = `https://rinkeby.infura.io/${process.env.ENDPOINT_KEY}`;
const web3 = new Web3( new Web3.providers.HttpProvider(testnet) );
web3.eth.defaultAccount = process.env.WALLET_ADDRESS

const contract = JSON.parse(fs.readFileSync('smart_contracts/build/contracts/StarNotary.json', 'utf8'));
const StarNotaryContract = web3.eth.contract(contract.abi);
const StarNotary = StarNotaryContract.at("0xd1aab472305a2e1c2fd992f1f12c1757580dfd80");

const app = express();
const PORT = 8000;

var version = web3.version.api;

console.log(web3.eth.defaultAccount);

app.listen(PORT, () => console.log("Server is listening on Port " + PORT));
app.use(bodyParser.json());

/*
 * Send an error message if user tries to access root
 */
app.get('/', (request, response) => response.status(404).json({
	"status": 404,
	"message": "Check README file for accepted endpoints"
}));

/*
 * CRITERIA: Get star by its tokenId.
 */
app.get('/star/:tokenId', async (request, response) => {
	try {
		const tokenId = parseInt(request.params.tokenId);

		if (tokenId < 1 || tokenId === undefined) {
			throw new Error('Invalid tokenId passed');
		}

        const star = StarNotary.tokenIdToStarInfo(tokenId);

        if (star.name === "") {
            throw new Error("Invalid Token Id passed");
        }

		response.send(star);

	} catch (error) {
		/* Return Error in case of any */
		response.status(404).json ({
			"status": 404,
			"message": error.message
		});
	}
});

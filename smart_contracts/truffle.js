/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() {
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>')
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

require('dotenv').config();
const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = process.env["NEMONIC"];
const tokenKey = process.env["ENDPOINT_KEY"];

module.exports = {
	// See <http://truffleframework.com/docs/advanced/configuration>
	// to customize your Truffle configuration!
	solc: {
		optimizer: {
			enabled: true,
			runs: 200
		}
	},
	networks: {
		rinkeby: {
			host: "localhost",
			provider: () => new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/" + tokenKey),
			network_id: 4,
			gas: 6700000,
			gasPrice: 10000000000
		},
		development: {
			host: "localhost",
			port: 8545,
			network_id: "*" // Match any network id
		},
	}
};

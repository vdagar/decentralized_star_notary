if (typeof web3 != 'undefined') {
    web3 = new Web3(web3.currentProvider) // what Metamask injected
} else {
    // Instantiate and set Ganache as your provider
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

// The default (top) wallet account from a list of test accounts
web3.eth.defaultAccount = web3.eth.accounts[0];

// The interface definition for your smart contract (the ABI)
var StarNotary = web3.eth.contract(
    [{
            "constant": true,
            "inputs": [{
                "name": "interfaceId",
                "type": "bytes4"
            }],
            "name": "supportsInterface",
            "outputs": [{
                "name": "",
                "type": "bool"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [{
                "name": "",
                "type": "uint256"
            }],
            "name": "starsForSale",
            "outputs": [{
                "name": "",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [{
                "name": "tokenId",
                "type": "uint256"
            }],
            "name": "getApproved",
            "outputs": [{
                "name": "",
                "type": "address"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [{
                    "name": "to",
                    "type": "address"
                },
                {
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [{
                    "name": "from",
                    "type": "address"
                },
                {
                    "name": "to",
                    "type": "address"
                },
                {
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [{
                    "name": "from",
                    "type": "address"
                },
                {
                    "name": "to",
                    "type": "address"
                },
                {
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [{
                "name": "tokenId",
                "type": "uint256"
            }],
            "name": "ownerOf",
            "outputs": [{
                "name": "",
                "type": "address"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [{
                "name": "owner",
                "type": "address"
            }],
            "name": "balanceOf",
            "outputs": [{
                "name": "",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [{
                "name": "",
                "type": "bytes32"
            }],
            "name": "starHashMap",
            "outputs": [{
                "name": "",
                "type": "bool"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "owner",
            "outputs": [{
                "name": "",
                "type": "address"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "isOwner",
            "outputs": [{
                "name": "",
                "type": "bool"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "tokenCount",
            "outputs": [{
                "name": "",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [{
                "name": "",
                "type": "uint256"
            }],
            "name": "saleIndexes",
            "outputs": [{
                "name": "",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [{
                    "name": "to",
                    "type": "address"
                },
                {
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "setApprovalForAll",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [{
                    "name": "from",
                    "type": "address"
                },
                {
                    "name": "to",
                    "type": "address"
                },
                {
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "name": "_data",
                    "type": "bytes"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [{
                    "name": "owner",
                    "type": "address"
                },
                {
                    "name": "operator",
                    "type": "address"
                }
            ],
            "name": "isApprovedForAll",
            "outputs": [{
                "name": "",
                "type": "bool"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [{
                "name": "newOwner",
                "type": "address"
            }],
            "name": "transferOwnership",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [{
                "indexed": true,
                "name": "previousOwner",
                "type": "address"
            }],
            "name": "OwnershipRenounced",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [{
                    "indexed": true,
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [{
                    "indexed": true,
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [{
                    "indexed": true,
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "approved",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [{
                    "indexed": true,
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "operator",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "ApprovalForAll",
            "type": "event"
        },
        {
            "constant": false,
            "inputs": [{
                    "name": "_name",
                    "type": "string"
                },
                {
                    "name": "_story",
                    "type": "string"
                },
                {
                    "name": "_ra",
                    "type": "string"
                },
                {
                    "name": "_dec",
                    "type": "string"
                },
                {
                    "name": "_mag",
                    "type": "string"
                }
            ],
            "name": "createStar",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [{
                    "name": "_tokenId",
                    "type": "uint256"
                },
                {
                    "name": "_price",
                    "type": "uint256"
                }
            ],
            "name": "putStarUpForSale",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [{
                "name": "_tokenId",
                "type": "uint256"
            }],
            "name": "buyStar",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [{
                    "name": "_ra",
                    "type": "string"
                },
                {
                    "name": "_dec",
                    "type": "string"
                },
                {
                    "name": "_mag",
                    "type": "string"
                }
            ],
            "name": "checkIfStarExist",
            "outputs": [{
                "name": "",
                "type": "bool"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [{
                "name": "_tokenId",
                "type": "uint256"
            }],
            "name": "tokenIdToStarInfo",
            "outputs": [{
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [{
                "name": "_tokenId",
                "type": "uint256"
            }],
            "name": "mint",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getStarsForSale",
            "outputs": [{
                    "name": "",
                    "type": "uint256[]"
                },
                {
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ]
);
// Grab the contract at specified deployed address with the interface defined by the ABI
var starNotary = StarNotary.at('0xd1aab472305a2e1c2fd992f1f12c1757580dfd80');

// Enable claim button being clicked
function claimButtonClicked() {
    web3.eth.getAccounts(function (error, accounts) {
        if (error) {
            alert(error)
            return
        }

        const account = accounts[0];
        const name = document.getElementById("name").value;
        const story = document.getElementById("story").value;
        const ra = document.getElementById("ra").value;
        const dec = document.getElementById("dec").value;
        const mag = document.getElementById("mag").value;

        starNotary.createStar.sendTransaction(name, story, ra, dec, mag, {
            from: account,
            gas: 1000000
        }, function (error, result) {
            if (!error) {
                alert(result);
                document.getElementById("result").value = "txHash:" + result + ", transaction pending";

                let starClaimedEvent = starNotary.Transfer();
                starClaimedEvent.watch(function (error, result) {
                    if (!error) {
                        alert(`transaction complete! TokenId of Star: ${JSON.stringify(result.args.tokenId)}`);
                        document.getElementById("result").value = `transaction complete! TokenId of Star: ${JSON.stringify(result.args.tokenId)}`;
                    } else {
                        alert('watching for star claimed event is failing');
                    }
                });
            } else {
                alert(error);
            }
        });

    })
}

function queryButtonClicked() {
    web3.eth.getAccounts(function (error, accounts) {
        if (error) {
            alert(error);
            return;
        }

        const account = accounts[0];
        const tokenId = document.getElementById("queryById").value;

        starNotary.tokenIdToStarInfo.call(tokenId, function (error, result) {
            if (!error) {
                alert(result);
                document.getElementById("result").value = result;
            } else {
                alert(error);
            }
        });
    });
}

function createTable(tableData) {

    var table = document.getElementById("starForSale");
    for (i = 0; i < tableData[0].length; i++) {
        var row = table.insertRow(i + 2);

        for (j = 0; j < tableData.length; j++) {
            var cell = row.insertCell(j);
            cell.innerHTML = tableData[j][i];
            cell.setAttribute("align", "center");
        }
    }

    table.setAttribute("border", "2");
}

function starsForSale() {
    web3.eth.getAccounts(function (error, accounts) {
        if (error) {
            alert(error);
            return;
        }

        const account = accounts[0];

        starNotary.getStarsForSale.call(function (error, result) {
            if (!error) {
                createTable(result)
            } else {
                alert(error);
            }
        });
    });
}

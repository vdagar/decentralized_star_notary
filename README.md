# **Decentralized Star Notary**

For this project, you will create a DApp by adding functionality to your smart
contract and deploy it on the public testnet. To do so, you'll employ your
blockchain identity to secure digital assets on the Ethereum platform using a
smart contract. You will get to practice your knowledge of the basics of Solidity.

Previously, you learned to create your own private blockchain web service. In this
course, you migrated your private blockchain functionality to a smart contract and
created your own ERC721 non-fungible token contract!

# Why this project?
In this project, we’ll focus on a specific use case - a star notary service that
allows users to prove they own an authenticated star!
You’ve learned the importance of notarizing digital assets (e.g. documents, media
files, etc.) which uses the concept of Proof of Existence to prove the digital asset
is authentic and can be trusted. In additional, it can also prove ownership of the
digital asset if that information is provided.

This same concept is used in global DApps from games such as CrytpoKitties which
allows users to verify their ownership of digital “kitties” to Integra Ledger a
blockchain utility to confirm integrity and authenticity of legal documents.

# What will I learn?
This project will allow you to build and expand upon the concepts and skills you’ve
gained throughout this course. With this project you will:
	Write a smart contract with functions that support of proof of existence (also known as notarization)
	Test smart contract code coverage
	Deploy smart contract on a public test networks (e.g. Rinkeby)
	Utilize javascript to modify client side code to interact with a smart contract
	Understand the difference between fungible and non-fungible tokens
	Understand the difference between ERC-20 and ERC-721 standards

# Project Requirements

https://review.udacity.com/#!/rubrics/2297/view

# Getting Started

## Prerequisites

web3 - To connect to

Truffle - To compile and deploy the smart contract on development and rinkeby network

dotenv  - To read .env files used to define private data for wallet

truffle-hdwallet-provider - To provide the HD wallet

## Running the tests
On Developmen network: truffle test
On Rinkeby test network: truffle test --network rinkeby

## Deployment
truffle migrate --network rinkeby --reset --compile-all

## Console Output
truffle migrate --network rinkeby --reset --compile-all
Compiling ./contracts/Migrations.sol...
Compiling ./contracts/StarNotary.sol...
Compiling openzeppelin-solidity/contracts/introspection/ERC165.sol...
Compiling openzeppelin-solidity/contracts/introspection/IERC165.sol...
Compiling openzeppelin-solidity/contracts/math/SafeMath.sol...
Compiling openzeppelin-solidity/contracts/ownership/Ownable.sol...
Compiling openzeppelin-solidity/contracts/token/ERC721/ERC721.sol...
Compiling openzeppelin-solidity/contracts/token/ERC721/IERC721.sol...
Compiling openzeppelin-solidity/contracts/token/ERC721/IERC721Receiver.sol...
Compiling openzeppelin-solidity/contracts/utils/Address.sol...
Writing artifacts to ./build/contracts

Using network 'rinkeby'.

Running migration: 1_initial_migration.js
  Replacing Migrations...
  ... 0xe840ce8aba485afb4ed222ec681690ea43b3af5753a05bc1b0fac9e06ea93504
  Migrations: 0x90a1a8c5789b810f502b64a9250348cdb30546a4
Saving successful migration to network...
  ... 0xff65f681764dbc02b3ab0e57bed15bc35fc9518ae046f2dbd2bb3faff0d0fe86
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Replacing StarNotary...
  ... 0xf9094952cfd0e2005321928f0806e059cc5947dc889e69b631a2c9945fabc9bc
  StarNotary: 0xd1aab472305a2e1c2fd992f1f12c1757580dfd80
Saving successful migration to network...
  ... 0x51423ac4be1af3abd21e1d02c245fe80df5f3d31240a74ddd8a55400ab5cd4b7
Saving artifacts...

## Contract Address

0xd1aab472305a2e1c2fd992f1f12c1757580dfd80
https://rinkeby.etherscan.io/address/0xd1aab472305a2e1c2fd992f1f12c1757580dfd80

## Create Star Transaction Hash

0xffe5f8e057bb64b1a6ee24ff353b9457431531ab5a21afeeac1f59f96b46aae9
https://rinkeby.etherscan.io/tx/0xffe5f8e057bb64b1a6ee24ff353b9457431531ab5a21afeeac1f59f96b46aae9

0x89a89b497a986f467efbe162ca3f3cb5a4c3e8447562e75b0d7bb1a91bb4e2e7
https://rinkeby.etherscan.io/tx/0x89a89b497a986f467efbe162ca3f3cb5a4c3e8447562e75b0d7bb1a91bb4e2e7

## Put Star for Sale Transaction Hash

0xfe9a2408efa87245141f114020c98f36dec1d1d5e7b274eeaa481d4c0256e765
https://rinkeby.etherscan.io/tx/0xfe9a2408efa87245141f114020c98f36dec1d1d5e7b274eeaa481d4c0256e765

0x45ce7fec20ff85d89fb1dc5d98f58ce46989809b19e5b21a6076c65fd175c606
https://rinkeby.etherscan.io/tx/0x45ce7fec20ff85d89fb1dc5d98f58ce46989809b19e5b21a6076c65fd175c606

## TokenId

1,
2

## Endpoint to return a registered star

method: 'GET',

path: '/star/starTokenId'

> For Example

> curl http://localhost:8000/star/1

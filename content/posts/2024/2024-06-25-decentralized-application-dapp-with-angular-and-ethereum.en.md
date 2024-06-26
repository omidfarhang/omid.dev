---
title: 'Building a Decentralized Application (DApp) with Angular and Ethereum'
date: 2024-06-25T01:59:23+03:30
layout: single
author_profile: true
url: 2024/06/25/building-a-decentralized-application-dapp-with-angular-and-ethereum/
shortlink: https://g.omid.dev/45nNhBh
tags:
  - Angular
  - Frontend Development
  - Firebase
  - WebRTC
  - Real-Time App
lang: en
categories: 
  - techblog
---
In recent years, decentralized applications (DApps) have emerged as a groundbreaking paradigm in the world of software development. Unlike traditional applications that run on centralized servers, DApps operate on blockchain technology, which offers enhanced security, transparency, and decentralization. This guide will walk you through the process of creating a DApp using Angular and Ethereum, including smart contract development with Solidity.

## What is a Decentralized Application (DApp)?

A DApp is an application that runs on a decentralized network, typically a blockchain. Unlike conventional applications, DApps leverage the decentralized nature of blockchain to provide a higher level of security and trust. Key features of DApps include:

1. **Decentralization**: DApps are not controlled by a single entity. Instead, they run on a distributed network of nodes, ensuring no single point of failure.
2. **Transparency**: The codebase of DApps is usually open-source, allowing anyone to inspect, audit, and verify the application's functionality.
3. **Immutability**: Once deployed, the code and data on the blockchain cannot be altered, ensuring the integrity and trustworthiness of the application.

## What is Ethereum?

Ethereum is a decentralized platform that enables developers to build and deploy smart contracts and DApps. It extends the capabilities of blockchain beyond simple transactions by allowing programmable scripts, known as smart contracts, to be executed on its network. Ethereum's key components include:

1. **Ethereum Virtual Machine (EVM)**: The runtime environment for smart contracts in Ethereum. It allows anyone to run any decentralized application, regardless of the programming language.
2. **Ether (ETH)**: The native cryptocurrency of the Ethereum platform, used to pay for transaction fees and computational services.
3. **Smart Contracts**: Self-executing contracts with the terms directly written into code, enabling automated, trustless transactions and agreements.

## What is Solidity?

Solidity is a statically-typed, contract-oriented programming language designed for developing smart contracts on the Ethereum blockchain. It is influenced by JavaScript, Python, and C++, making it relatively easy for developers familiar with these languages to pick up. Solidity allows developers to write smart contracts that define the rules and behaviors of DApps. Key features of Solidity include:

1. **Syntax and Structure**: Similar to JavaScript, with constructs for defining contracts, functions, and variables.
2. **Strong Typing**: Ensures data integrity and reduces runtime errors by enforcing type rules during compilation.
3. **Inheritance and Libraries**: Supports inheritance and library imports, promoting code reuse and modularity.

## What is Web3?

Web3 refers to a set of libraries and protocols that enable interaction with a blockchain network from a client-side application. Web3.js is the most widely used JavaScript library for interacting with the Ethereum blockchain. It provides an API for:

1. **Connecting to the Blockchain**: Establishing a connection to an Ethereum node, whether it be a local node, a remote node, or a hosted node via services like Infura.
2. **Interacting with Smart Contracts**: Deploying, calling, and listening to events from smart contracts.
3. **Managing Accounts and Transactions**: Creating and managing Ethereum accounts, sending transactions, and querying balances.

## Setting Up the Development Environment

Before diving into the development process, ensure you have the following:

1. **Node.js and npm**: Install Node.js and npm from [nodejs.org](https://nodejs.org/).
2. **Angular CLI**: Install the Angular CLI to scaffold and manage your Angular project.

    ```bash
    npm install -g @angular/cli
    ```

3. **Truffle and Ganache**: Truffle is a development framework for Ethereum, and Ganache is a personal blockchain for Ethereum development.

    ```bash
    npm install -g truffle
    npm install -g ganache-cli
    ```

4. **MetaMask**: Install MetaMask in your browser to manage your Ethereum accounts and interact with the Ethereum network.

## Creating an Angular Project

First, create a new Angular project using the Angular CLI:

```bash
ng new angular-dapp
cd angular-dapp
```

Install Web3.js, which is the library that allows us to interact with the Ethereum blockchain:

```bash
npm install web3
```

## Writing Smart Contracts with Solidity

Smart contracts are self-executing contracts with the terms of the agreement directly written into code. Solidity is the programming language used to write these contracts.

1. **Create a Truffle Project**: Initialize a new Truffle project in your Angular application directory.

    ```bash
    truffle init
    ```

2. **Write a Simple Smart Contract**: Create a new Solidity file in the `contracts` directory.

    ```solidity
    // contracts/SimpleStorage.sol
    pragma solidity ^0.8.0;

    contract SimpleStorage {
        uint public data;

        function set(uint _data) public {
            data = _data;
        }

        function get() public view returns (uint) {
            return data;
        }
    }
    ```

3. **Compile the Smart Contract**: Compile your Solidity code to check for any errors.

    ```bash
    truffle compile
    ```

4. **Deploy the Smart Contract**: Create a deployment script in the `migrations` directory.

    ```javascript
    // migrations/2_deploy_contracts.js
    const SimpleStorage = artifacts.require("SimpleStorage");

    module.exports = function(deployer) {
      deployer.deploy(SimpleStorage);
    };
    ```

    Deploy the contract using Ganache.

    ```bash
    ganache-cli
    truffle migrate
    ```

## Integrating Smart Contract with Angular

1. **Connect Angular with Web3**: Create a service to handle Web3 interactions.

    ```typescript
    // src/app/services/web3.service.ts
    import { Injectable } from '@angular/core';
    import Web3 from 'web3';

    @Injectable({
      providedIn: 'root'
    })
    export class Web3Service {
      private web3: Web3;

      constructor() {
        if (typeof window.ethereum !== 'undefined') {
          this.web3 = new Web3(window.ethereum);
          window.ethereum.enable().catch(error => {
            console.error("User denied account access")
          });
        } else {
          console.warn("No web3 detected. Falling back to http://127.0.0.1:8545.");
          this.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
        }
      }

      getWeb3() {
        return this.web3;
      }
    }
    ```

2. **Create an Angular Component**: Create a new component to interact with the smart contract.

    ```bash
    ng generate component SimpleStorage
    ```

    In the component, add methods to get and set data in the smart contract.

    ```typescript
    // src/app/simple-storage/simple-storage.component.ts
    import { Component, OnInit } from '@angular/core';
    import { Web3Service } from '../services/web3.service';
    import SimpleStorageContract from '../../../build/contracts/SimpleStorage.json';

    @Component({
      selector: 'app-simple-storage',
      templateUrl: './simple-storage.component.html',
      styleUrls: ['./simple-storage.component.css']
    })
    export class SimpleStorageComponent implements OnInit {
      private web3: any;
      private contract: any;
      public data: string;

      constructor(private web3Service: Web3Service) {
        this.web3 = this.web3Service.getWeb3();
      }

      async ngOnInit() {
        const networkId = await this.web3.eth.net.getId();
        const deployedNetwork = SimpleStorageContract.networks[networkId];
        this.contract = new this.web3.eth.Contract(SimpleStorageContract.abi, deployedNetwork && deployedNetwork.address);
      }

      async setData(data: string) {
        const accounts = await this.web3.eth.getAccounts();
        await this.contract.methods.set(data).send({ from: accounts[0] });
      }

      async getData() {
        const result = await this.contract.methods.get().call();
        this.data = result;
      }
    }
    ```

    Update the template to bind data and provide input for setting data.

    ```html
    <!-- src/app/simple-storage/simple-storage.component.html -->
    <div>
      <h2>Simple Storage</h2>
      <input #newData type="text" placeholder="Enter data">
      <button (click)="setData(newData.value)">Set Data</button>
      <button (click)="getData()">Get Data</button>
      <p>Stored Data: {{ data }}</p>
    </div>
    ```

## Running the Application

1. **Start Ganache**: Ensure Ganache is running.

    ```bash
    ganache-cli
    ```

2. **Run the Angular Application**: Start your Angular application.

    ```bash
    ng serve
    ```

3. **Interact with the DApp**: Open your browser and navigate to `http://localhost:4200`. You should see the interface to interact with your smart contract.

## Further Reading

- [Ethereum Documentation](https://ethereum.org/en/developers/docs/)
- [Solidity Documentation](https://docs.soliditylang.org/en/latest/)
- [Web3.js Documentation](https://web3js.readthedocs.io/en/v1.10.0/)
- [Truffle Suite](https://archive.trufflesuite.com/docs/truffle/)
- [Next steps for developers using Truffle and Ganache](https://consensys.io/blog/consensys-announces-the-sunset-of-truffle-and-ganache-and-new-hardhat)
- [Angular Documentation](https://angular.dev)

## Conclusion

In this guide, we covered the process of building a simple decentralized application using Angular and Ethereum. We developed a smart contract with Solidity, deployed it using Truffle, and interacted with it through an Angular application. This is a basic example, and there are many ways to extend and improve upon this foundation, such as adding authentication, integrating with other smart contracts, and implementing advanced UI features.

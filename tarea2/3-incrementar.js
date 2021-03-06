
var Web3 = require("web3");  // Cargar paquete web3

if (typeof web3 !== 'undefined') {  // Ya existe instancia web3
   web3 = new Web3(web3.currentProvider);  // Usamos el mismo Provider
} else {  // Usar Provider: GANACHE 
   web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
} 

var abi = [
	{
		"constant": false,
		"inputs": [],
		"name": "incr",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "decr",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "valor",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "fallback"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "msg",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "out",
				"type": "uint8"
			}
		],
		"name": "Tic",
		"type": "event"
	}
]

var primaryAddress = web3.eth.accounts[0];

var addr = "0x37fe35924f829c5e4b344de19bc858a0ef7cec72";

var MyContract = web3.eth.contract(abi);
var contractInstance = MyContract.at(addr);

var valor1 = contractInstance.valor();
console.log("Valor Inicial =", valor1.toNumber());

contractInstance.incr.sendTransaction({
	from: primaryAddress, 
	gas: 200000},
    function(err, result) {
        if (err) {
            console.log("Error =", err);
            process.exit(1)
        } 
        var valor2 = contractInstance.valor();
        console.log("Valor final =", valor2.toNumber());
        process.exit(0)
    });

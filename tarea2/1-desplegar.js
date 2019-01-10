
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

var code = "60806040526000805460ff1916905534801561001a57600080fd5b506101f98061002a6000396000f3006080604052600436106100565763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663119fbbd48114610068578063d9f2ac8a1461007f578063ecbac7cf14610094575b34801561006257600080fd5b50600080fd5b34801561007457600080fd5b5061007d6100bf565b005b34801561008b57600080fd5b5061007d610141565b3480156100a057600080fd5b506100a96101c4565b6040805160ff9092168252519081900360200190f35b6000805460ff198116600160ff928316018216179182905560408051929091166020830152808252600b828201527f41637475616c697a61646f0000000000000000000000000000000000000000006060830152517f278733a8e0534f74d81486a11876429bb0d35a6968fa576ec403ad7aecfa2e6e916080908290030190a1565b6000805460ff19811660ff918216600019018216179182905560408051929091166020830152808252600b828201527f41637475616c697a61646f0000000000000000000000000000000000000000006060830152517f278733a8e0534f74d81486a11876429bb0d35a6968fa576ec403ad7aecfa2e6e916080908290030190a1565b60005460ff16815600a165627a7a723058202587f011fea4a6878440ed2e82a4cde0d9c8242c68ee4325f6113a472209052e0029";

var primaryAddress = web3.eth.accounts[0];

var MyContract = web3.eth.contract(abi);

var contractInstance = MyContract.new({
	from: primaryAddress, 
    data: code, 
    gas: 500000}, 
    function(err, contract) {
        if (err) {
            console.log("Error =", err);
            process.exit(1)
        } 
        if (contract.address) {
            console.log("Contrato desplegado en",contract.address);
            process.exit(0)
        }
    });



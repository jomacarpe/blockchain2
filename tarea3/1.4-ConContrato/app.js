App = {
    Contador: null,
    contador: null,

    init: function() {
        console.log("Inicializando App.");

        App.initWeb3();
        App.initContractAbstracts();
        App.initContractInstance();
        App.bindEvents();
        App.refreshContador();
    },

    initWeb3: function() {
        console.log("Inicializando web3.");

        // Si hay inyectada una instancia de web3:
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            // Uso Ganache porque no hay una instancia de web3 inyectada.
            web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
        }
    },

    initContractAbstracts: function() {
        console.log("Inicializando abstracción del contrato.");

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

        App.Contador = web3.eth.contract(abi);
    },

    initContractInstance: function() {
        console.log("Obtener instancia desplegada del contador.");

        var addr = "0x37fe35924f829c5e4b344de19bc858a0ef7cec72";

        App.contador = App.Contador.at(addr);

        console.log("Configurar Vigilancia de los eventos del contador.");
        App.contador.Tic((err, data) => {
            console.log("Se ha producido un evento Tic:");
            if (err){
                console.log(err);
            } else {
                var msg = data.args.msg;
                var out = data.args.out;
                console.log(" * Msg =", msg);
                console.log(" * Out =", out.valueOf());

                $('#valor').text(out.valueOf());
            }
        });
    },


    bindEvents: function() {
        console.log("Configurando manejador de eventos del boton.");

        $(document).on('click', '#cincr', App.handleIncr);
        $(document).on('click', '#cdecr', App.handleDecr);

    },

    handleIncr: function(event) {
        console.log("Se ha hecho Click en el botón.");

        event.preventDefault();

        web3.eth.getAccounts(function(error, accounts) {
            if (error) {
                console.log(error);
                return;
            }

            const account = accounts[0];

            console.log("Cuenta =", account);

            // Ejecutar incr como una transacción desde la cuenta account.
            App.contador.incr.sendTransaction({
                from: account,
                gas: 200000});
        });
    },

    handleDecr: function(event) {
        console.log("Se ha hecho Click en el botón.");

        event.preventDefault();

        web3.eth.getAccounts(function(error, accounts) {
            if (error) {
                console.log(error);
                return;
            }

            const account = accounts[0];

            console.log("Cuenta =", account);

            // Ejecutar incr como una transacción desde la cuenta account.
            App.contador.decr.sendTransaction({
                from: account,
                gas: 200000});
        });
    },


    refreshContador: function() {
        console.log("Refrescando el valor mostrado del contador.");

        var valor = App.contador.valor.call()

        console.log("Valor =", valor);

        $('#valor').text(valor ? valor.valueOf() : "XXX"); 
    }

};

// Ejecutar cuando se ha terminado de cargar la pagina.
$(function() {
  $(window).load(function() {
    App.init();
  });
});

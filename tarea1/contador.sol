pragma solidity ^0.4.24;

contract Contador {
    
    uint8 public valor = 0;
    
    event Tic(string msg, uint8 out);
        
    function incr() public {
        valor++;
        emit Tic("Actualizado", valor);
    }
    
    function decr() public {
        valor--;
        emit Tic("Actualizado", valor);
    }
    
    function() public { 
        revert(); 
    }
}
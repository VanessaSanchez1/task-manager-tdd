//COMENTAR EN CASO SE HAGA LA PRUEBA DE ERROR

//DEFINIR FUNCION PARA PRUEBA DE EXITO
function fizzBuzz(n) {
    if (n === 3) return "Fizz"; // lógica mínima
  }
  
  module.exports = fizzBuzz;


//FUNCION PARA PRUEBAS INCREMENTALES
function fizzBuzz(n) {
    if (n % 3 === 0 && n % 5 === 0) return "FizzBuzz";
    if (n % 3 === 0) return "Fizz";
    if (n % 5 === 0) return "Buzz";
    return n.toString();
  }
  
module.exports = fizzBuzz;

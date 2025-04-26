//SI SE HACE LA PRUEBA DE ERROR COMENTAR DE LA LINEA 11 EN ADELANTE

//PRUEBA DE ERROR --> no se agrego la logica
describe('Prueba de error', () => {
    it('debe devolver "Fizz" si el número es divisible por 3', () => {
      const resultado = fizzBuzz(10); // Aquí fallará, no existe aún
      expect(resultado).toBe("Fizz");
    });
  });


// SI SE HACE LAS PRUEBAS DE EXITO COMENTAR LAS LINEAS 3 AL 8 

//PRUEBA DE EXITO --> importamos la función
const fizzBuzz = require('./fizzbuzz');

describe('Prueba de Exito', () => {
  it('debe devolver "Fizz" si el número es divisible por 3', () => {
    const resultado = fizzBuzz(3);
    expect(resultado).toBe("Fizz");
  });
});

//PRUEBA DE EXITO CON MEJORAS --> DIVISIBLE X 5
it('debe devolver "Buzz" si el número es divisible por 5', () => {
    const resultado = fizzBuzz(5);
    expect(resultado).toBe("Buzz");
  });


//PRUEBA DE EXITO CON MEJORAS --> DIVISIBLE X 3 Y 5
it('debe devolver "FizzBuzz" si el número es divisible por 3 y 5', () => {
    const resultado = fizzBuzz(30);
    expect(resultado).toBe("FizzBuzz");
});



//PRUEBA 
it('debe devolver el número como string si no es divisible ni por 3 ni por 5', () => {
    const resultado = fizzBuzz(7);
    expect(resultado).toBe("7");
  });


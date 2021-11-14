/* POLIMORFISMO-- capacidad que tiene un objeto para tomar diferentes formas. */

//function constructor = Plantilla = Class
/* function Persona (nombre) {
    this.nombre = nombre;

    this.saludar = function () {
        return `${this.nombre}dice hola`;
    }//${this.nombre}-->interpolacion k llama a la propiedad nombre.
};
Persona.prototype.saludarIngles = function () {
    return `${this.nombre} says hi!`;
}

const juan = new Persona("juan");
const ana = new Persona("ana");
const tom = new Persona("tom");
console.log(juan);
console.log(ana.saludarIngles()); */

//OBJETO--Persona, clase padre
class Persona{
    constructor(nombre,edad){
        this.nombre = nombre;
        this.edad = edad;
    }
    //GETTER
    //la regla de los get es k no reciben parametros"()"cuando los llamamos se utiliza como una propiedad
    get getNombre(){
        return this.nombre;
    };
    //SETTER
    //solo recibe 1 parametro.
    set setNombre (nombre){
        this.nombre = nombre;
    };
    //METODO
    saludar(){
        return `${this.nombre} dice hola`;
    };
    //STATIC
    static probarSaludo(nombre){
        return `${nombre} probando saludo`;
    }
}
//Objeto Hijo - herencia con extends--clase hijo 
class Estudiante extends Persona{
    #notas = []// asi lo tenems privado,dentro del constructor estaria publico y sin #delente y necesitamos que get y set esten dentro del objeto para pintar el resultado
    /* constructor(nombre, edad )// si no le ponemos ninguna nota aparecera array
    {
        super(nombre,edad);//lo utiliazmos para k coja del padre la info k queremos que se repita.
        this.notas = notas;// nueva propiedad
    } */
    

    set setNotas(nota){

        this.#notas.push(nota);
    }
    get getNotas (){
        return this.#notas;
    }


    saludar(){
        return `${this.nombre} desde estudiante`;
    }
}




console.log(Persona.probarSaludo("maria"));//output: maria probando saludo/ STATIc

const juan = new Estudiante("juan", 32);//out; nombre:juan, edad:32

juan.setNotas = 4;
juan.setNotas = 7;
juan.setNotas = 7;

console.log(juan.getNotas)
//const ana = new Persona("ana");
//juan.setNombre = "ana";
//console.log(juan.getNombre);//sin parametros
//console.log(ana.saludar());// OUTPUT: ana dice hola



//Capturamos todos lo id
const formulario = document.querySelector(`#formulario`);
const cardsEstudiantes = document.querySelector(`#cardsEstudiantes`);
const cardsProfesores = document.querySelector(`#cardsProfesores `);
const templateEstudiante = document.querySelector(`#templateEstudiante `).content;
const templateProfesor = document.querySelector(`#templateProfesor`).content;


const estudiantes = [];
const profesores = [];

class Persona {
    constructor(nombre,edad){
        this.nombre = nombre;
        this.edad = edad;
    }
    static pintarPersonaUI(persona, tipo){
        if (tipo === "Estudiante"){
            cardsEstudiantes.textContent = "";
            const fragment =document.createDocumentFragment();
           
            persona.forEach((item) => {
             fragment.appendChild(item.agregarNuevoEstudiante());
        });
        
        cardsEstudiantes.appendChild(fragment);
        }
        if (tipo === "Profesro"){
             cardsProfesores.textContent = "";
             const fragment = document.createDocumentFragment();

             persona.forEach((item) => {
                 fragment.appendChild(item.agregarNuevoProfesor());
            });
            cardsProfesores.appendChild(fragment)
        };

    }
}
class Estudiante extends Persona{

    //propiedades privadas x eso usamos set y get
    #estado = false; 
    #estudiante = "Estudiante";

    set setEstado (estado){
        this.#estado = estado;
    }
    
    get getEstudiante (){
         return this.#estudiante;
    }
    agregaNuevoEstudiante(){
        const clone = templateEstudiante.cloneNode(true);
        clone.querySelector("h5 .text-secondary").textContent = this.nombre;

        return clone;
    }
};

class Profesor extends Persona {

    #profesor = "Profesor";
    agregarNuevoProfesor(){
        const clone = templateProfesor.cloneNode(true);
        clone.querySelecto('h5').textContent = this.nombre;
        clone.querySelecto('h6').textContent = this. #profesor;
        clone.querySelector('.lead').textContent = this.edad;
    
        return clone;
    }



};
formulario.addEventListener("submit", (e) =>{
    e.preventDefault();

    const datos = new FormData(formulario);
    const [nombre, edad, opcion] = [...datos.values()];
   
    if (opcion === "Estudiantes") {
        const estudiante = new Estudiante (nombre, edad);
        estudiantes.push(estudiante);
        Persona.pintarPersonaUI(estudiantes, opcion);

    }
    if (opcion === "Profesor") {
        const profesor = new Profesor (nombre, edad);
        profesores.push(profesor);
        Persona.pintarPersonaUI( profesores,  opcion);
    }  
     
});
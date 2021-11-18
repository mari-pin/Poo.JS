
//Capturamos todos lo id
const formulario = document.querySelector(`#formulario`);
const cardsEstudiantes = document.querySelector(`#cardsEstudiantes`);
const cardsProfesores = document.querySelector(`#cardsProfesores`);
const templateEstudiante = document.querySelector(`#templateEstudiante`).content;
const templateProfesor = document.querySelector(`#templateProfesor`).content;
const alert = document.querySelector('.alert');


const estudiantes = [];
const profesores = [];

//detccion del evento click
document.addEventListener("click", (e)=>{
    //console.log(e.target.dataset.nombre);
    if(e.target.dataset.nombre){
        //console.log(e.target.matches(".btn-success"))
        if(e.target.matches(".btn-success")){
            estudiantes.map((item) =>{
                console.log(e.target.matches(".btn-success"))
                if(item.nombre === e.target.dataset.nombre){
                    item.setEstado = true;
                }
                console.log(item);
                return item;
            });
        }
        if(e.target.matches(".btn-danger")){
            estudiantes.map((item) =>{
                if(item.nombre === e.target.dataset.nombre){
                    item.setEstado = false;
                }
                console.log(item);
                return item;
            });
        }
        Persona.pintarPersonaUI(estudiantes, "Estudiante");

    }

})

class Persona {
    constructor(nombre,edad){
        this.nombre = nombre;
        this.edad = edad;
        this.uid = Date.now();
        
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
        if (tipo === "Profesor"){
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
    //logica de la card estudiantes 
    agregarNuevoEstudiante(){
        const clone = templateEstudiante.cloneNode(true);
        clone.querySelector("h5 .text-secondary").textContent = this.nombre;
        clone.querySelector('h6').textContent = this.getEstudiante;
        clone.querySelector('.lead').textContent = this.edad;

        /* para k cambie el btn  de color al lado del nombre  */
        if (this.#estado) {
            clone.querySelector('.badge').className = "badge bg-succes";
            //activar y desactivar boton aprovado
            clone.querySelector ('.btn-success').disabled = true;
            clone.querySelector ('.btn-danger').disabled = false;
        }else{
            clone.querySelector('.badge').className = "badge bg-danger"
            //activar y desactivar boton suspendido
            clone.querySelector ('.btn-danger').disabled = true;
            clone.querySelector ('.btn-success').disabled = false;
        }
        //btn estado del estudiante
        clone.querySelector('.badge').textContent = this.#estado ? "Aprobado" : "Suspendido";

        //evento click boton
        clone.querySelector(".btn-success").dataset.nombre = this.nombre;
        clone.querySelector(".btn-danger").dataset.nombre = this.nombre;

        return clone;
    }
};

class Profesor extends Persona {

    #profesor = "Profesor";
    agregarNuevoProfesor(){
        const clone = templateProfesor.cloneNode(true);
        clone.querySelector('h5').textContent = this.nombre;
        clone.querySelector('h6').textContent = this. #profesor;
        clone.querySelector('.lead').textContent = this.edad;
        
    
        return clone;
    }



};
formulario.addEventListener("submit", (e) =>{
    e.preventDefault();
   // console.log('hola');

    //reinicia el programa y lanza la alerta
    alert.classList.add("d-none");

    const datos = new FormData(formulario);
    const [nombre, edad, opcion] = [...datos.values()];
    // comprobamos k se rellenan los espacios con datos y no con espacios vacios
    if (!nombre.trim() || !edad.trim() || !opcion.trim()) {
        console.log("algun dato en blanco");
        //elimina el alert si rellenamos bien
        alert.classList.remove("d-none");
        return;
    }

    //console.log(opcion);
    if (opcion === "Estudiante") {
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
let listaEnfermeras = [];

const enfermera ={
    id: '',
    c_i: '',
    apellido: '',
    nombre: '',
    especialidad:'',
    jornada: '',
}

let editando = false;

const ingreso = document.querySelector('#ingreso');
const c_iInput = document.querySelector('#c_i');
const apellidoInput = document.querySelector('#apellido');
const nombreInput = document.querySelector('#nombre');
const especialidadInput = document.querySelector('#especialidad');
const jornadaInput = document.querySelector('#jornada');
const btnAgregar = document.querySelector('#btnAgregar');

ingreso.addEventListener('submit', validarIngreso);

function validarIngreso(e) {
    e.preventDefault();

    if(c_iInput.value === '' || apellidoInput.value===''|| nombreInput.value===''||especialidadInput.value===''||jornadaInput.value==='') {
        alert('Todos los campos son obligatorios.');
        return;
    }

    if(editando) {
        editarEnfer();
        editando = false;
    } else {
        enfermera.id = Date.now();
        enfermera.c_i = c_iInput.value;
        enfermera.apellido = apellidoInput.value;
        enfermera.nombre = nombreInput.value;
        enfermera.especialidad = especialidadInput.value;
        enfermera.jornada = jornadaInput.value;

        agregarEnfer();
    }
}

function agregarEnfer() {
    listaEnfermeras.push({...enfermera});

    mostrarEnfer();

    ingreso.reset();

    
    limpiarObjeto();

}

function limpiarObjeto() {
    enfermera.id = '';
    enfermera.c_i = '';
    enfermera.apellido = '';
    enfermera.nombre = '';
    enfermera.especialidad = '';
    enfermera.jornada = '';
}

function mostrarEnfer() {

    limpiarHTML();

    const divEnfer = document.querySelector('.lista_enfer');

    listaEnfermeras.forEach( enfermeras => {
        const {id, c_i, apellido, nombre, especialidad, jornada} = enfermeras;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${c_i} - ${apellido} - ${nombre} - ${especialidad} - ${jornada} -` ;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEnfer(enfermeras);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btnEditar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEnfer(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btnEliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divEnfer.appendChild(parrafo);
        divEnfer.appendChild(hr);

    });
}   

function cargarEnfer(enfermeras) {
    const {id, c_i, apellido, nombre, especialidad, jornada} = enfermeras;

    c_iInput.value = c_i;
    apellidoInput.value = apellido;
    nombreInput.value = nombre;
    especialidadInput.value = especialidad;
    jornadaInput.value = jornada;

    enfermera.id = id;

    ingreso.querySelector('button[type="submit"]').textContent = 'Actualizar';

    editando = true;

}

function editarEnfer() {
    
    enfermera.c_i = c_iInput.value;
    enfermera.apellido = apellidoInput.value;
    enfermera.nombre = nombreInput.value;
    enfermera.especialidad = especialidadInput.value;
    enfermera.jornada = jornadaInput.value;

    listaEnfermeras.map(enfermeras => {

        if(enfermeras.id === enfermera.id) {
            enfermeras.id = enfermera.id;
            enfermeras.c_i = enfermera.c_i;
            enfermeras.apellido = enfermera.apellido;
            enfermeras.nombre = enfermera.nombre;
            enfermeras.especialidad = enfermera.especialidad;
            enfermeras.jornada = enfermera.jornada;
        }

    });

    limpiarHTML();
    mostrarEnfer();

    ingreso.reset();

    ingreso.querySelector('button[type="submit"]').textContent = 'Agregar';

    editando = false;
}

function eliminarEnfer(id) {

    listaEnfermeras = listaEnfermeras.filter(enfermeras => enfermeras.id !== id);

    limpiarHTML();
    mostrarEnfer();

}

function limpiarHTML() {
    const divEnfer = document.querySelector('.lista_enfer')
    while(divEnfer.firstChild) {
        divEnfer.removeChild(divEnfer.firstChild);        
    }
}

function Funcion(){
    location.href = "";//Página inicio
}

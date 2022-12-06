let listaPaci = [];

const paciente ={
    id: '',
    c_i: '',
    apellidos: '',
    nombres: '',
}

let editando = false;

const ingreso = document.querySelector('#ingreso');
const c_iInput = document.querySelector('#c_i');
const apellidosInput = document.querySelector('#apellidos');
const nombresInput = document.querySelector('#nombres');
const btnAgregar = document.querySelector('#btnAgregar');

ingreso.addEventListener('submit', validarIngreso);

function validarIngreso(e) {
    e.preventDefault();

    if(c_iInput.value === '' || apellidosInput.value===''|| nombresInput.value==='') {
        alert('Todos los campos son obligatorios.');
        return;
    }

    if(editando) {
        editarPaci();
        editando = false;
    } else {
        paciente.id = Date.now();
        paciente.c_i = c_iInput.value;
        paciente.apellidos = apellidosInput.value;
        paciente.nombres = nombresInput.value;

        agregarPaci();
    }
}

function agregarPaci() {
    listaPaci.push({...paciente});

    mostrarPaci();

    ingreso.reset();

    limpiarObjeto();

}

function limpiarObjeto() {
    paciente.id = '';
    paciente.c_i = '';
    paciente.apellidos = '';
    paciente.nombres = '';
}

function mostrarPaci() {

    limpiarHTML();

    const divPaci = document.querySelector('.lista_paci');

    listaPaci.forEach( pacientes => {
        const {id, c_i, apellidos, nombres} = pacientes;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${c_i} - ${apellidos} - ${nombres} - `;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarPaci(pacientes);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btnEditar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarPaci(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btnEliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divPaci.appendChild(parrafo);
        divPaci.appendChild(hr);


    });
}   

function cargarPaci(pacientes) {
    const {id, c_i, apellidos, nombres} = pacientes;

    c_iInput.value = c_i;
    apellidosInput.value = apellidos;
    nombresInput.value = nombres;

    paciente.id = id;

    ingreso.querySelector('button[type="submit"]').textContent = 'Actualizar';

    editando = true;

}

function editarPaci() {
    
    paciente.c_i = c_iInput.value;
    paciente.apellidos = apellidosInput.value;
    paciente.nombres = nombresInput.value;

    listaPaci.map(pacientes => {

        if(pacientes .id === paciente.id) {
            pacientes .id = paciente.id;
            pacientes .c_i = paciente.c_i;
            pacientes .apellidos =paciente.apellidos;
            pacientes .nombres = paciente.nombres;
        }

    });

    limpiarHTML();
    mostrarPaci();

    ingreso.reset();

    ingreso.querySelector('button[type="submit"]').textContent = 'Agregar';

    editando = false;
}

function eliminarPaci(id) {

    listaPaci = listaPaci.filter(pacientes => pacientes.id !== id);

    limpiarHTML();
    mostrarPaci();

}

function limpiarHTML() {
    const divPaci = document.querySelector('.lista_paci')
    while(divPaci.firstChild) {
        divPaci.removeChild(divPaci.firstChild);        
    }
}


function Funcion1(){
    location.href = "recet.html";//link recetas
}

function Funcion2(){
    location.href = "Diagnostico.html";//link diagnosticos
}
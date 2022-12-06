let listaDoctor = [];

const doctor ={
    id: '',
    c_i: '',
    apellido: '',
    nombre: '',
    jornada: '',
    horario: ''
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
        editarDoc();
        editando = false;
    } else {
        doctor.id = Date.now();
        doctor.c_i = c_iInput.value;
        doctor.apellido = apellidoInput.value;
        doctor.nombre = nombreInput.value;
        doctor.especialidad = especialidadInput.value;
        doctor.jornada = jornadaInput.value;

        agregarDoc();
    }
}

function agregarDoc() {
    listaDoctor.push({...doctor});

    mostrarDoc();

    ingreso.reset();

    limpiarObjeto();

}

function limpiarObjeto() {
    doctor.id = '';
    doctor.c_i = '';
    doctor.apellido = '';
    doctor.nombre = '';
    doctor.jornada = '';
    doctor.horario = '';
}

function mostrarDoc() {

    limpiarHTML();

    const divDoc = document.querySelector('.lista_doc');

    listaDoctor.forEach( doctores => {
        const {id, c_i, apellido, nombre, especialidad, jornada} = doctores;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${c_i} - ${apellido} - ${nombre} - ${especialidad} - ${jornada} - `;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarDoc(doctores);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btnEditar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarDoc(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btnEliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divDoc.appendChild(parrafo);
        divDoc.appendChild(hr);


    });
}   

function cargarDoc(doctores) {
    const {id, c_i, apellido, nombre, especialidad, jornada} = doctores;

    c_iInput.value = c_i;
    apellidoInput.value = apellido;
    nombreInput.value = nombre;
    especialidadInput.value = especialidad;
    jornadaInput.value = jornada;

    doctor.id = id;

    ingreso.querySelector('button[type="submit"]').textContent = 'Actualizar';

    editando = true;

}

function editarDoc() {
    
    doctor.c_i = c_iInput.value;
    doctor.apellido = apellidoInput.value;
    doctor.nombre = nombreInput.value;
    doctor.especialidad = especialidadInput.value;
    doctor.jornada = jornadaInput.value;

    listaDoctor.map(doctores => {

        if(doctores.id === doctor.id) {
            doctores.id = doctor.id;
            doctores.c_i = doctor.c_i;
            doctores.apellido = doctor.apellido;
            doctores.nombre = doctor.nombre;
            doctores.especialidad = doctor.especialidad;
            doctores.jornada = doctor.jornada;
        }

    });

    limpiarHTML();
    mostrarDoc();

    ingreso.reset();

    ingreso.querySelector('button[type="submit"]').textContent = 'Agregar';

    editando = false;
}

function eliminarDoc(id) {

    listaDoctor = listaDoctor.filter(doctores => doctores.id !== id);

    limpiarHTML();
    mostrarDoc();

}

function limpiarHTML() {
    const divDoc = document.querySelector('.lista_doc')
    while(divDoc.firstChild) {
        divDoc.removeChild(divDoc.firstChild);        
    }
}

function Funcion(){
    location.href = "";//Link Pagina Inicio
}
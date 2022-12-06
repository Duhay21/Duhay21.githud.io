let listaPaciente = [];

const objPaciente = {
    id: '',
    Nombre:'',
    Apellidos:'',
    Diagnostico:'',
    Doctor:''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const NombreInput = document.querySelector('#Nombre');
const ApellidosInput = document.querySelector('#Apellidos');
const DiagnosticoInput = document.querySelector('#Diagnostico');
const DoctorInput = document.querySelector('#Doctor');
const btnAgregar = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarformulario);

function validarformulario(e) {
    e.preventDefault();

    if(NombreInput.value === '' || ApellidosInput.value === '' || DiagnosticoInput.value === '' || DoctorInput.value === '') {
        alert('Todos los campos son obligatorios.');
        return;
    }

    if(editando) {
        editarPaciente();
        editando = false;
    } 
    else {
        objPaciente.id = Date.now();
        objPaciente.Nombre = NombreInput.value;
        objPaciente.Apellidos = ApellidosInput.value;
        objPaciente.Diagnostico = DiagnosticoInput.value;
        objPaciente.Doctor = DoctorInput.value;

        agregarPaciente();
    }
}

function agregarPaciente() {
    listaPaciente.push({...objPaciente});

    mostrarPacientes();

    formulario.reset();

    limpiarObjeto();

}
function limpiarObjeto(){
    objPaciente.id = '';
    objPaciente.Nombre='';
    objPaciente.Apellidos='';
    objPaciente.Diagnostico='';
    objPaciente.Doctor='';

}

function mostrarPacientes() {

    limpiarHTML();

    const divPaciente = document.querySelector('.div-pacientes');

    listaPaciente.forEach( paciente => {
        const {id, Nombre, Apellidos, Diagnostico, Doctor} = paciente;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${Nombre} - ${Apellidos} - ${Diagnostico} - ${Doctor} - `;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarPaciente(paciente);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarPaciente(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divPaciente.appendChild(parrafo);
        divPaciente.appendChild(hr);
    });
}

function cargarPaciente(paciente) {
    const {id, Nombre, Apellidos, Diagnostico, Doctor} = paciente;
    NombreInput.value = Nombre;
    ApellidosInput.value = Apellidos;
    DiagnosticoInput.value = Diagnostico;
    DoctorInput.value = Doctor;

    objPaciente.id = id;

    formulario.querySelector('button[type="submit"]').textContent= 'Actualizar';

    editando = True;
}

function editarPaciente() {
    objPaciente.Nombre = NombreInput.value;
    objPaciente.Apellidos = ApellidosInput.value;
    objPaciente.Diagnostico = DiagnosticoInput.value;
    objPaciente.Doctor = DoctorInput.value;

    listaPaciente.map(paciente => {
        if(paciente.id === objPaciente.id) {
            paciente.id = objPaciente.id;
            paciente.Nombre = objPaciente.Nombre;
            paciente.Apellidos = objPaciente.Apellidos;
            paciente.Diagnostico = objPaciente.Diagnostico;
            paciente.Doctor = objPaciente.Doctor;
        }
    })

    limpiarHTML();
    mostrarPacientes();

    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';

    editando = false;
}

function eliminarPaciente(id) {
    listaPaciente = listaPaciente.filter(paciente => paciente.id !== id);

    limpiarHTML();
    mostrarPacientes();

}

function limpiarHTML() {
    const divPaciente = document.querySelector('.div-pacientes');
    while(divPaciente.firstChild) {
        divPaciente.removeChild(divPaciente.firstChild);
    }
}

function funcion() {
    location.href= "";/Inicio/
}

function funcion1() {
    location.href= ""; /Atras/
}
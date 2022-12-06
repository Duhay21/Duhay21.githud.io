let listaHorarios =[];

const objHorario={
    id:'',
    Especialidad:'',
    Doctor:'',
    Dia:'',
    Desde:'',
    Hasta:''
}

let editando = false;

const Formulario= document.querySelector('#Formulario');
const EspecialidadInput= document.querySelector('#Especialidad');
const DoctorInput= document.querySelector('#Doctor');
const DiaInput= document.querySelector('#Dia');
const DesdeInput= document.querySelector('#Desde');
const HastaInput= document.querySelector('#Hasta');
const btnAgregar = document.querySelector('#btnAgregar');

Formulario.addEventListener('submit',validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(EspecialidadInput.value === ''|| DoctorInput.value === '' || DiaInput.value ==='' || DesdeInput.value ==='' || HastaInput.value ==='') {
        alert('Todos los campos son obligatorios');
        return;
    }

    if(editando){
        editarHorario();
        editando= false;
    } 
    else {
        objHorario.id = Date.now();
        objHorario.Especialidad= EspecialidadInput.value;
        objHorario.Doctor = DoctorInput.value;
        objHorario.Dia = DiaInput.value;
        objHorario.Desde = DesdeInput.value;
        objHorario.Hasta = HastaInput.value;

        AgregarHorario();
    }
}

function AgregarHorario(){
    listaHorarios.push({...objHorario});

    mostrarHorario();
    Formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto(){
    objHorario.id= '';
    objHorario.Especialidad= '';
    objHorario.Doctor= '';
    objHorario.Dia= '';
    objHorario.Desde= '';
    objHorario.Hasta= '';
}


function mostrarHorario() {
    limpiarHTML();

    const divEmpleado = document.querySelector('.div-empleados');

    listaHorarios.forEach( horario => {
        const{id,Especialidad,Doctor,Dia,Desde,Hasta} = horario;
    
        const parrafo = document.createElement('p');
        parrafo.textContent= `${id} - ${Especialidad} - ${Doctor} - ${Dia} - ${Desde} - ${Hasta} -`;
        parrafo.dataset.id= id;

        const editarBoton= document.createElement('button');
        editarBoton.onclick= () => CargarHorario( horario);
        editarBoton.textContent= 'Editar';
        editarBoton.classList.add('btn', 'btn-Editar');
        parrafo.append(editarBoton);

        const eliminarBoton= document.createElement('button');
        eliminarBoton.onclick= () => eliminarHorario( id);
        eliminarBoton.textContent= 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-Eliminar');
        parrafo.append(eliminarBoton);

        const hr= document.createElement('hr');

        divEmpleado.appendChild(parrafo);
        divEmpleado.appendChild(hr);
    });
}

function CargarHorario(horario){
    const{id,Especialidad,Doctor,Dia,Desde,Hasta} = horario;

    EspecialidadInput.value = Especialidad;
    DoctorInput.value = Doctor;
    DiaInput.value = Dia;
    DesdeInput.value = Desde;
    HastaInput.value = Hasta;

    objHorario.id = id;

    Formulario.querySelector('button[type="submit"]').textContent= 'Actualizar';
    editando= true;
}

function editarHorario(){
    objHorario.Especialidad= EspecialidadInput.value;
    objHorario.Doctor= DoctorInput.value;
    objHorario.Dia= DiaInput.value;
    objHorario.Desde= DesdeInput.value;
    objHorario.Hasta=  HastaInput.value;

    listaHorarios.map(horario =>{
        if( horario.id === objHorario.id) {
            horario.Especialidad =  objHorario.Especialidad;
            horario.Doctor = objHorario.Doctor;
            horario.Dia = objHorario.Dia;
            horario.Desde = objHorario.Desde;
            horario.Hasta = objHorario.Hasta;
        }
    });

    limpiarHTML();
    mostrarHorario();

    Formulario.reset();
    Formulario.querySelector('button[type="submit"]').textContent = 'Agregar';

    editando=false;
}
function eliminarHorario(id){
    listaHorarios = listaHorarios.filter( horario=>  horario.id !== id);

    limpiarHTML();
    mostrarHorario();
}

function limpiarHTML(){
    const divEmpleado= document.querySelector('.div-empleados');
    while(divEmpleado.firstChild) {
        divEmpleado.removeChild(divEmpleado.firstChild);
    }

}


let listaconsultas=[];

const objconsultas={
    id:'',
    nom:'',
    apellido:'',
    cedula:'',
    s_medico:'',
    fecha_consulta: '',
    hora_consulta: ''
}

let editando = false;

const formulario= document.querySelector('#formulario');
const nomInput= document.querySelector('#nombre');
const apellidoInput= document.querySelector('#apellidos');
const cedulaInput= document.querySelector('#cedula')
const s_medicoInput= document.querySelector('#servicio');
const fecha_consultaInput= document.querySelector('#fecha');
const hora_consultaInput= document.querySelector('#hora');
const btnagendar = document.querySelector('#btnagendar');

formulario.addEventListener('submit',validarformulario);

function validarformulario(e) {
    e.preventDefault();

    if(nomInput.value === ''|| apellidoInput.value === '' || cedulaInput.value ==='' || s_medicoInput.value ==='' || fecha_consultaInput.value ==='' || hora_consultaInput.value ==='') {
        alert('Todos los campos son obligatorios');
        return;
    }

    if(editando){
        editarconsulta();
        editando= false;
    } 
    else {
        objconsultas.id = Date.now();
        objconsultas.nom= nomInput.value;
        objconsultas.apellido = apellidoInput.value;
        objconsultas.cedula = cedulaInput.value;
        objconsultas.s_medico = s_medicoInput.value;
        objconsultas.fecha_consulta = fecha_consultaInput.value;
        objconsultas.hora_consulta = hora_consultaInput.value;


        agregarconsulta();
    }
}

function agregarconsulta(){
    listaconsultas.push({...objconsultas});

    mostrarconsultas();
    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto(){
    objconsultas.id= '';
    objconsultas.nom= '';
    objconsultas.apellido= '';
    objconsultas.cedula= '';
    objconsultas.s_medico= '';
    objconsultas.fecha_consulta= '';
    objconsultas.hora_consulta= '';  
}


function mostrarconsultas() {
    limpiarHTML();

    const divconsultas = document.querySelector('.div-consultas');

    listaconsultas.forEach( consulta => {
        const{id,nom,apellido,cedula,s_medico,fecha_consulta,hora_consulta} = consulta;
    
        const parrafo = document.createElement('p');
        parrafo.textContent= `${id} - ${nom} - ${apellido} - ${cedula} - ${s_medico} - ${fecha_consulta} - ${hora_consulta}`;
        parrafo.dataset.id= id;

        const editarBoton= document.createElement('button');
        editarBoton.onclick= () => Cargarconsulta( consulta);
        editarBoton.textContent= 'Editar';
        editarBoton.classList.add('btn', 'btn-Editar');
        parrafo.append(editarBoton);

        const eliminarBoton= document.createElement('button');
        eliminarBoton.onclick= () => eliminarconsulta( id);
        eliminarBoton.textContent= 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-Eliminar');
        parrafo.append(eliminarBoton);

        const hr= document.createElement('hr');

        divconsultas.appendChild(parrafo);
        divconsultas.appendChild(hr);
    });
}

function Cargarconsulta(consulta){
    const {id ,nom,apellido,cedula,s_medico,fecha_consulta,hora_consulta} = consulta;

    nomInput.value = nom;
    apellidoInput.value = apellido;
    cedulaInput.value = cedula;
    s_medicoInput.value = s_medico;
    fecha_consultaInput.value = fecha_consulta;
    hora_consultaInput.value = hora_consulta;


    objconsultas.id = id;

    formulario.querySelector('button[type="submit"]').textContent= 'Actualizar';
    editando= true;
}

function editarconsulta(){
    objconsultas.nom= nomInput.value;
    objconsultas.apellido= apellidoInput.value;
    objconsultas.cedula= cedulaInput.value;
    objconsultas.s_medico= s_medicoInput.value;
    objconsultas.fecha_consulta= fecha_consultaInput.value;
    objconsultas.hora_consulta= hora_consultaInput.value;

    listaconsultas.map(consulta =>{
        if( consulta.id === objconsultas.id) {

            consulta.id = objconsultas.id;
            consulta.nom =  objconsultas.nom;
            consulta.apellido = objconsultas.apellido;
            consulta.cedula = objconsultas.cedula;
            consulta.s_medico = objconsultas.s_medico;
            consulta.fecha_consulta = objconsultas.fecha_consulta;
            consulta.hora_consulta = objconsultas.hora_consulta;

        }
    });

    limpiarHTML();
    mostrarconsultas();

    formulario.reset();
    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';

    editando=false;
}
function eliminarconsulta(id){
    listaconsultas = listaconsultas.filter( consulta=>  consulta.id !== id);

    limpiarHTML();
    mostrarconsultas();
}

function limpiarHTML(){
    const divconsultas= document.querySelector('.div-consultas');
    while(divconsultas.firstChild) {
        divconsultas.removeChild(divconsultas.firstChild);
    }
}
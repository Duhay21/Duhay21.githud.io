let listaEmpleados = [];

const objEmpleado = {
    id: '',
    paciente: '',
    medicamento: '',
    cantidad_recetada:'',
    dosis:'',
    frecuencia:'',
    duracion:'',
    administracion:'',
    valor:''

}

let editando = false;

const formulario = document.querySelector('#formulario');
const pacienteInput = document.querySelector('#paciente');
const medicamentoInput = document.querySelector('#medicamento');
const cantidad_recetadaInput = document.querySelector('#cantidad_recetada');
const dosisInput = document.querySelector('#dosis');
const frecuenciaInput = document.querySelector('#frecuencia');
const duracionInput = document.querySelector('#duracion');
const administracionInput = document.querySelector('#administracion');
const valorInput = document.querySelector('#valor');

const btnAgregar = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarformulario);

function validarformulario(e) {
    e.preventDefault();

    if(pacienteInput.value === '' || medicamentoInput.value === '' || cantidad_recetadaInput.value === '' || dosisInput.value === '' || frecuenciaInput.value === '' || duracionInput.value === '' || administracionInput.value === '' || valorInput.vale ==='') {
        alert('Todos los campos son obligatorios');
        return;
    }

    if(editando) {
        editarEmpleado();
        editando = false;
    } else {
        objEmpleado.id = Date.now();
        objEmpleado.paciente = pacienteInput.value;
        objEmpleado.medicamento = medicamentoInput.value;
        objEmpleado.cantidad_recetada = cantidad_recetadaInput.value;
        objEmpleado.dosis = dosisInput.value;
        objEmpleado.frecuencia = frecuenciaInput.value;
        objEmpleado.duracion = duracionInput.value;
        objEmpleado.administracion = administracionInput.value;
        objEmpleado.valor = valorInput.value;
        
        agregarEmpleado();
    }
}

function agregarEmpleado() {
    listaEmpleados.push({...objEmpleado});

    mostrarEmpleados();
    formulario.reset();
    limpiarObjeto();

}

function limpiarObjeto() {
    objEmpleado.id = '';
    objEmpleado.paciente = '';
    objEmpleado.medicamento = '';
    objEmpleado.cantidad_recetada = '';
    objEmpleado.dosis = '';
    objEmpleado.frecuencia = '';
    objEmpleado.duracion = '';
    objEmpleado.administracion = '';
    objEmpleado.valor = '';

}

function mostrarEmpleados() {
    limpiarHTML();
    const divEmpleados = document.querySelector('.div-empleados');


    listaEmpleados.forEach(empleado => {
        const {id, paciente, medicamento, dosis, cantidad_recetada, frecuencia, duracion, administracion, valor} = empleado;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${paciente} - ${medicamento} - ${dosis} - ${cantidad_recetada} - ${frecuencia} - ${duracion} - ${administracion} - ${valor}` ;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEmpleado(empleado);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEmpleado(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divEmpleados.appendChild(parrafo);
        divEmpleados.appendChild(hr);


    });
}

function cargarEmpleado(empleado) {

    const {id, paciente, medicamento, dosis, cantidad_recetada, frecuencia, duracion, administracion, valor} = empleado;

    paciente.value = paciente;
    medicamento.value = medicamento;
    cantidad_recetada.value = cantidad_recetada;
    dosisInput.value = dosis;
    frecuencia.value = frecuencia;
    duracion.value = duracion;
    administracion.value = administracion;
    valor.vale = valor


    objEmpleado.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';

    editando = true;
}

function editarEmpleado() {
    objEmpleado.paciente = pacienteInput.value
    objEmpleado.medicamento = medicamentoInput.value
    objEmpleado.cantidad_recetada = cantidad_recetadaInput.value;
    objEmpleado.dosis = dosisInput.value;
    objEmpleado.frecuencia = frecuenciaInput.value;
    objEmpleado.duracion = duracionInput.value;
    objEmpleado.administracion = administracionInput.value;
    objEmpleado.valor = valorInput.value;

    

    listaEmpleados.map(empleado =>{
        if(empleado.id === objEmpleado.id) {
            empleado.id = objEmpleado.id;
            empleado.paciente = objEmpleado.paciente;
            empleado.medicamento = objEmpleado.medicamento;
            empleado.cantidad_recetada = objEmpleado.cantidad_recetada;
            empleado.dosis = objEmpleado.dosis;
            empleado.frecuencia = objEmpleado.frecuencia;
            empleado.duracion = objEmpleado.duracion;
            empleado.administracion = objEmpleado.administracion;
            empleado.valor = objEmpleado.valor;

        }
    });

    limpiarHTML();
    mostrarEmpleados();
    
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent ='Agregar';

    editando = false;
}

function eliminarEmpleado(id) {

    listaEmpleados = listaEmpleados.filter(empleado => empleado.id !== id);

    limpiarHTML();
    mostrarEmpleados();
}

function limpiarHTML() {
    const divEmpleados = document.querySelector(".div-empleados");
    while(divEmpleados.firstChild) {
        divEmpleados.removeChild(divEmpleados.firstChild);
    }
}

function Funcion() {
    location.href= "Principal.html";/Inicio/
}

function Funcion1() {
    location.href= "Pacientes.html"; /Atras/
}
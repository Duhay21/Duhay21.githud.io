let listaMedicamento =[];

const objMedicamento={
    id:'',
    Medicamentos:'',
    Presentacion:'',
    Via_Administracion:'',
    Disoluciones:'',
}

let editando = false;

const Medicamento= document.querySelector('#Medicamento');
const MedicamentosInput= document.querySelector('#Medicamentos');
const PresentacionInput= document.querySelector('#Presentacion');
const Via_AdministracionInput= document.querySelector('#Via_Administracion');
const DisolucionesInput= document.querySelector('#Disoluciones');
const btnAgregar = document.querySelector('#btnAgregar');

Medicamento.addEventListener('submit',validarMedicamento);

function validarMedicamento(e) {
    e.preventDefault();

    if(MedicamentosInput.value === ''|| PresentacionInput.value === '' || Via_AdministracionInput.value ==='' || DisolucionesInput.value ==='' ) {
        alert('Todos los campos son obligatorios');
        return;
    }

    if(editando){
        editarMedicamento();
        editando= false;
    } 
    else {
        objMedicamento.id = Date.now();
        objMedicamento.Medicamentos= MedicamentosInput.value;
        objMedicamento.Presentacion = PresentacionInput.value;
        objMedicamento.Via_Administracion = Via_AdministracionInput.value;
        objMedicamento.Disoluciones = DisolucionesInput.value;

        AgregarMedicamento();
    }
}

function AgregarMedicamento(){
    listaMedicamento.push({...objMedicamento});

    mostrarMedicamento();
    Medicamento.reset();
    limpiarObjeto();
}

function limpiarObjeto(){
    objMedicamento.id= '';
    objMedicamento.Medicamentos= '';
    objMedicamento.Presentacion= '';
    objMedicamento.Via_Administracion= '';
    objMedicamento.Disoluciones= '';
}


function mostrarMedicamento() {
    limpiarHTML();

    const divMedicamento = document.querySelector('.div-medicamento');

    listaMedicamento.forEach( medicamento => {
        const{id,Medicamentos,Presentacion,Via_Administracion,Disoluciones} = medicamento;
    
        const parrafo = document.createElement('p');
        parrafo.textContent= `${id} - ${Medicamentos} - ${Presentacion} - ${Via_Administracion} - ${Disoluciones} -`;
        parrafo.dataset.id= id;

        const editarBoton= document.createElement('button');
        editarBoton.onclick= () => CargarMedicamento( medicamento);
        editarBoton.textContent= 'Editar';
        editarBoton.classList.add('btn', 'btn-Editar');
        parrafo.append(editarBoton);

        const eliminarBoton= document.createElement('button');
        eliminarBoton.onclick= () => eliminarMedicamento( id);
        eliminarBoton.textContent= 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-Eliminar');
        parrafo.append(eliminarBoton);

        const hr= document.createElement('hr');

        divMedicamento.appendChild(parrafo);
        divMedicamento.appendChild(hr);
    });
}

function CargarMedicamento(medicamento){
    const{id,Medicamentos,Presentacion,Via_Administracion,Disoluciones} = medicamento;
    

    MedicamentosInput.value = Medicamentos;
    PresentacionInput.value = Presentacion;
    Via_Administracion.value = Via_Administracion;
    DisolucionesInput.value = Disoluciones;

    objMedicamento.id = id;

    Medicamento.querySelector('button[type="submit"]').textContent= 'Actualizar';
    editando= true;
}

function editarMedicamento(){
    objMedicamento.Medicamentos= MedicamentosInput.value;
    objMedicamento.Presentacion= PresentacionInput.value;
    objMedicamento.Via_Administracion= Via_AdministracionInput.value;
    objMedicamento.Disoluciones= DisolucionesInput.value;

    listaMedicamento.map(medicamento =>{
        if( medicamento.id === objMedicamento.id) {
            medicamento.id = objMedicamento.id;
            medicamento.Medicamentos =  objMedicamento.Medicamentos;
            medicamento.Presentacion = objMedicamento.Presentacion;
            medicamento.Via_Administracion = objMedicamento.Via_Administracion;
            medicamento.Disoluciones = objMedicamento.Disoluciones;
        }
    });

    limpiarHTML();
    mostrarMedicamento();

    Medicamento.reset();
    Medicamento.querySelector('button[type="submit"]').textContent = 'Agregar';

    editando=false;
}
function eliminarMedicamento(id){
    listaMedicamento = listaMedicamento.filter( medicamento=>  medicamento.id !== id);

    limpiarHTML();
    mostrarMedicamento();
}

function limpiarHTML(){
    const divMedicamento= document.querySelector('.div-medicamento');
    while(divMedicamento.firstChild) {
        divMedicamento.removeChild(divMedicamento.firstChild);
    }

}
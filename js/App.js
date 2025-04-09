const Ingresos = 
[
    new Ingreso ('Salario', 2100),
    new Ingreso ('Venta coche', 1500)

];

const Egresos = 
[
    new Egreso ('Renta departamento',900),
    new Egreso ('Ropa',400)
];

let cargarApp = () =>
{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();

}

let totalIngresos = () =>
{
    let totalIngreso = 0;
    for(let ingreso of Ingresos)
    {
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos = () =>
{
    let totalEgresos = 0;
    for(let egreso of Egresos)
    {
        totalEgresos += egreso.valor;
    }

    return totalEgresos;
}

let cargarCabecero = () =>
{

    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());

}

const formatoMoneda = (valor)=>
{
    //INTERNACIONALIZACION 'lenguague-pais' , se recibe un objeto el cual tendra un estilo (depende de lo que quiere realizar)
    return valor.toLocaleString('en-US',{style: 'currency', currency: 'USD', minimumFractionDigits:2});

}

const formatoPorcentaje = (valor) =>
{
    return valor.toLocaleString('en-US',{style:'percent',minimumFractionDigits:2})
}

const cargarIngresos = () =>
{
    let ingresosHTML = '';
    for(let ingreso of Ingresos)
    {
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;

}

const crearIngresoHTML= (ingreso)=>
{
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
      <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
      <div class="elemento_eliminar">
        <button class="elemento_eliminar--btn">
            <ion-icon name="close-circle-outline"
            onclick='eliminarIngreso(${ingreso.idIngreso})'></ion-icon>
        </button>
      </div>
    </div>
  </div>
    `;
    return ingresoHTML;
}

const eliminarIngreso = (id) =>
{
    //ESTA DECLARACION ES SIMILAR A ITERAR UN ARREGLO A MANERA DE FUNCION FLECHA
    //FUNCION findIndex()Permite encontrar el indice del arreglo
    //for (let ingreso of Ingresos)
    let indiceEliminar = Ingresos.findIndex(ingreso => ingreso.idIngreso === id);
    //Permite eliminar solo un elemento en el segundo parametro
    Ingresos.splice(indiceEliminar,1);
    cargarCabecero();
    cargarIngresos();

}

const eliminarEgreso = (id)=>
{
    let indiceEliminar = Egresos.findIndex(egreso => egreso.idEgreso === id);
    Egresos.splice(indiceEliminar,1);
    cargarCabecero();
    cargarEgresos();
}

let agregarDato = () =>
{
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor  = forma['valor'];

    if(descripcion.value !=='' && valor.value !=='')
    {
        if(tipo.value ==='ingreso')
        {
            //CONVERSION AUTOMATICA EN JAVASCRIPT PARA TRANSFORMAR A UN VALOR NUMERICO
            //+(valor)
            Ingresos.push(new Ingreso(descripcion.value,+(valor.value)));
            cargarCabecero();
            cargarIngresos();

        }else if(tipo.value ==='egreso')
        {
            Egresos.push(new Egreso (descripcion.value , +(valor.value)));
            cargarCabecero();
            cargarEgresos();

        }
    }
}

const cargarEgresos = () =>
{
    let egresosHTML = '';
    for (let egreso of Egresos)
    {
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso) =>
{
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${egreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">-${formatoMoneda(egreso.valor)}</div>
                        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close-circle-outline"
                                onclick='eliminarEgreso(${egreso.idEgreso})'></ion-icon>
                            </button>
                        </div>
                    </div>
                    
                </div>
    `;

    return egresoHTML;
} 
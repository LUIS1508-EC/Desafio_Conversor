const origen_moneda = document.querySelector("#origen_moneda");
const selecciona_moneda = document.querySelector("#selecciona_moneda");
const cuadro_monedas = document.querySelector("#cuadro_monedas");
const resultado = document.querySelector("#resultado");

const find = async (monedas) => {
    try {
        const respuesta = await fetch(`https://mindicador.cl/api/${monedas}`);
        const { serie: data } = await respuesta.json();
        return { lastValue: data[0].valor, allValue: data };
      
} catch (error) {
    console.log(error)
}
}


const convertirmonedas = async () => {
    try {
        if(!origen_moneda.value) {alert("Ingrese el monto en Pesos"); return;}
        if(!selecciona_moneda) {alert("Seleccione Moneda"); return;}

        const datos = await find(selecciona_moneda.value)

        resultado.innerHTML = `Resultado: $${(origen_moneda.value / datos.lastValue).toFixed(2)}`
getDataLabelChart(datos.allValue);

    } catch (error){
        console.log(error)
    }
}

// Crear gráfico sin data
let diezultimos = new Chart(cuadro_monedas, {
    type: 'line',
    data: { labels: [], datasets: [{ label: 'Historial últimos 10 días', data: [], borderWidth: 1 }] },
    options: { scales: { y: { beginAtZero: false } } }
});

const getDataLabelChart = async (data) => {
    try {
        // Eliminar grafico anterior
        diezultimos.destroy();
        // Rescatar datos para mostrar en grafico
        const tabla = await data.map(label => new Intl.DateTimeFormat('es-CL').format(new Date(label.fecha)));
        const datostabla = await data.map(data => data.valor);
        // Transformar datos para mostrar en grafico
        const ultimosdiez = tabla.splice(0, 10).reverse();
        const lastTenData = datostabla.splice(0, 10).reverse();
        // Crear nuevo grafico con datos rescatados
        diezultimos = new Chart(cuadro_monedas, {
            type: 'line',
            data: { labels: ultimosdiez, datasets: [{ label: 'Historial últimos 10 días', data: lastTenData, borderWidth: 1 }] },
            options: { scales: { y: { beginAtZero: false } } }
        });
    } catch (error) {
        console.log(error)
    }
}


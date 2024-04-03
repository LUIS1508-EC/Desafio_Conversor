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
document.getElementById('form-estadistica').addEventListener('submit', function (event) {
    //hace que la pagina no se cargue automaticamente
    event.preventDefault();

    // Capturar el texto del input y transformarlo en un Arreglo de Numeros
    const textoInput = document.getElementById('datos-ventas').value;

    // Convertimos la cadena de texto en numeros reales 
    const listaNumeros = textoInput.split(',')
        .map(num => parseFloat(num.trim()))
        .filter(num => !isNaN(num));

    // Validacion de seguridad: Asegurarse de que el usuario ingresó datos válidos
    if (listaNumeros.length === 0) {
        alert("Por favor, ingresa una lista válida de números separados por comas.");
        return;
    }

    // CALCULO DE ESTADISTICA
    

    // CALCULAR LA MEDIA (EL PROMEDIO)
    const sumaTotal = listaNumeros.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
    const media = sumaTotal / listaNumeros.length;


    //CALCULAR LA MEDIANA (EL Valor Central)
    // Ordenamos la lista de menor a mayor
    const listaOrdenada = [...listaNumeros].sort((a, b) => a - b);
    const mitad = Math.floor(listaOrdenada.length / 2);
    let mediana;

    if (listaOrdenada.length % 2 !== 0) {
        // si el numero es impar tomamos el del centro
        mediana = listaOrdenada[mitad];
    } else {
        //si es par, promediamos los dos valores del centro
        mediana = (listaOrdenada[mitad - 1] + listaOrdenada[mitad]) / 2;
    }


    // CALCULAR LA MODA (ES el que mas se repite)
    const frecuencias = {};
    let maxFrecuencia = 0;
    let modas = [];

    // Contamos cuántas veces se repite cada numero
    listaNumeros.forEach(num => {
        frecuencias[num] = (frecuencias[num] || 0) + 1;
        if (frecuencias[num] > maxFrecuencia) {
            maxFrecuencia = frecuencias[num];
        }
    });

    // Identificamos cual o cuales son los numeros con la frecuencia maxima
    for (const num in frecuencias) {
        if (frecuencias[num] === maxFrecuencia && maxFrecuencia > 1) {
            modas.push(num);
        }
    }

    // Formateamos la respuesta de la moda para el usuario
    const resultadoModa = modas.length > 0 ? modas.join(', ') : "No hay moda (ningun dato se repite)";


    // RESULTADOS
    const contenedorResultado = document.getElementById('resultado');

    contenedorResultado.innerHTML = `
        <div style="background-color: #e8f4f8; border-left: 5px solid #2980b9; padding: 15px; border-radius: 4px;">
            <p style="color: #2980b9; margin: 0 0 10px 0; font-size: 18px;"><strong>Reporte de Analisis Estadistico</strong></p>
            <ul style="list-style: none; padding: 0; margin: 0; line-height: 1.8;">
                <li><strong>Total de Registros Analizados:</strong> ${listaNumeros.length} dias</li>
                <li><strong>Media (Promedio de Ventas):</strong> $${media.toFixed(2)}</li>
                <li><strong>Mediana (Valor Central):</strong> $${mediana.toFixed(2)}</li>
                <li><strong>Moda (Tendencia de Consumo):</strong> ${resultadoModa}</li>
            </ul>
        </div>
    `;
});

// ==========================================
// CONTROL DEL TEST DE ESTADÍSTICA
// ==========================================
document.getElementById('form-test').addEventListener('submit', function(event) {
    event.preventDefault();

    // Capturar la opción marcada de cada pregunta
    const r1 = document.querySelector('input[name="p1"]:checked');
    const r2 = document.querySelector('input[name="p2"]:checked');
    const r3 = document.querySelector('input[name="p3"]:checked');
    const r4 = document.querySelector('input[name="p4"]:checked');
    const r5 = document.querySelector('input[name="p5"]:checked');

    // Validación de seguridad: Validar que todo esté contestado
    if (!r1 || !r2 || !r3 || !r4 || !r5) {
        alert("Por favor, responde las 5 preguntas antes de solicitar la calificación.");
        return;
    }

    // Contar cuántas respuestas tienen el valor "correcto"
    let aciertos = 0;
    const respuestas = [r1, r2, r3, r4, r5];

    respuestas.forEach(res => {
        if (res.value === "correcto") {
            aciertos++;
        }
    });

    // Renderizar los resultados de la evaluación con estilos integrados
    const contenedorTest = document.getElementById('resultado-test');
    const aprobado = aciertos >= 3;
    
    contenedorTest.innerHTML = `
        <div style="background-color: ${aprobado ? '#e8f4f8' : '#f9ebea'}; border-left: 5px solid ${aprobado ? '#2980b9' : '#c0392b'}; padding: 15px; border-radius: 4px;">
            <p style="color: ${aprobado ? '#2980b9' : '#c0392b'}; margin: 0;">
                <strong>Resultado:</strong> Evaluado con ${aciertos} de 5 respuestas correctas.
            </p>
        </div>
    `;
});
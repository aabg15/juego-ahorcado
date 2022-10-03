var palabra_seleccionada = ""; //se almacenara la palabra al azar
var asunto_obtenido = ""; //la pista de la palabra
var intentos_generales = 6; // debido a las 6 partes del cuerpo.
var fallos_realizados = 0; //fallos contabilizados  
var concordancia = []; //variable que almacena las palabras que sean iguales.

function damePalabra_signifacdo(arreglo_palabras) { //funcion que obtiene la palabra a jugarse.

  var cantidad_registros = arreglo_palabras.length - 1;
  var al_azar = (Math.random() * cantidad_registros).toFixed(0);

  palabra_seleccionada = arreglo_palabras[al_azar][0].toUpperCase();
  asunto_obtenido = arreglo_palabras[al_azar][1].toUpperCase();
  //console.log("palabra en juego -> " + palabra_seleccionada);

  primeraLetra();
  muestraResultado(palabra_seleccionada);
}

function primeraLetra() {
  primera = palabra_seleccionada.charAt(0);
  concordancia[0] = primera;
  //console.log('primera letra .> '+primera);
}

function chequear(event) { //con el event, tomamos la letra presionada.
  comprobarLetra(event.target.textContent);
}

function comprobarLetra(letrap) { //Funcion para comprobar la letra que se ingreso con la palabra.
  var letra2 = document.getElementById('letra-' + letrap);
  letrap = letrap.toUpperCase();

  if (palabra_seleccionada.indexOf(letrap) != -1) { //si se encuentra,entonces agregarlo en la variable concordancia como una letra que si debe tomarse en cuenta.
    //console.log('se encuentra-> ' + letrap);
    for (var index = 1; index < palabra_seleccionada.length; index++) { //recorro toda la palabra en juego.
      if (palabra_seleccionada[index] == letrap) concordancia[index] = letrap;
    }

    muestraResultado(palabra_seleccionada) //metodo para mostrar las letras que se van obteniendo de momento.
    letra2.classList.remove("bg-secondary", "text-primary");
    letra2.classList.add("bg-sec");
  } else {
    //console.log('No se encuentra-> ' + letrap);
    intentos_generales--;
    fallos_realizados++;
    letra2.classList.toggle("bg-secondary", "text-primary");
    letra2.classList.add("bg-error", "text-light");
    document.getElementById("palo").src = `img/${fallos_realizados}.jpg`;
  }

  letra2.classList.toggle("manito");
  letra2.removeEventListener('click', chequear);

  //validar si se completo la palabra
  comprobarPalabra();
}

function ocultarAbecedario() { //funcion que ocultas las letras.

  //Bloquear abecedario.
  let abeced = document.getElementById('letras');
  abeced.style.display = "none";
}

function mostrarBoton() { //funcion para mostrar boton de vovler a juagr
  let refresh = document.getElementById('refresh'); //aparece boton oculto para volver a jugar.
  refresh.hidden = false;
}

function activarConffeti() { //funcion para mostrar conffeti
  //conffeti
  const start = () => {
    setTimeout(function () {
      confetti.start()
    }, 1000); // pasará 1 segudno en aparecer el conffeti
  };

  const stop = () => {
    setTimeout(function () {
      confetti.stop()
    }, 10000); // 10 segundos de conffeti.
  };

  start();
  //stop();
}

function comprobarPalabra() { //funcion para comprobar si el juego se termina(Game over-win)
  if (intentos_generales == 0) {

    document.getElementById("findejuego").innerHTML = "<b>GAME OVER!!</b>";

    ocultarAbecedario();
    mostrarBoton();

  } else if (concordancia.indexOf("_") == -1) {
    document.getElementById("findejuego").innerHTML = "<b>FELICIDADES!</b>";
    document.getElementById("palo").src = 'img/win.gif'; //mostrará el gif cuando gane y a la vez, saldra conffeti de la pantalla.

    ocultarAbecedario();
    activarConffeti();
    mostrarBoton();
  }

}

function dameAbecedario() { //funcion para armar el abecedario.
  var a = 97;
  var z = 123;
  var letras = document.getElementById("letras");

  for (var cc = a; cc < z; cc++) {
    const variable = String.fromCharCode(cc);
    var letra = document.createElement('div');
    letra.classList.add('abc', 'bg-secondary', 'text-primary', 'manito');
    letra.setAttribute('id', 'letra-' + variable);
    letra.textContent = variable;
    letra.addEventListener('click', chequear);

    letras.appendChild(letra);
  }
}

function muestraResultado(p) { //funcion para mostrar 
  var aux = '';
  var letras1 = p.split('');
  // console.log('letras1111-> '+p);
  document.getElementById("asuntodepalabra").innerHTML = "PISTA : " + asunto_obtenido;

  letras1.forEach((l, i) => {
    if (concordancia.includes(l)) {
      aux += `<div class="oculto">${l}</div>`;
    } else {
      concordancia[i] = "_";
      aux += `<div class="oculto">?</div>`;
    }
  });

  document.getElementById("word").innerHTML = aux;
}


function inicio_juego() { //funcion Iniciar juego
  damePalabra_signifacdo(wodrs);
  dameAbecedario();
}

inicio_juego(); //llamado a la funcion

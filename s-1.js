function r_dibujar(componente, props, children) {
    props = {...props, children}
    if (typeof componente === 'function') {
        console.log(componente(props));
    } else {
        console.log(componente, props);
    }
} 

function r_main(componente) {
    componente();
}

//S: Como se usa (lo de abajo)

function decirNumero(props) {
    return r_dibujar("div", null, props.numero);
}

function miPantalla() {
    return r_dibujar(decirNumero, {numero: 10});
}

r_main(miPantalla);
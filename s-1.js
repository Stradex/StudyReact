function r_dibujar(componente, props, children) {
    props = {...props, children}
    if (typeof componente === 'function') {
        console.log(componente(props));
    } else {
        console.log(componente, props);
    }
} 

function useState(v0) {
    return [v0, (v1) => console.log("useState", {v1, v0})];
}

function r_main(componente) {
    componente();
}

//S: Como se usa (lo de abajo)

function decirNumero(props) {
    return r_dibujar("div", null, props.numero);
}

function miPantalla() {
    let [num, setNum] = useState(10);
    return r_dibujar("div", null, [
        r_dibujar("button", {onClick: () => setNum(num+1)}),
        r_dibujar(decirNumero, {numero: num}),
    ]);
}

r_main(miPantalla);
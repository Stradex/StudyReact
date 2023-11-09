L = console.log;
J = (o) => JSON.stringify(o, null, 2);

//S: Nuestro React
let emu_onClick; //U: Nos guardamos onClick para simularlo.

function r_dibujar(componente, props, children, _parent) {
    props = {...props, children};
    emu_onClick = emu_onClick || props.onClick;
    let r;
    if (typeof componente === 'function') {
        r = componente(props);
    } else {
        r = { componente, ...props };
    }

    //DBG: L(r);
    return r;
} 

function useState(v0) {
    return [v0, (v1) => L("useState", {v1, v0})];
}

function r_main(componente) {
    let r = r_dibujar(componente);
    L("r_main", r);

    emu_onClick(); //A: Simulamos click del usuario.
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

    /* QUIERO: 
    {
        tag: div,
        children: [
            { tag: button, props: { onClick, ...} },
            { tag: div, props: { numero, ...} }
        ]
    }
    */
}

r_main(miPantalla);
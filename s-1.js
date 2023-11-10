L = console.log;
J = (o) => JSON.stringify(o, null, 2);

//S: Nuestro React
let emu_onClick; //U: Nos guardamos onClick para simularlo.
let emu_ToUpdate; //U: Los componentes que hay que volver a llamar por que cambio el estado.

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

let State = {}

function useState(v0) {
    let stateId = 1; ///XXX: Conseguir de r_dibujar tree/parent.
    let value = State[stateId] || v0; //XXX: Fixme: falla con false.
    State[stateId] = value; //A: Me lo guardo.
    let setter = (v1) => {
        L("useState", {v1, value, v0});
        State[stateId] = v1;
        emu_ToUpdate = miPantalla; //XXX: Conseguir de r_dibujar tree.
    }
    return [
        value,
        setter
    ];

}

function r_main(componente) {
    let r = r_dibujar(componente);
    L("r_main", r);

    emu_onClick(); //A: Simulamos click del usuario.
    r = emu_ToUpdate();
    L("updated", r);
}

//S: Como se usa (lo de abajo)

function decirNumero(props) {
    return r_dibujar("div", null, props.numero);
}

function miPantalla() {
    let [num, setNum] = useState(10);
    //CONCLUSIÓN: En vez de r_dibujar, devolver el arbolito de una y todo texto, las funciones las llamamos con eval o algo similar. Más parecido a JSX. Lo que escribimos abajo en QUIERO.
    return r_dibujar("div", null, [
        r_dibujar("button", {onClick: () => setNum(num+1)}),
        r_dibujar(decirNumero, {numero: num}),
    ]);

    /* QUIERO: (Devolver algo así)
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
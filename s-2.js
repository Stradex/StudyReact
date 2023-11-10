import * as CReact from "./cheapReact/c_react.js";


function C4(props) {
    return {
        tag: "button",
        props,
        children: ["This is my span text"]
    }
}


function C3() {
    return {
        tag: "p",
        children: [
            "This is my text: ",
            {fnComponent: C4, props: {
                onClick: () => console.log("Hello World!")
            }}
        ]
    }
}

function C2() {
    return {
        tag: "h1",
        children: ["This is my title"]
    }
}

function C1(props) {
    return {
        tag: "div",
        props,
        children: [
            C2,
            C3
        ]
    }
}

let DOMString = CReact.r_main(C1);
console.log(DOMString);
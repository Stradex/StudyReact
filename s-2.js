import * as CReact from "./cheapReact/c_react.js";


function C4() {
    return {
        tag: "span",
        children: ["This is my span text"]
    }
}


function C3() {
    return {
        tag: "p",
        children: [
            "This is my text: ",
            C4
        ]
    }
}

function C2() {
    return {
        tag: "h1",
        children: ["This is my title"]
    }
}

function C1() {
    return {
        tag: "div",
        children: [
            C2,
            C3
        ]
    }
}

let DOMString = CReact.r_main(C1);
console.log(DOMString);
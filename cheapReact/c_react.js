/*
 A component can be:
    -> Function
    -> String
*/

let ComponentsTree = [];

function treeObjToDOMString(componentObj) {
    let DOMString = "";
    if (componentObj.tag && componentObj.tag === "_text_") {
        return componentObj.children;
    }
    
    if (componentObj.tag) {
        DOMString += "<" + componentObj.tag + ">\n";
    }

    if (componentObj.children) {
        for (let i=0; i < componentObj.children.length; i++) {
            DOMString += treeObjToDOMString(componentObj.children[i]);
        }
    }

    if (componentObj.tag) {
        DOMString += "\n</" + componentObj.tag + ">";
    }
    return DOMString;
}

function r_getStringComponent(strComponent) {
    return {tag: "_text_", children: strComponent}
}

function r_getFunctionComponent(funcComponent) {
    return funcComponent();
}

function r_draw(component) {
    let objComponent;
    switch (typeof component) {
        case "function":
            objComponent = r_getFunctionComponent(component);
        break;
        case "string":
            objComponent = r_getStringComponent(component);
        break;
        case "object":
            objComponent = component;
        break;
    }

    if (!objComponent.children || typeof objComponent.children === "string") return objComponent;

    for (let i=0; i < objComponent.children.length; i++) {
        objComponent.children[i] = r_draw(objComponent.children[i]);
    }
    
    return objComponent;
}

export function r_main(mainComponent) {
    let DOMTree = r_draw(mainComponent);
    return treeObjToDOMString(DOMTree);
}
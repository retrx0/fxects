
class node {
    constructor(pos){
        this.pos = pos;
    }
    set position(p){
        this.pos = p;
    }
    get position(){
        return this.pos;
    }
}

const hex_input = document.getElementById("gradient-hex-input");
const color_picker = document.getElementById("gradient-color-picker");
const gradient_model = document.getElementById('gradient-model');
const pos_slider = document.getElementById("position-slider");
const deg_slider = document.getElementById("degree-slider");
const pos_input = document.getElementById("position-input");
const deg_input = document.getElementById("degree-input");
const  add_nodes = document.getElementById("add-nodes");
const nodes  = document.getElementsByClassName("node");
const gradient_type = document.getElementById("gradient-type");
const output_code_css = document.getElementById("gradient-output-code-css");
const output_code_javafx = document.getElementById("gradient-output-code-javafx");

let deg_val = deg_slider.value;
let pos_val = pos_slider.value;
let i;
let n;
let selected_node;

let nd_array = [];

hex_input.value = RGBToHex(nodes[0].style.backgroundColor);
pos_input.value = pos_val;
deg_input.value = deg_val;
color_picker.value = hex_input.value;

init();
selectFirstItem();
setGradientModel();

function init() {
    for (i = 0; i < nodes.length-1; i++) {
        let nd;
        n = nodes[i];
        if(i === 1) nd = new node(50);
        else nd = new node(pos_val);
        nd_array[i] = nd;
        nodeOnCLickAndRemove(n,nd);
    }
}

function nodeOnCLickAndRemove(n,nd){
    n.onclick = function(){
        let j;
        for (j=0; j<nodes.length; j++){
            if(nodes[j].classList.contains("node-selected")) nodes[j].classList.remove("node-selected");
        }
        this.classList.add("node-selected");
        const hex = RGBToHex(this.style.backgroundColor).toUpperCase();
        hex_input.value = hex;
        color_picker.value = hex;
        pos_slider.value = nd.position;
        pos_input.value = nd.position;
    };
    n.innerHTML = "<span class='remove-button'>"+"<i class='fas fa-times'>"+"</i>"+"</span>";
    n.getElementsByTagName('span').item(0).onclick = function () {
        if(nodes.length >2){
            this.parentNode.parentNode.removeChild(this.parentNode);
            nd_array.splice(nd_array.indexOf(nd),1);
            setGradientModel();
        }
    }
}

function addNode(div) {
    let nd;
    nd = new node(pos_slider.value);
    nd_array.push(nd);
    nodeOnCLickAndRemove(div,nd);
}

function setGradientModel(){
    let k;
    let b;
    if(gradient_type.options[gradient_type.selectedIndex].value === '1'){
         b = "background: linear-gradient("
            +deg_slider.value+"deg, ";
    }else if(gradient_type.options[gradient_type.selectedIndex].value === '2'){
         b = "background: radial-gradient("
            +"circle,";
    }
    for (k = 0;k < nodes.length-1; k++){
        b = b + nodes[k].style.backgroundColor+" "+ nd_array[k].position +"%, ";
    }
    gradient_model.style = b.substring(0,b.length-2)+");";
    output_code_css.innerHTML = b.substring(0,b.length-2)+");";
    let fx_angle;
    if(deg_slider.value >=0 && deg_slider.value<45)  fx_angle = 'to top';
    else if(deg_slider.value >45 && deg_slider.value<90) fx_angle = 'to top right';
    else if(deg_slider.value >=90 && deg_slider.value<135) fx_angle = "to right";
    else if(deg_slider.value >=135 && deg_slider.value<180) fx_angle = "to bottom right";
    else if(deg_slider.value >=180 && deg_slider.value<225) fx_angle = "to bottom";
    else if(deg_slider.value >=225 && deg_slider.value<270) fx_angle = "to bottom left";
    else if(deg_slider.value >=270 && deg_slider.value<315) fx_angle = "to left";
    else if(deg_slider.value >=315 && deg_slider.value<350) fx_angle = "to top left";
    else fx_angle = "to top";
    if(gradient_type.options[gradient_type.selectedIndex].value === '1'){
        output_code_javafx.innerHTML = "-fx-background-color:"+b.substring(11,b.indexOf('(')+1)+
            fx_angle + b.substring(b.indexOf(','),b.length-2)+");";
    }else if(gradient_type.options[gradient_type.selectedIndex].value === '2'){
        output_code_javafx.innerHTML = "-fx-background-color:"+b.substring(11,b.indexOf('(')+1)+
            "radius 100%" + b.substring(b.indexOf(','),b.length-2)+");";
    }
}

pos_slider.oninput = function () {
    pos_input.value = this.value;
    nd_array[getSelectedNodeIndex()].position = this.value;
    setGradientModel();
};
pos_input.oninput = function(){
    if(this.value > 100) this.value = 100;
    pos_slider.value = this.value;
    nd_array[getSelectedNodeIndex()].position = this.value;
    setGradientModel();
};
deg_slider.oninput = function () {
    deg_input.value = this.value;
    nd_array[getSelectedNodeIndex()].gradientDegree = this.value;
    setGradientModel();
};
deg_input.oninput = function(){
    if(this.value > 360) this.value = 360;
    deg_slider.value = this.value;
    nd_array[getSelectedNodeIndex()].gradientDegree = this.value;
    setGradientModel();
};
add_nodes.onclick = function () {
    const div = document.createElement('div');
    div.className = 'node';
    div.style.backgroundColor = color_picker.value;
    this.before(div);
    addNode(div);
    selectLastItem();
    setGradientModel();
};

hex_input.oninput = function(){
    color_picker.value = this.value;
    selected_node = getSelectedNode();
    selected_node.style.backgroundColor = this.value;
    setGradientModel();
};
color_picker.oninput = function () {
  hex_input.value = this.value;
  selected_node = getSelectedNode();
  selected_node.style.backgroundColor = this.value;
  setGradientModel();
};
gradient_type.onchange = function () {
    setGradientModel();
};

function getSelectedNode(){
    let i;
    for (i=0; i<nodes.length; i++){
        if(nodes[i].classList.contains("node-selected")) {
            selected_node = nodes[i];
            break;
        }
    }
    return selected_node;
}
function getSelectedNodeIndex(){
    let i;let index;
    for (i=0; i<nodes.length; i++){
        if(nodes[i].classList.contains("node-selected")) {
            index = i;
            break;
        }
    }
    return index;
}
function selectLastItem(){
    let j;
    for (j=0; j< nodes.length; j++){
        if(nodes[j].classList.contains("node-selected")) nodes[j].classList.remove("node-selected");
    }
    nodes[nodes.length-2].classList.add("node-selected");
}
function selectFirstItem(){
    let j;
    for (j=0; j< nodes.length; j++){
        if(nodes[j].classList.contains("node-selected")) nodes[j].classList.remove("node-selected");
    }
    nodes[0].classList.add("node-selected");
}

/**
 * @return {string}
 */
function RGBToHex(rgb) {
    // Choose correct separator
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    // Turn "rgb(r,g,b)" into [r,g,b]
    rgb = rgb.substr(4).split(")")[0].split(sep);

    let r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);
    if (r.length === 1)
        r = "0" + r;
    if (g.length === 1)
        g = "0" + g;
    if (b.length === 1)
        b = "0" + b;
    return "#" + r + g + b;
}
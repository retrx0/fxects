//slider
const xSlider = document.getElementById("x-slider");
const ySlider = document.getElementById("y-slider");
const blurSlider = document.getElementById("blur-radius-slider");
const insetsSlider =  document.getElementById("insets-slider");

const xOutput = document.getElementById("x-res");
const yOutput = document.getElementById("y-res");
const blurOutput = document.getElementById("blur-rad-res");
const insetsOutput = document.getElementById("insets-res");

const outputCode_fx = document.getElementById("shadow-output-code-fx");
const outputCode_css = document.getElementById("shadow-output-code-css");
const shadowColor = document.getElementById("shadow-color");
const model = document.getElementById("model-shadow");
const model_bg_color_picker = document.getElementById("shadow-model-bg-color");

var x_value;
var y_value;
var blur_value;
var insets_value;

// var shadow_color_wrapper = document.getElementById("shadow-color-wrapper");
// shadowColor.onchange = function() {
// 	shadow_color_wrapper.style.backgroundColor = shadowColor.value;    
// }
// shadow_color_wrapper.style.backgroundColor = shadowColor.value;

xOutput.innerHTML = "Move shadow left or right, x = "+xSlider.value;
yOutput.innerHTML = "Move shadow up or down, y = "+ySlider.value;
blurOutput.innerHTML = "Blur radius "+blurSlider.value;
insetsOutput.innerHTML = "Insets "+insetsSlider.value;

x_value = xSlider.value;
y_value = ySlider.value;
blur_value = blurSlider.value;
insets_value = insetsSlider.value;

var fx_insets = 0;
var fx_blur_value = 10;

let blur_type = "gaussian";
let shadow_type = "box-shadow";
let fx_shadow_type = "dropshadow";

// document.getElementById("reset-btn").onclick = function () {
//     x_value = xSlider.value;
//     y_value = ySlider.value;
//     blur_value = blurSlider.value;
//     insets_value = insetsSlider.value;
// };

function setModel() {
    fx_blur_value = (blur_value/100)*127;
    if(shadow_type === "box-shadow") {
        model.style = shadow_type + ": " + x_value + "px " + y_value + "px  " + blur_value + "px " + insets_value + "px " + shadowColor.value;
        outputCode_css.innerHTML = shadow_type+": "+x_value + "px " + y_value + "px  "+blur_value+"px "+insets_value+"px "+shadowColor.value+";";
        if(insets_value > 0){
            fx_insets = (insets_value / 50);
        }
        else{
            fx_insets = 0;
        }
        outputCode_fx.innerHTML = "-fx-effect: "+fx_shadow_type+"("+blur_type+", "+shadowColor.value+", "+fx_blur_value+", "+fx_insets+", "+x_value+", "+y_value+" );";
    }
    else if(shadow_type === "filter: drop-shadow"){
        model.style = shadow_type + "("+ x_value +"px " + y_value +"px " + (blur_value/2) +"px " + shadowColor.value+");";
        if(blurSlider.value > 100){
            // setTimeout(function(){ document.getElementById("alert-area-1").style.display = "none"; }, 1500);
            document.getElementById("alert-area-2").style = "display: block;";
        }else{
            document.getElementById("alert-area-2").style = "display: none;";
        }
        outputCode_css.innerHTML = shadow_type+": "+x_value +"px " + y_value + "px "+blur_value/2 +"px "+ shadowColor.value+");";

        outputCode_fx.innerHTML = "-fx-effect: "+fx_shadow_type+"("+blur_type+", "+shadowColor.value+", "+fx_blur_value+", "+fx_insets+", "+x_value+", "+y_value+" );"
    }
    else if(shadow_type === "inner-shadow"){
        let inner_box = "box-shadow: "+"inset "+x_value+"px "+y_value+"px "+blur_value+"px "+insets_value+"px "+shadowColor.value+","
            +"inset "+x_value+"px "+-y_value+"px "+blur_value+"px "+insets_value+"px "+shadowColor.value+","
            +"inset "+-y_value+"px "+x_value+"px "+blur_value+"px "+insets_value+"px "+shadowColor.value+","
            +"inset "+y_value+"px "+x_value+"px "+blur_value+"px "+insets_value+"px "+shadowColor.value+";";

        model.style = inner_box;

        outputCode_css.innerHTML = inner_box;
        outputCode_fx.innerHTML = "-fx-effect: "+fx_shadow_type+"("+blur_type+", "+shadowColor.value+", "+fx_blur_value+", "+fx_insets+", "+x_value+", "+y_value+" );"
    }
}

setModel();

shadowColor.oninput = function (){
    setModel();
    model.style.backgroundColor = model_bg_color_picker.value;
};
model_bg_color_picker.oninput = function () {
    model.style.backgroundColor = this.value;
};
xSlider.oninput= function () {
    xOutput.innerHTML = "Move shadow left or right, x = "+this.value;
    x_value = this.value;
    setModel();
};
ySlider.oninput = function () {
    yOutput.innerHTML = "Move shadow up or down, y = "+this.value;
    y_value = this.value;
    setModel();
};
blurSlider.oninput = function (){
    blurOutput.innerHTML = "Blur radius: "+this.value;
    blur_value = this.value;
    setModel();
};
insetsSlider.oninput = function (){
    insetsOutput.innerHTML = "Insets: "+this.value;
    insets_value = this.value;
    setModel();
};

const shadow_selector = document.getElementById("shadow-type-select");
shadow_selector.onchange = function (){
    var selected_shadow = shadow_selector.options[shadow_selector.selectedIndex].value;
    if(selected_shadow === '1'){
        insetsOutput.style.display = "block";
        insetsSlider.style.display = "block";
        shadow_type = "box-shadow";
        fx_shadow_type = "dropshadow";
        blurSlider.max = 100;
    }
    else if(selected_shadow === '2') {
        insetsOutput.style.display = "none";
        insetsSlider.style.display = "none";
        shadow_type = "filter: drop-shadow";
        fx_shadow_type = "dropshadow";
        blurSlider.max = 200;
    }
    else if(selected_shadow === '3'){
        insetsOutput.style.display = "block";
        insetsSlider.style.display = "block";
        shadow_type = "inner-shadow";
        fx_shadow_type = "innershadow";
        blurSlider.max = 100;
    }
    setModel();
};

var blur_type_selector = document.getElementById("blur-type-select");
blur_type_selector.onchange = function () {
    var selected_blur_type = blur_type_selector.options[blur_type_selector.selectedIndex].value;
    if (selected_blur_type === '1')
        blur_type = "gaussian";
    else if (selected_blur_type === '2')
        blur_type = "one-pass-box";
    else if (selected_blur_type === '3')
        blur_type = "two-pass-box";
    else if (selected_blur_type === '4')
        blur_type = "three-pass-box";
  setModel();
};

//Copy Text
function CopyToClipboard(containerid) {
    if (document.selection) {
        const text_range = document.body.createTextRange();
        text_range.moveToElementText(document.getElementById(containerid));
        text_range.select().createTextRange();
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
    } else if (window.getSelection) {
        const range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
        document.getElementById("notify").classList.add("notify-active");
        setTimeout(function(){
            document.getElementById("notify").classList.remove("notify-active");
        }, 1600);
    }
}

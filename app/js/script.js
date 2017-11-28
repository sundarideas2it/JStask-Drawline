/*** javascript v1.0 */
window.onload = function() {
  try {
    init();
    // drawgraph();
  } catch (err) {
    document.write("Error: "+err);
  }
};

function init() {
  //# header
  var headerdom = document.createElement("header");
  var htxth1 = document.createElement("h1");
  var headertxt = document.createTextNode("Line Graph");
  htxth1.appendChild(headertxt);
  headerdom.appendChild(htxth1);
  document.body.appendChild(headerdom);

  //# left sidebar
  var leftdom = document.createElement("div");
  leftdom.setAttribute("id","left-sidebar");
  headerdom.after(leftdom);

  //# left Menu Bar
  var leftmenudom = document.createElement("div");
  leftmenudom.setAttribute("class","left-menu");
  leftdom.appendChild(leftmenudom);

  var formdom = document.createElement("div");
  formdom.setAttribute("class","form-builder");
  leftmenudom.appendChild(formdom);

  //#form-inline field 1
  var forminlinedom = document.createElement("div");
  forminlinedom.setAttribute("class","form-inline");
  leftmenudom.appendChild(forminlinedom);

  var inputdom = document.createElement("input");
  inputdom.setAttribute("type","text");
  inputdom.setAttribute("name","txtminusxaxis");
  inputdom.setAttribute("placeholder","Enter -X axis");
  forminlinedom.appendChild(inputdom);

  //#form-inline field 2
  var forminlinedom = document.createElement("div");
  forminlinedom.setAttribute("class","form-inline");
  leftmenudom.appendChild(forminlinedom);

  var inputdom = document.createElement("input");
  inputdom.setAttribute("type","text");
  inputdom.setAttribute("name","txtplusxaxis");
  inputdom.setAttribute("placeholder","Enter X axis");
  forminlinedom.appendChild(inputdom);

  //#form-inline field 3
  var clnforminlinedom = forminlinedom.cloneNode(false);
  leftmenudom.appendChild(clnforminlinedom);

  var inputdom = document.createElement("input");
  inputdom.setAttribute("type","text");
  inputdom.setAttribute("name","txtmionrtics");
  inputdom.setAttribute("placeholder","Mionr Tics");
  clnforminlinedom.appendChild(inputdom);

  //#form-inline field 4
  var clnforminlinedom = forminlinedom.cloneNode(false);
  leftmenudom.appendChild(clnforminlinedom);

  var buttondom = document.createElement("button");
  buttondom.setAttribute("type","button");
  buttondom.setAttribute("name","btndrawline");
  buttondom.setAttribute("id","btndrawline");
  buttondom.setAttribute("onclick","drawgraph()");
  buttontxt = document.createTextNode("Draw");
  buttondom.appendChild(buttontxt);
  clnforminlinedom.appendChild(buttondom);

  //# Container
  var containerdom = document.createElement("div");
  containerdom.setAttribute("id","container");
  leftdom.after(containerdom);

  //# container data row
  var rowdom = document.createElement("div");
  rowdom.setAttribute("class","row");
  containerdom.appendChild(rowdom);

  //# container graph area
  var graphdom = document.createElement("div");
  graphdom.setAttribute("class","graph-area");
  graphdom.setAttribute("id","grapharea");
  rowdom.appendChild(graphdom);
}

function drawgraph(){
  var rmCanvas = document.getElementById("idcanvas");
  if(rmCanvas != null)
    rmCanvas.remove();

  var errflag = false;

  var minusxdom = document.getElementsByName('txtminusxaxis');
  minusx = minusxdom[0].value;
  if(minusx == "" || minusx > 0 || minusx == null){
    if(minusxdom[0].nextElementSibling != null)
      minusxdom[0].nextElementSibling.remove();
    var errdiv = document.createElement("div");
    errdiv.setAttribute("style","color:red; font-size:12px;");
    var errdivtxt = document.createTextNode("Please enter valid minus -X axis value");
    errdiv.appendChild(errdivtxt);
    minusxdom[0].after(errdiv);
    errflag = true;
  }else{
    if(minusxdom[0].nextElementSibling != null)
      minusxdom[0].nextElementSibling.remove();
  }
  var plusxdom = document.getElementsByName('txtplusxaxis');
  plusx = plusxdom[0].value;
  if(plusx == "" || plusx == null){
    if(plusxdom[0].nextElementSibling != null)
      plusxdom[0].nextElementSibling.remove();
    var errdiv = document.createElement("div");
    errdiv.setAttribute("style","color:red; font-size:12px;");
    var errdivtxt = document.createTextNode("Please enter valid plus X axis value");
    errdiv.appendChild(errdivtxt);
    plusxdom[0].after(errdiv);
    errflag = true;

  }else {
    if(plusxdom[0].nextElementSibling != null)
      plusxdom[0].nextElementSibling.remove();
  }
  var microticsdom = document.getElementsByName('txtmionrtics');
  microtics = microticsdom[0].value;
  if(microtics == "" || microtics > 8 || microtics == null){
    if(microticsdom[0].nextElementSibling != null)
      microticsdom[0].nextElementSibling.remove();
    var errdiv = document.createElement("div");
    errdiv.setAttribute("style","color:red; font-size:12px;");
    var errdivtxt = document.createTextNode("Please enter valid micro tics value");
    errdiv.appendChild(errdivtxt);
    microticsdom[0].after(errdiv);
    errflag = true;
  }else {
    if(microticsdom[0].nextElementSibling != null)
      microticsdom[0].nextElementSibling.remove();
  }
  console.log(errflag);
  if(errflag){
    return false;
  }
  minusx = parseInt(minusx);
  plusx = parseInt(plusx);
  microtics = parseInt(microtics)+1;

  var withoutminus = Math.abs(minusx);
  console.log(minusx+"=="+plusx+"=="+withoutminus);

  // minusx = -2;  plusx = 2;  withoutminus = 2; microtics = 2;
  console.log(minusx+"=="+plusx+"=="+withoutminus);
  var linestartfromx = 100;
  var linestartfromy = linestartfromx;

  var linetotalwidth = 500;
  var totalscale = (parseInt(withoutminus)+plusx);
  console.log(linetotalwidth);
  console.log(totalscale);
  var calcrange = linetotalwidth / totalscale;
  console.log(calcrange);

  var calcmicrorange = calcrange / microtics;
  console.log(calcmicrorange);

  var ographarea = document.getElementById("grapharea");
  console.log(ographarea);
  //# canvas tag
  var objCanvas = document.createElement("canvas");
  objCanvas.setAttribute("id","idcanvas");
  objCanvas.setAttribute("width","700");
  objCanvas.setAttribute("height","500");
  ographarea.appendChild(objCanvas);
  console.log(objCanvas);

  var objCanvas = document.getElementById("idcanvas");
  var baseline = objCanvas.getContext("2d");
  baseline.beginPath();
  baseline.moveTo(linestartfromx, linestartfromy);
  baseline.lineTo(linestartfromx+linetotalwidth, linestartfromx);
  baseline.lineWidth = 2;
  baseline.stroke();

  var runningpointx = 100;
  //var i=0;
  for(var i=minusx; i<=plusx;i++){
      var runningmicrox = runningpointx;

      for(j=1; j<microtics;j++){
        if(i == plusx)
          continue;
        runningmicrox = runningmicrox+calcmicrorange;
        var microline = objCanvas.getContext("2d");
        microline.beginPath();
        microline.moveTo(runningmicrox, 100);
        microline.lineTo(runningmicrox, 110);
        microline.lineWidth = 1;
        microline.stroke();
      }
      // console.log(runningpointx);
      var plotline = objCanvas.getContext("2d");
      plotline.beginPath();
      plotline.moveTo(runningpointx, 100);
      if(i == 0){
        plotline.lineTo(runningpointx, 140);
      }else {
        plotline.lineTo(runningpointx, 120);
      }
      plotline.lineWidth = 1;
      plotline.stroke();

      plotline.font = "12px Verdana";
      plotline.strokeText(i, runningpointx, 97);
      console.log(i);
      runningpointx = runningpointx+calcrange;
  }
}

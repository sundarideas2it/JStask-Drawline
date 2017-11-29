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
  var headertxt = document.createTextNode("Scale Graph");
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
  try {
    var errflag = false;
    var rmCanvas = document.getElementById("idcanvas");
    if(rmCanvas != null)
      rmCanvas.remove();

    var minusxdom = document.getElementsByName('txtminusxaxis');
    minusx = minusxdom[0].value;
    if(minusx == "" || isNaN(minusx) || minusx == null){
      displayerror(minusxdom[0],"Please enter valid minus -X axis value");
      errflag = true;
    }else if(minusx != "" && (minusx < -10|| minusx >= 0)){
      displayerror(minusxdom[0],"Please enter value between -1 to -10");
      errflag = true;
    }else{
      disableerror(minusxdom[0]);
    }

    var plusxdom = document.getElementsByName('txtplusxaxis');
    plusx = plusxdom[0].value;
    if(plusx == "" || isNaN(plusx) || plusx == null){
      displayerror(plusxdom[0],"Please enter valid plus X axis value");
      errflag = true;
    }else if(plusx != "" && (plusx > 10|| plusx <= 0)){
      displayerror(plusxdom[0],"Please enter value between 1 to 10");
      errflag = true;
    }else {
      disableerror(plusxdom[0]);
    }

    var microticsdom = document.getElementsByName('txtmionrtics');
    microtics = microticsdom[0].value;
    if(microtics == "" || isNaN(microtics) || microtics == null){
      displayerror(microticsdom[0],"Please enter valid micro tics value");
      errflag = true;
    }else if(microtics != "" && (microtics > 9 || microtics < 1)){
      displayerror(microticsdom[0],"Please enter value between 1 to 9");
      errflag = true;
    }else {
      disableerror(microticsdom[0]);
    }

    if(errflag){
      return false; //If error stop the execution
    }

    minusx    = parseInt(minusx);
    plusx     = parseInt(plusx);
    microtics = parseInt(microtics)+1;
  // minusx = -2;  plusx = 2;  withoutminus = 2; microtics = 2;
    var withoutminus   = Math.abs(minusx);
    var linestartfromx = 100;
    var linestartfromy = linestartfromx;
    var linetotalwidth = 500;
    var totalscale = (parseInt(withoutminus)+plusx);
    var calcrange = linetotalwidth / totalscale;
    var calcmicrorange = calcrange / microtics;
    var ographarea = document.getElementById("grapharea");

    //# canvas tag
    var objCanvas = document.createElement("canvas");
    objCanvas.setAttribute("id","idcanvas");
    objCanvas.setAttribute("width","700");
    objCanvas.setAttribute("height","500");
    ographarea.appendChild(objCanvas);

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

        plotline.font = "12px";
        plotline.strokeText(i, runningpointx, 97);

        runningpointx = runningpointx+calcrange;
    }
  } catch (err) {
    document.write("Error in drawgraph function : "+err);
  }
}

function displayerror(dom,msg){
  try {
    if(dom.nextElementSibling != null)
      dom.nextElementSibling.remove();
    var errdiv = document.createElement("div");
    errdiv.setAttribute("class","errorcls");
    var errdivtxt = document.createTextNode(msg);
    errdiv.appendChild(errdivtxt);
    dom.after(errdiv);
  } catch (err) {
    document.write("Error in displayerror function: "+err);
  }
}

function disableerror(dom) {
  try {
    if(dom.nextElementSibling != null)
      dom.nextElementSibling.remove();
  } catch (err) {
    document.write("Error in disableerror function: "+err);
  }
}

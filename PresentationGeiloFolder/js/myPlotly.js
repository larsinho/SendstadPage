
// General caclulations
//---------------------

var D1uBar = 7;
var D2uBar = 13;
var D1lBar = 9;
var D2lBar = 15;
var mu = 0.01;
var Sigma = 0.2;
var I1 = 500;
var I2 = 1500;
var rho = 0.08;
var r = 0.08;
var GAMMA = 0.8;
var LAMBDA = 0.1;
var Pt = [];
// Create all the possible output prices
for(var i=0; i<400; i++){
  Pt.push(i/10)
}


// follower 12
//---------------------

function fun_Phi1F12_follow(GAMMA) {

  var Phi2_follow = []
  var F12_follow = []

  bb = (mu-0.5*Sigma**2);
  beta1 = (-bb+(bb**2 + 2*Sigma**2*(rho))**0.5)/(Sigma**2);
  beta2 = (-bb-(bb**2 + 2*Sigma**2*(rho))**0.5)/(Sigma**2);
  scriptA = (beta1*beta2)/(rho*(beta1 - GAMMA)*(beta2 - GAMMA));

  delta1 = ((-bb + (bb**2 + 2*Sigma**2*(rho + LAMBDA))**0.5)/(Sigma**2));
  delta2 = ((-bb - (bb**2 + 2*Sigma**2*(rho + LAMBDA))**0.5)/(Sigma**2));
  scriptB = scriptA/(scriptA*LAMBDA + 1)

  function U(p) {
    return p**GAMMA/GAMMA;              // The function returns the product of p1 and p2
  }


  eps12_follow = r*I2*((beta2-GAMMA)/(beta2*(D2uBar**GAMMA-D1uBar**GAMMA)))**(1/GAMMA)
  A12_follow = (1/eps12_follow)**beta1*(scriptA*U(eps12_follow)
      *(D2uBar**GAMMA-D1uBar**GAMMA)-U(r*I2)/(rho))

   function vfun_Phi2_follow(p) {
        return (scriptA*U(p*D2uBar) - U(r*I1)/rho - U(r*I2)/rho)              // The function returns the product of p1 and p2
  }
  function vfun_F12_follow(p) {
       return (scriptA*U(p*D1uBar) - U(r*I1)/rho + A12_follow*p**beta1)            // The function returns the product of p1 and p2
  }


  for (i = 0; i < Pt.length; i++) {
    Phi2_follow[i] = vfun_Phi2_follow(Pt[i]);
  }
  for (i = 0; i < Pt.length; i++) {
    F12_follow[i] = vfun_F12_follow(Pt[i]);
  }
  return [Phi2_follow, F12_follow]
}


// ------------------------- Slider--------------------------//

[Phi2_follow, F12_follow] = fun_Phi1F12_follow(1.0)
// My Plotly graph
TESTER = document.getElementById('Phi2_follow');
Plotly.newPlot( TESTER, [{
x: Pt,
y: Phi2_follow, }], {
margin: { t: 0 } } );


function sliderFunction(x) {
    [Phi2_follow, F12_follow] = fun_Phi1F12_follow(x)
    var update = {y: Phi2_follow};
    var update = {
    opacity: 0.4,
    'marker.color': 'red'
    };
    Plotly.restyle(TESTER,  {y: [Phi2_follow]})
    //console.log(Phi2_follow);
    // My Plotly graph
}

// -------------------------------
// Slider


var initialValue = 1;

var sliderTooltip = function(event, ui) {
    var curValue = ui.value || initialValue;
    $('.valueBox').html(curValue);
     sliderFunction(curValue)

}

$("#slider").slider({
    value: initialValue,
    min: 0.5,
    max: 1.5,
    step: 0.05,
    create: sliderTooltip,
    slide: sliderTooltip
});

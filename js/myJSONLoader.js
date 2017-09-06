




var  value_regime1_analytical;
var  value_regime1_numerical;
var  value_regime2_analytical;
var  value_regime2_numerical;
var  sigma1_3d;
var  sigma2_3d;
var  sigma1_2d;
var  sigma2_2d;
var  S0_vector;

var promise1 = $.getJSON("/SendstadPage/SubPlottingScripts/value_regime1_analytical.json", function(json) {
    value_regime1_analytical = json;
});
var promise2 = $.getJSON("/SendstadPage/SubPlottingScripts/value_regime1_numerical.json", function(json) {
    value_regime1_numerical = json;
});
var promise3 = $.getJSON("/SendstadPage/SubPlottingScripts/value_regime2_analytical.json", function(json) {
    value_regime2_analytical = json;
});
var promise4 = $.getJSON("/SendstadPage/SubPlottingScripts/value_regime2_numerical.json", function(json) {
    value_regime2_numerical = json;
});
var promise5 = $.getJSON("/SendstadPage/SubPlottingScripts/sigma1_2d.json", function(json) {
    sigma1_2d = json;
});
var promise6 = $.getJSON("/SendstadPage/SubPlottingScripts/sigma2_2d.json", function(json) {
    sigma2_2d = json;
});
var promise7 = $.getJSON("/SendstadPage/SubPlottingScripts/sigma1_3d.json", function(json) {
    sigma1_3d = json;
});
var promise8 = $.getJSON("/SendstadPage/SubPlottingScripts/sigma2_3d.json", function(json) {
    sigma2_3d = json;
});
var promise9 = $.getJSON("/SendstadPage/SubPlottingScripts/S0_vector.json", function(json) {
    S0_vector = json;
});



// executes code when all JSON files are received
Promise.all([promise1, promise2, promise3, promise4, promise5, promise6, promise7, promise8, promise9]).then(
  function(){
      //fun_2dPlot();
      fun_3dPlot()
      console.log('"change6"')
  });


/*

$.ajax({
  url: "/SendstadPage/SubPlottingScripts/value_regime1_analytical.json",
  async: false,
  dataType: 'json',
  success: function (response) {
    value_regime1_analytical = response;
  }
});
$.ajax({
  url: "/SendstadPage/SubPlottingScripts/value_regime1_numerical.json",
  async: false,
  dataType: 'json',
  success: function (response) {
    value_regime1_numerical = response;
  }
});
$.ajax({
  url: "/SendstadPage/SubPlottingScripts/value_regime2_analytical.json",
  async: false,
  dataType: 'json',
  success: function (response) {
    value_regime2_analytical = response;
  }
});
$.ajax({
  url: "/SendstadPage/SubPlottingScripts/value_regime2_numerical.json",
  async: false,
  dataType: 'json',
  success: function (response) {
    value_regime2_numerical = response;
  }
});
$.ajax({
  url: "/SendstadPage/SubPlottingScripts/sigma1_3d.json",
  async: false,
  dataType: 'json',
  success: function (response) {
    sigma1_3d = response;
  }
});

$.ajax({
  url: "/SendstadPage/SubPlottingScripts/sigma2_3d.json",
  async: false,
  dataType: 'json',
  success: function (response) {
    sigma2_3d = response;
  }
});
$.ajax({
  url: "/SendstadPage/SubPlottingScripts/S0_vector.json",
  async: false,
  dataType: 'json',
  success: function (response) {
    S0_vector = response;
  }
});
$.ajax({
  url: "/SendstadPage/SubPlottingScripts/eps_regime1_analytical_sigma1.json",
  async: false,
  dataType: 'json',
  success: function (response) {
    eps_regime1_analytical_sigma1 = response;
  }
});
$.ajax({
  url: "/SendstadPage/SubPlottingScripts/eps_regime2_analytical_sigma1.json",
  async: false,
  dataType: 'json',
  success: function (response) {
    eps_regime2_analytical_sigma1 = response;
  }
});
$.ajax({
  url: "/SendstadPage/SubPlottingScripts/sigma2_2d.json",
  async: false,
  dataType: 'json',
  success: function (response) {
    sigma2_2d = response;
  }
});

$.ajax({
  url: "/SendstadPage/SubPlottingScripts/sigma1_2d.json",
  async: false,
  dataType: 'json',
  success: function (response) {
    sigma1_2d = response;
  }
});



$.getJSON("/SendstadPage/SubPlottingScripts/value_regime1_analytical.json", function(json) {
    value_regime1_analytical = json;
});
$.getJSON("/SendstadPage/SubPlottingScripts/value_regime1_numerical.json", function(json) {
    value_regime1_numerical = json;
});
$.getJSON("/SendstadPage/SubPlottingScripts/value_regime2_analytical.json", function(json) {
    value_regime2_analytical = json;
});
$.getJSON("/SendstadPage/SubPlottingScripts/value_regime2_numerical.json", function(json) {
    value_regime2_numerical = json;
});
$.getJSON("/SendstadPage/SubPlottingScripts/sigma1_2d.json", function(json) {
    sigma1_2d = json;
});
$.getJSON("/SendstadPage/SubPlottingScripts/sigma2_2d.json", function(json) {
    sigma2_2d = json;
});
$.getJSON("/SendstadPage/SubPlottingScripts/S0_vector.json", function(json) {
    S0_vector = json;
});

*/

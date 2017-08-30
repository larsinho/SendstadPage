


var  value_regime1_analytical;
var  value_regime1_numerical;
var  value_regime2_analytical;
var  value_regime2_numerical;
var  sigma1_3d;
var  sigma2_3d;
var  sigma1_2d;
var  sigma2_2d;
var  S0_vector;


$.ajax({
  url: "/SubPlottingScripts/value_regime1_analytical.json",
  async: false,
  dataType: 'json',
  success: function (response) {
    value_regime1_analytical = response;
  }
});
$.ajax({
  url: "/SubPlottingScripts/value_regime1_numerical.json",
  async: false,
  dataType: 'json',
  success: function (response) {
    value_regime1_numerical = response;
  }
});
$.ajax({
  url: "/SubPlottingScripts/value_regime2_analytical.json",
  async: false,
  dataType: 'json',
  success: function (response) {
    value_regime2_analytical = response;
  }
});
$.ajax({
  url: "/SubPlottingScripts/value_regime2_numerical.json",
  async: false,
  dataType: 'json',
  success: function (response) {
    value_regime2_numerical = response;
  }
});
$.ajax({
  url: "/SubPlottingScripts/sigma1_3d.json",
  async: false,
  dataType: 'json',
  success: function (response) {
    sigma1_3d = response;
  }
});

$.ajax({
  url: "/SubPlottingScripts/sigma2_3d.json",
  async: false,
  dataType: 'json',
  success: function (response) {
    sigma2_3d = response;
  }
});
$.ajax({
  url: "/SubPlottingScripts/S0_vector.json",
  async: false,
  dataType: 'json',
  success: function (response) {
    S0_vector = response;
  }
});
$.ajax({
  url: "/SubPlottingScripts/eps_regime1_analytical_sigma1.json",
  async: false,
  dataType: 'json',
  success: function (response) {
    eps_regime1_analytical_sigma1 = response;
  }
});
$.ajax({
  url: "/SubPlottingScripts/eps_regime2_analytical_sigma1.json",
  async: false,
  dataType: 'json',
  success: function (response) {
    eps_regime2_analytical_sigma1 = response;
  }
});
$.ajax({
  url: "/SubPlottingScripts/sigma2_2d.json",
  async: false,
  dataType: 'json',
  success: function (response) {
    sigma2_2d = response;
  }
});

$.ajax({
  url: "/SubPlottingScripts/sigma1_2d.json",
  async: false,
  dataType: 'json',
  success: function (response) {
    sigma1_2d = response;
  }
});

// General caclulations
//---------------------


var scriptSize = 20

// follower 12
//---------------------


var  value_regime1_analytical;
var  value_regime1_numerical;
var  value_regime2_analytical;
var  value_regime2_numerical;
var  sigma1_3d;
var  sigma2_3d;
var  sigma1_2d;
var  sigma2_2d;
var  S0_vector;


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


$(document).ready(function() {
    /*
    new_array[temp_i][jj] = arr_temp;
    */
    var sigma1 = 0.25
    var sigma2 = 0.25

    function fun_value(sigma1, sigma2) {
        var jj = sigma1_2d.indexOf(sigma1) // converts value into index
        var ii = sigma2_2d.indexOf(sigma2) // converts value into index
       console.log('funciton call', sigma1, sigma2, ii, jj)
        var arr_reg1_analytical = value_regime1_analytical[ii][jj];
        var arr_reg1_numerical = value_regime1_numerical[ii][jj];
        var arr_reg2_analytical = value_regime2_analytical[ii][jj];
        var arr_reg2_numerical = value_regime2_numerical[ii][jj];
        /*
        var eps1 = eps_regime1_analytical_sigma1[ii][jj];
        var eps2 = eps_regime2_analytical_sigma1[ii][jj];
        */
        var eps1 = 0;
        var eps2 = 0;
        return [arr_reg1_analytical, arr_reg1_numerical, arr_reg2_analytical, arr_reg2_numerical, eps1, eps2]
    };


    // ------------------------- Slider--------------------------//


    [arr_reg1_analytical, arr_reg1_numerical, arr_reg2_analytical, arr_reg2_numerical, eps1, eps2]= fun_value(sigma1, sigma2)
    // My Plotly graph
    htmlElementAversion = document.getElementById('Phi2_follow');
    var layout = {
        xaxis: {
            title: 'Output price, E',
            size:scriptSize,
        },
        yaxis: {
            title: 'Option value',
            range: [0,40],
            size:scriptSize
        },
        font: {size:scriptSize,
                   color: "white"
        },
        paper_bgcolor: 'rgba(0,0,0,0.0)',
        plot_bgcolor: 'rgba(0,0,0,0.0)'
    }
    var trace1 = {
        x: S0_vector,
        y: arr_reg1_analytical,
    };

    Plotly.newPlot(htmlElementAversion , [trace1, trace1, trace1, trace1], layout, {
        showLink: false
    });

    /*
    function lessthan_eps12_follow(element) {
        return element > this.eps12_follow;
    }
    */

    function sliderFunction(sigma1, sigma2) {

        [arr_reg1_analytical, arr_reg1_numerical, arr_reg2_analytical, arr_reg2_numerical, eps1, eps2]= fun_value(sigma1, sigma2);

        Plotly.deleteTraces(htmlElementAversion, [0, 1, 2, 3]);
        Plotly.addTraces(htmlElementAversion, [{
                x: S0_vector,
                y: arr_reg1_analytical,
                name: "Regime 1, Analytical_"
            },
            {
                x: S0_vector,
                y: arr_reg1_numerical,
                name: "Regime 1, Numerical"
            },
            {
                x: S0_vector,
                y: arr_reg2_analytical,
                name: "Regime 2, Analytical"
            },
            {
                x: S0_vector,
                y: arr_reg2_numerical,
                name: "Regime 2, Numerical"
            }
        ]);
        // My Plotly graph
    }

    // -------------------------------
    // Slider


    var initialValueSigma1 = 0.175;
    var initialValueSigma2 = 0.325;
    $('#boxSigma1').html(initialValueSigma1)
    $('#boxSigma2').html(initialValueSigma2);

    var valMap1 = sigma1_2d;
    $("#sliderSigma1").slider({
      max: valMap1.length - 1, // Set "max" attribute to array length
      min: 0,
      values: [2],
      slide: function(event, ui) {
        $("#sliderSigma1").val(valMap1[ui.values[0]]); // Fetch selected value from array
        $('#boxSigma1').html(valMap1[ui.values[0]]);
        var temp_sigma2 = Number($('#boxSigma2').text());
        sliderFunction(valMap1[ui.values[0]], temp_sigma2);
        //console.log(temp_sigma2, valMap1[ui.values[0]]);
      }
    });
    var valMap2 =sigma2_2d;
    $("#sliderSigma2").slider({
      max: valMap2.length - 1, // Set "max" attribute to array length
      min: 0,
      values: [2],
      slide: function(event, ui) {
        $("#sliderSigma2").val(valMap2[ui.values[0]]); // Fetch selected value from array
        $('#boxSigma2').html(valMap2[ui.values[0]]);
        var temp_sigma1 = Number($('#boxSigma1').text());
        sliderFunction(temp_sigma1, valMap2[ui.values[0]]);
      }
    });



    Plotly.newPlot(htmlElementAversion, [{
            x: S0_vector,
            y: arr_reg1_analytical,
            name: "Regime 1, Analytical"
        },
        {
            x: S0_vector,
            y: arr_reg1_numerical,
            name: "Regime 2, Numerical"
        },
        {
            x: S0_vector,
            y: arr_reg2_analytical,
            name: "Regime 2, Analytical"
        },
        {
            x: S0_vector,
            y: arr_reg2_numerical,
            name: "Regime 2, Numerical"
        }
    ],
    layout );

});​

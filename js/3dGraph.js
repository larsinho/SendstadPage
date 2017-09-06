function fun_3dPlot() {

    z1 = [
        [8.83,8.89,8.81,8.87,8.9,8.87],
        [8.89,8.94,8.85,8.94,8.96,8.92],
        [8.84,8.9,8.82,8.92,8.93,8.91],
        [8.79,8.85,8.79,8.9,8.94,8.92],
        [8.79,8.88,8.81,8.9,8.95,8.92],
        [8.8,8.82,8.78,8.91,8.94,8.92],
        [8.75,8.78,8.77,8.91,8.95,8.92],
        [8.8,8.8,8.77,8.91,8.95,8.94],
        [8.74,8.81,8.76,8.93,8.98,8.99],
        [8.89,8.99,8.92,9.1,9.13,9.11],
        [8.97,8.97,8.91,9.09,9.11,9.11],
        [9.04,9.08,9.05,9.25,9.28,9.27],
        [9,9.01,9,9.2,9.23,9.2],
        [8.99,8.99,8.98,9.18,9.2,9.19],
        [8.93,8.97,8.97,9.18,9.2,9.18]
    ];

    z2 = [];
    for (var i=0;i<z1.length;i++ ) {
      z2_row = [];
        for(var j=0;j<z1[i].length;j++) {
          z2_row.push(z1[i][j]+1);
        }
        z2.push(z2_row);
    }

    z3 = []
    for (var i=0;i<z1.length;i++ ) {
      z3_row = [];
        for(var j=0;j<z1[i].length;j++) {
          z3_row.push(z1[i][j]-1);
        }
        z3.push(z3_row);
    }
    var data_z1 = {z: z1, type: 'surface'};
    var data_z2 = {z: z2, showscale: false, opacity:0.9, type: 'surface'};
    var data_z3 = {z: z3, showscale: false, opacity:0.9, type: 'surface'};
    var layout = {
        xaxis: {
            title: 'Sigma 1'
        },
        yaxis: {
            title: 'Sigma 2'
        },
        font: {
            color: "white"
        },
        paper_bgcolor: 'rgba(0,0,0,0.0)',
        plot_bgcolor: 'rgba(0,0,0,0.0)'
    }
    Plotly.newPlot('myDiv', [data_z1, data_z2, data_z3], layout);


    // ---------------- 2D Plot -----------------------//
    var sigma1 = 0.25
    var sigma2 = 0.25

    function fun_value(sigma1, sigma2) {
        var jj = sigma1_2d.indexOf(sigma1); // converts value into index
        var ii = sigma2_2d.indexOf(sigma2); // converts value into index
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
    [arr_reg1_analytical, arr_reg1_numerical, arr_reg2_analytical, arr_reg2_numerical, eps1, eps2] = fun_value(sigma1, sigma2)
    // My Plotly graph
    htmlElementAversion = document.getElementById('Phi2_follow');
    var layout = {
        xaxis: {
            title: 'Output price, E',
            size: scriptSize,
        },
        yaxis: {
            title: 'Option value',
            range: [0, 40],
            size: scriptSize
        },
        font: {
            size: scriptSize,
            color: "white"
        },
        paper_bgcolor: 'rgba(0,0,0,0.0)',
        plot_bgcolor: 'rgba(0,0,0,0.0)'
    }
    var trace1 = {
        x: S0_vector,
        y: arr_reg1_analytical,
    };

    Plotly.newPlot(htmlElementAversion, [trace1, trace1, trace1, trace1], layout, {
        showLink: false
    });

    /*
    function lessthan_eps12_follow(element) {
        return element > this.eps12_follow;
    }
    */

    function sliderFunction(sigma1, sigma2) {

        [arr_reg1_analytical, arr_reg1_numerical, arr_reg2_analytical, arr_reg2_numerical, eps1, eps2] = fun_value(sigma1, sigma2);

        Plotly.deleteTraces(htmlElementAversion, [0, 1, 2, 3]);
        Plotly.addTraces(htmlElementAversion, [{
                x: S0_vector,
                y: arr_reg1_analytical,
                name: "Regime 1, Analytical"
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
    var valMap2 = sigma2_2d;
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
        layout);


    document.getElementById("newsletter").style.padding = "30px 30px 120px 30px";
};

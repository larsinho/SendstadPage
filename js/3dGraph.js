function fun_3dPlot() {


    function matrixLoop(varName,idx) {
        var outputMatrix =[]
        varName.forEach(function(entry1) {
            var tempMatrix =[];
            entry1.forEach(function(entry2) {
                tempMatrix.push(entry2[idx]);
            });
            outputMatrix.push(tempMatrix);
        });
        return outputMatrix
    };


    var data_z1 = {z: matrixLoop(value_regime1_analytical,5),
                             y:sigma1_3d,
                             x:sigma2_3d,
                             type: 'surface'};
    var data_z2 = {z: matrixLoop(value_regime1_numerical,5),
                            y:sigma1_3d,
                            x:sigma2_3d,
                            showscale: false, opacity:0.99, type: 'surface'};
    var data_z3 = {z: matrixLoop(value_regime2_analytical,5),
                            y:sigma1_3d,
                            x:sigma2_3d,
                             showscale: false, opacity:0.99, type: 'surface'};
    var data_z4 = {z: matrixLoop(value_regime2_numerical,5),
                            y:sigma1_3d,
                            x:sigma2_3d,
                            showscale: false, opacity:0.99, type: 'surface'};
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

    var layout = {
      autosize: false,
      width: 100%,
      height: 500,
      paper_bgcolor: 'rgba(0,0,0,0.0)',
      plot_bgcolor: 'rgba(0,0,0,0.0)',
      font: {
          color: "white"
      },
      margin: {
        l: 65,
        r: 50,
        b: 65,
        t: 90,
        }
        };

    Plotly.newPlot('myDiv', [data_z1, data_z2, data_z3, data_z4], layout);

    document.getElementById("newsletter").style.padding = "30px 30px 120px 30px";
};

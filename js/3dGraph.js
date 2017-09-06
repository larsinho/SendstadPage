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
                            showscale: false, opacity:0.9, type: 'surface'};
    var data_z3 = {z: matrixLoop(value_regime2_analytical,5),
                            y:sigma1_3d,
                            x:sigma2_3d,
                             showscale: false, opacity:0.9, type: 'surface'};
    var data_z4 = {z: matrixLoop(value_regime2_numerical,5),
                            y:sigma1_3d,
                            x:sigma2_3d,
                            showscale: false, opacity:0.9, type: 'surface'};
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
      title: 'Mt Bruno Elevation',
      autosize: false,
      width: 500,
      height: 500,
      margin: {
        l: 65,
        r: 50,
        b: 65,
        t: 90,
        },
        font: {
            color: "white"
        },
        paper_bgcolor: 'rgba(0,0,0,0.0)',
        plot_bgcolor: 'rgba(0,0,0,0.0)'
        }
        };

    Plotly.newPlot('myDiv', [data_z1, data_z2, data_z3, data_z4], layout);

    document.getElementById("newsletter").style.padding = "30px 30px 120px 30px";
};

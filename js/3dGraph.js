var tot_width;

$("#regimeButton").click(function() {
    // Main plotting function
    riskAverisonFunction();
});

function fun_3dPlot() {
    function matrixLoop(varName, idx) {
        var outputMatrix = [];
            varName.forEach(function(entry1) {
                var tempMatrix = [];
                entry1.forEach(function(entry2) {
                    tempMatrix.push(entry2[idx]);
                });
                outputMatrix.push(tempMatrix);
            });
        return outputMatrix;
    }


    var data_z1 = {
        name: 'Analytical 1',
        z: matrixLoop(value_regime1_analytical, 5),
        y: sigma1_3d,
        x: sigma2_3d,
        type: 'surface',
        colorscale: 'Greens',
        showscale: false
    };
    var data_z2 = {
        numerical: 'Numerical 1',
        z: matrixLoop(value_regime1_numerical, 5),
        y: sigma1_3d,
        x: sigma2_3d,
        showscale: false,
        opacity: 0.99,
        type: 'surface',
        colorscale: 'Greens',
    };
    var data_z3 = {
        numerical: 'Analytical 2',
        z: matrixLoop(value_regime2_analytical, 5),
        y: sigma1_3d,
        x: sigma2_3d,
        showscale: false,
        opacity: 1,
        type: 'surface',
        colorscale: 'Reds',
    };
    var data_z4 = {
        numerical: 'Numerical 2',
        z: matrixLoop(value_regime2_numerical, 5),
        y: sigma1_3d,
        x: sigma2_3d,
        showscale: false,
        opacity: 0.99,
        type: 'surface',
        colorscale: 'Reds',
    };

    tot_width = $(window).width() * 0.8;
    var layout = {
        scene: {
            xaxis: {
                title: 'Sigma 2'
            },
            yaxis: {
                title: 'Sigma 1'
            },
            zaxis: {
                title: 'Value'
            },
            aspectratio: {
                x: 1,
                y: 1,
                z: 1
            },
            camera: {
                center: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                eye: {
                    x: -1.5,
                    y: -1.5,
                    z: 1.5
                },
                up: {
                    x: 0,
                    y: 0,
                    z: 1
                }
            },
        },
        autosize: true,
        paper_bgcolor: 'rgba(0,0,0,0.0)',
        plot_bgcolor: 'rgba(0,0,0,0.0)',
        font: {
            color: "black"
        },
        margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0,
            pad: 0
        },
    };
    Plotly.newPlot('RegimeSwitching3DGraph', [data_z1, data_z2, data_z3, data_z4], layout);
}

// General caclulations
//---------------------

$("#riskAversionButton").click(function() {
    // Removes element added in function if they exist
    if (document.contains(document.getElementById("sliderBody1"))) {
                document.getElementById("sliderBody1").remove();
    }
    if (document.contains(document.getElementById("sliderBody2"))) {
                document.getElementById("sliderBody2").remove();
    }
    console.log(123);
    riskAverisonFunction();
});




function riskAverisonFunction() {

    var D1uBar = 7;
    var D2uBar = 13;
    var D1lBar = 9;
    var D2lBar = 20;
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
    for (var i = 0; i < 5000; i++) {
        Pt.push(i / 100);
    }
    var scriptSize = 20;


    // follower 12
    //---------------------

    function fun_Phi1F12_follow(GAMMA, Sigma) {
        var Phi2_follow = [];
        var F12_follow = [];

        var bb = (mu - 0.5 * Sigma**2);
        var beta1 = (-bb + (bb ** 2 + 2 * Sigma ** 2 * (rho)) ** 0.5) / (Sigma ** 2);
        var beta2 = (-bb - (bb ** 2 + 2 * Sigma ** 2 * (rho)) ** 0.5) / (Sigma ** 2);
        var scriptA = (beta1 * beta2) / (rho * (beta1 - GAMMA) * (beta2 - GAMMA));

        var delta1 = ((-bb + (bb ** 2 + 2 * Sigma ** 2 * (rho + LAMBDA)) ** 0.5) / (Sigma ** 2));
        var delta2 = ((-bb - (bb ** 2 + 2 * Sigma ** 2 * (rho + LAMBDA)) ** 0.5) / (Sigma ** 2));
        var scriptB = scriptA / (scriptA * LAMBDA + 1)

        function U(p) {
            return p ** GAMMA / GAMMA; // The function returns the product of p1 and p2
        }

        this.eps12_follow = r * I2 * ((beta2 - GAMMA) / (beta2 * (D2uBar ** GAMMA - D1uBar ** GAMMA))) ** (1 / GAMMA)
        A12_follow = (1 / this.eps12_follow) ** beta1 * (scriptA * U(this.eps12_follow) *
            (D2uBar ** GAMMA - D1uBar ** GAMMA) - U(r * I2) / (rho));


        function vfun_Phi2_follow(p) {
            return (scriptA * U(p * D2uBar) - U(r * I1) / rho - U(r * I2) / rho) // Value funciton follower after investment
        }

        function vfun_F12_follow(p) {
            return (scriptA * U(p * D1uBar) - U(r * I1) / rho + A12_follow * p ** beta1) //
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

    [Phi2_follow, F12_follow] = fun_Phi1F12_follow(1.0, 0.2)
    // My Plotly graph
    htmlElementAversion = document.getElementById('RiskAversionGraph');
    var layout = {
        autosize: true,
        paper_bgcolor: 'rgba(0,0,0,0.0)',
        plot_bgcolor: 'rgba(0,0,0,0.0)',
        xaxis: {
            title: 'Output price, E',
            size: scriptSize,
        },
        yaxis: {
            title: 'Project value',
            range: [-4000, 8000],
            size: scriptSize
        },
        fornt: {
            size: scriptSize
        }

    }
    var trace1 = {
        x: Pt,
        y: Phi2_follow,
    };


    Plotly.newPlot(htmlElementAversion, [trace1, trace1, trace1], layout, {
        showLink: false
    });

    function lessthan_eps12_follow(element) {
        return element > this.eps12_follow;
    }

    function sliderFunction(gamma, Sigma) {
        [Phi2_follow, F12_follow] = fun_Phi1F12_follow(gamma, Sigma)
        var idx = Pt.findIndex(lessthan_eps12_follow);

        Plotly.deleteTraces(htmlElementAversion, [0, 1, 2]);
        Plotly.addTraces(htmlElementAversion, [{
                x: Pt,
                y: Phi2_follow,
                name: "Follower state 2"
            },
            {
                x: Pt,
                y: F12_follow.slice(0, idx),
                name: "Follower state 12"
            },
            {
                x: [Pt[idx]],
                y: [F12_follow[idx]],
                mode: 'markers+text',
                name: 'Investment threshold',
                text: ['Follower', 'Leader'],
                textposition: 'top left',
                type: 'scatter'
            }
        ]);
        // My Plotly graph
    }

    // -------------------------------
    // Slider


    var initialValueAversion = 1;
    var initialValueVolatility = 0.2;


    $("#RiskAversionBody").append('<div id="sliderBody1">Risk aversion: <br /> </div>');
    $("#sliderBody1").append('<div class="sliders" id="sliderAversion"></div>');
    $("#sliderBody1").append('<div class="valueBox" id="boxAversion"></div>');

    $("#RiskAversionBody").append('<div id="sliderBody2">Volatility:  <br /> </div>');
    $("#sliderBody2").append('<div class="sliders" id="sliderVolatility"></div>');
    $("#sliderBody2").append('<div class="valueBox" id="boxAVolatility"></div>');


    var sliderTooltipAversion = function(event, ui) {
        var curValueAversion = ui.value || initialValueAversion;
        var vol = Number($('#boxAVolatility').text());
        $('#boxAversion').html(curValueAversion);
        sliderFunction(curValueAversion, vol);
    }

    var sliderTooltipVolatility = function(event, ui) {
        var curValueVolatility = ui.value || initialValueVolatility;;
        var aversion = Number($('#boxAversion').text());
        $('#boxAVolatility').html(curValueVolatility);
        sliderFunction(aversion, curValueVolatility);
    }

    $("#sliderAversion").slider({
        value: initialValueAversion,
        min: 0.8,
        max: 1.2,
        step: 0.02,
        create: sliderTooltipAversion,
        slide: sliderTooltipAversion
    });

    $("#sliderVolatility").slider({
        value: initialValueVolatility,
        min: 0.1,
        max: 0.3,
        step: 0.02,
        create: sliderTooltipVolatility,
        slide: sliderTooltipVolatility
    });


    var idx = Pt.findIndex(lessthan_eps12_follow);



    Plotly.newPlot(htmlElementAversion, [{
                x: Pt,
                y: Phi2_follow,
                name: "Follower state 2"
            },
            {
                x: Pt,
                y: F12_follow.slice(0, idx),
                name: "Follower state 12"
            },
            {
                x: [Pt[idx]],
                y: [F12_follow[idx]],
                mode: 'markers+text',
                name: 'Investment threshold',
                text: ['Follower', 'Leader'],
                textposition: 'top left',
                type: 'scatter'
            }
        ],
        layout);


}

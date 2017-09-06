// General caclulations
//---------------------

// Variables are alreayd defined

// follower 12
//---------------------

$("#competitionButton").click(function() {

if (document.contains(document.getElementById("sliderBodyComp"))) {
            document.getElementById("sliderBodyComp").remove();
}
    competitionFunction();
});

function competitionFunction() {

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
        Pt.push(i / 100)
    }

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

    function fun_Phi1F12_leader(GAMMA) {

        var Phi2_leader = []
        var F12_leader = []

        bb = (mu - 0.5 * Sigma ** 2);
        beta1 = (-bb + (bb ** 2 + 2 * Sigma ** 2 * (rho)) ** 0.5) / (Sigma ** 2);
        beta2 = (-bb - (bb ** 2 + 2 * Sigma ** 2 * (rho)) ** 0.5) / (Sigma ** 2);
        scriptA = (beta1 * beta2) / (rho * (beta1 - GAMMA) * (beta2 - GAMMA));

        delta1 = ((-bb + (bb ** 2 + 2 * Sigma ** 2 * (rho + LAMBDA)) ** 0.5) / (Sigma ** 2));
        delta2 = ((-bb - (bb ** 2 + 2 * Sigma ** 2 * (rho + LAMBDA)) ** 0.5) / (Sigma ** 2));
        scriptB = scriptA / (scriptA * LAMBDA + 1)

        function U(p) {
            return p ** GAMMA / GAMMA; // The function returns the product of p1 and p2
        }

        [Phi2_follow, F12_follow] = fun_Phi1F12_follow(GAMMA, Sigma)


        var A2_leader = (1 / this.eps12_follow) ** beta1 * (scriptA * U(this.eps12_follow) *
            (D2uBar ** GAMMA - D2lBar ** GAMMA))

        function vfun_Phi2_leader(p) {
            return (scriptA * U(p * D2lBar) - U(r * I1) / rho - U(r * I2) / rho + A2_leader * p ** beta1) // The function returns the product of p1 and p2
        }
        for (i = 0; i < Pt.length; i++) {
            Phi2_leader[i] = vfun_Phi2_leader(Pt[i]);
        }

        this.eps12_leader = r * I2 * ((beta2 - GAMMA) / (beta2 * (D2lBar ** GAMMA - D1uBar ** GAMMA))) ** (1 / GAMMA)
        var A12_leader = (1 / this.eps12_leader) ** beta1 * (scriptA * U(this.eps12_leader) * (D2lBar ** GAMMA - D1uBar ** GAMMA) - U(r * I2) / (rho) + A2_leader * this.eps12_leader ** beta1)

        function vfun_F12_leader(p) {
            return (scriptA * U(p * D1uBar) - U(r * I1) / rho + A12_leader * p ** beta1)
        }
        for (i = 0; i < Pt.length; i++) {
            F12_leader[i] = vfun_F12_leader(Pt[i]);
        }


        return [Phi2_follow, F12_follow, Phi2_leader, F12_leader]
    }


    // -------------------------------- PLOTTING ---------------------------------------------------------------//

    [Phi2_follow, F12_follow, Phi2_leader, Phi2_leader, F12_leader] = fun_Phi1F12_leader(1.0)

    htmlElementCompet = document.getElementById('CompetitionGraph');

    var layout = {
        autosize: true,
        paper_bgcolor: 'rgba(0,0,0,0.0)',
        plot_bgcolor: 'rgba(0,0,0,0.0)',
        xaxis: {
            title: 'Output price, E ',
            size: scriptSize
        },
        yaxis: {
            title: 'Project value',
            range: [-4000, 8000],
            size: scriptSize
        }
    }
    var trace1 = {
        x: Pt,
        y: Phi2_follow,
    };


    Plotly.newPlot(htmlElementCompet, [trace1, trace1, trace1, trace1, trace1], layout, {
        showLink: false
    });

    function lessthan_eps12_follow(element) {
        return element > this.eps12_follow;
    }

    function lessthan_eps12_leader(element) {
        return element > this.eps12_leader;
    }

    function sliderFunction_competition(x) {
        [Phi2_follow, F12_follow, Phi2_leader, F12_leader] = fun_Phi1F12_leader(x)
        var idx = Pt.findIndex(lessthan_eps12_follow);
        var idx_leader = Pt.findIndex(lessthan_eps12_leader);

        Plotly.deleteTraces(htmlElementCompet, [0, 1, 2, 3, 4]);
        Plotly.addTraces(htmlElementCompet, [{
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
                x: Pt,
                y: Phi2_leader.slice(0, idx),
                name: "Leader state 2"
            },
            {
                x: Pt,
                y: F12_leader.slice(0, idx_leader),
                name: "Leader state 12"
            },
            {
                x: [Pt[idx], Pt[idx_leader]],
                y: [F12_follow[idx], F12_leader[idx_leader]],
                mode: 'markers+text',
                name: 'Investment thresholds',
                text: ['Follower', 'Leader'],
                textposition: 'top left',
                type: 'scatter'
            }
        ]);

    }

    // -------------------------------
    // Slider


$("#competitionBody").append('<div id="sliderBodyComp">Risk aversion: <br /> </div>');
$("#sliderBodyComp").append('<div class="sliders" id="sliderCompetiton"></div>');
$("#sliderBodyComp").append('<div class="valueBox" id="boxCompetition"></div>');


    var initialValue = 1;

    var sliderTooltipCompetiton = function(event, ui) {
        var curValue = ui.value || initialValue;
        $('#boxCompetition').html(curValue);
        sliderFunction_competition(curValue)
    }

    $("#sliderCompetiton").slider({
        value: initialValue,
        min: 0.75,
        max: 1.25,
        step: 0.05,
        create: sliderTooltipCompetiton,
        slide: sliderTooltipCompetiton
    });

    var idx = Pt.findIndex(lessthan_eps12_follow);
    var idx_leader = Pt.findIndex(lessthan_eps12_leader);

    Plotly.newPlot(htmlElementCompet, [{
            x: Pt,
            y: Phi2_follow,
            name: "Follower state 2"
        },
        {
            x: Pt,
            y: F12_follow.slice(0, idx),
            name: "Follower state 12",
            visible: "legendonly"
        },
        {
            x: Pt,
            y: Phi2_leader.slice(0, idx),
            name: "Leader state 2",
            visible: "legendonly"
        },
        {
            x: Pt,
            y: F12_leader.slice(0, idx_leader),
            name: "Leader state 12",
            visible: "legendonly"
        },
        {
            x: [Pt[idx], Pt[idx_leader]],
            y: [F12_follow[idx], F12_leader[idx_leader]],
            mode: 'markers+text',
            name: 'Investment thresholds',
            text: ['Follower', 'Leader'],
            textposition: 'top left',
            type: 'scatter',
            visible: "legendonly"
        }
    ], layout);

}

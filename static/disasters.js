let map = L.map("map", {
    center: [39.83, -99.09],
    zoom: 5
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const url = "https://www.fema.gov/api/open/v1/FemaWebDisasterDeclarations";

const stateArray = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
    'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
    'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
    'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
    'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

let stateObj = {};

// D3 call & function
d3.json(url).then((response) => {
    let disasters = response.FemaWebDisasterDeclarations;
    console.log(disasters);
    var year = 2016;

    let select = document.getElementById("selState");
    for (let i = 0; i < stateArray.length; i++) {
        let option = stateArray[i];
        let element = document.createElement("option");
        element.textContent = option;
        element.value = option;
        select.appendChild(element);
    }

    for (i = 0; i < stateArray.length; i++) {
        stateObj[stateArray[i]] = [];
    }

    d3.select("#selYear").on("change", yearChange);
    function yearChange() {
        let selection = d3.select("#selYear");
        year = selection.property('value');
        updatePie(year);
      }

    function updatePie(year) {
        let disasterCounts = {};
        for (let i = 0; i < disasters.length; i++) {
            if (disasters[i].incidentBeginDate.includes(year)) {
            let disType = disasters[i].incidentType;
            if (disType in disasterCounts) {
                disasterCounts[disType] ++;
            }
            else{
                disasterCounts[disType] = 1;
            }
        }
    }
        let trace = [{
            values: Object.values(disasterCounts),
            labels: Object.keys(disasterCounts),
            type: 'pie'
        }];
        let layout = {height: 500, width: 500};

        Plotly.newPlot('pie',trace,layout);
        console.log(disasterCounts);
    }

    // Update the chart for state
    d3.select("#selState").on("change", stateChange);
    function stateChange() {
        let selection = d3.select("#selState");
        state = selection.property('value');
        updatePlot(state);
      }
    function updatePlot(state) {
        let yearlyCounts = {'2016':0,'2017':0,'2018':0,'2019':0,'2020':0,'2021':0,'2022':0,'2023':0};
        for (let i = 0; i < disasters.length; i++) {
            let year = disasters[i].incidentBeginDate.slice(0,4);
            if (disasters[i].stateCode === state) {
                yearlyCounts[year] ++;
            }
        }
        let trace = [{
            x: Object.keys(yearlyCounts),
            y: Object.values(yearlyCounts),
            type: 'scatter'
        }]
        Plotly.newPlot('plot',trace);
        console.log(yearlyCounts);
    }


    
    // for (j = 0; j < disasters.length; j++) {
    //     let state = disasters[i].stateCode;
    //     stateObj[state].push({'incidentType':disasters[i].incidentType})
    //     // console.log(stateObj.key,stateObj[state]);
        // for (k = 0; k < stateObj.length; k++) {
            
            // if (state == stateObj.key) {
            //     stateObj[k].push({'disasterNumber':disasters[i].disasterNumber,
            //     'disasterName':disasters[i].disasterName,'incidentBeginDate':disasters[i].incidentBeginDate,
            //     'incidentEndDate':disasters[i].incidentEndDate,'incidentType':disasters[i].incidentType,
            //     'stateCode':disasters[i].stateCode,'stateName':disasters[i].stateName})
            // }
        // }


    

    // let yearDisasters = [];
    // console.log(disasters);
    
    
    // console.log(year);
    // let year = d3.select("#selYear").on("change", updateYear);
    // function updateYear() {
    //     let dropdownMenu = d3.select("#selYear");
    //     let year = dropdownMenu.property("value"); 
    //     return(year);
    // }

    // let disasterType = d3.select("#selDisaster").on("change", updateDisaster);
    // function updateDisaster() {
    //     let dropdownMenu = d3.select("#selDisaster");
    //     let disasterType = dropdownMenu.property("value");
    //     return(disasterType);
    // }
    // console.log(year, disasterType);

        
    //     function updateMapPie(year) {
    //         for (let i = 0; i < disasters.length; i++) {
    //             let disaster = disasters[i];
    //             if (disaster.incidentBeginDate.includes(year)) {
    //                 yearDisasters.push(disaster);
    //             };
            
    //     }
        
    // }
    // let geojason = L.choropleth(yearDisasters, {
    //     valueProperty: ""
    // })
    
});

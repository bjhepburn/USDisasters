let map = L.map("map", {
    center: [39.83, -99.09],
    zoom: 5
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const url = "https://www.fema.gov/api/open/v1/FemaWebDisasterDeclarations";


// D3 call & function
d3.json(url).then((response) => {
    let yearDisasters = [];
    let disasters = response.FemaWebDisasterDeclarations;
    // console.log(disasters);
    let year = d3.select("#selDataset").on("change", updateYear);
    
    function updateYear() {
        let dropdownMenu = d3.select("#selDataset");
        let selection = dropdownMenu.property("value"); 
        console.log(selection);
        updateMapPie(selection);
    

        
        function updateMapPie(year) {
            for (let i = 0; i < disasters.length; i++) {
                let disaster = disasters[i];
                if (disaster.incidentBeginDate.includes(year)) {
                    yearDisasters.push(disaster);
                };
            
        }
        
    }
    let geojason = L.choropleth(yearDisasters, {
        valueProperty: ""
    })
    console.log(yearDisasters);
}
});
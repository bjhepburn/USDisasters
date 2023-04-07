let map = L.map("map", {
    center: [39.83, -99.09],
    zoom: 2
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const url = "https://www.fema.gov/api/open/v1/FemaWebDisasterDeclarations";


// D3 call & function
d3.json(url).then((response) => {
    let disasters = response.FemaWebDisasterDeclarations;

    d3.select("#selDataset").on("change", optionChanged);
    function optionChanged() {
        let dropdownMenu = d3.select("#selDataset");
        let selection = dropdownMenu.property("value"); 
        console.log(selection);
    }
    
});
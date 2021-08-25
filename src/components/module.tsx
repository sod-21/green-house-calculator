export const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export const returnAnnual = (e) => {
       
    switch (e) {
        case "Electricity for export to grid":
            return "Annual net surplus electricity to grid (kWh/year)";
            break;
        case "Natural gas for pipeline injection":
            return "Annual pipeline injection (scf/year)";
            break;

        case "Vehicle fuel (RNG)":
            return "Annual RNG production (scf/year)";
            break;
        
        case "Vehicle fuel (hydrogen)":
            return "Annual hydrogen fuel production (kg/year)";
            break;
        case "Vehicle fuel (DME)":
            return "Annual DME production (gallons/year)"
            break;
    }

    return "Quantity of bioenergy or biofuel produced annually";
}
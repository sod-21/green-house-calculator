import React, {useState} from "react";
import qs from "qs";
import axios from 'axios';

const reactLogo = require("./../assets/img/react_logo.svg");
import "./../assets/scss/App.scss";

import General from './General';
import Landfill from "./Landfill";
import Operation from "./Operation";
import Diverted from "./Diverted";
import Digestate from "./Digestate";

import Transport from "./Transport";
import Loading from "./Loading";
import Result from "./Result";
import {returnAnnual} from "./module";

const get_change_format = (x) =>  {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const replace_special_charactor = (x) => {
   return x.replace("≤", "<=");
}

const exportToCsv = (filename, rows) => {
  var processRow = function (row) {
      var finalVal = '';
      for (var j = 0; j < row.length; j++) {
          var innerValue = row[j] === null ? '' : row[j].toString();
          if (row[j] instanceof Date) {
              innerValue = row[j].toLocaleString();
          };
          var result = innerValue.replace(/"/g, '""');
          if (result.search(/("|,|\n)/g) >= 0)
              result = '"' + result + '"';
          if (j > 0)
              finalVal += ',';
          finalVal += result;
      }
      return finalVal + '\n';
  };

  var csvFile = '';
  for (var i = 0; i < rows.length; i++) {
      csvFile += processRow(rows[i]);
  }

  var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, filename);
  } else {
      var link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
          // Browsers that support HTML5 download attribute
          var url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", filename);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }
  }
};

const App:React.FC = () => {
  const ajax_url = (window as any).acr_url;
  const last_step = 5;
  
  const [inputs, setInputs] = useState({
    bond_isser: "",
    bond_name: "",
    isin: "",
    cusip_member: "",
    project_name: "",
    contact_person: "",
    contact_email: "",
    contact_phone: "",
    InputDollars: 0,
    InputTotalDollars: 0,
  });

  const [show_error, setShowError] = useState(false);

  const [lan_inputs, setLandInputs] = useState({
    InputState: "",
    InputLFGSystem: "",
    InputMoisture: "",
    InputCollectionEfficiency: "",
    InputPrimEndUseGas: "",  
    InputPercentPrime: "",
    InputSecEndUseGas: "",
    InputPercentSec: "",
  });

  const [anaerobic_inputs, setAnaerobicInputs] = useState({
    InputOpLife: "",
    InputYEARS_ti: "",
    InputOpType: ""
  });

  const [diverted, setDiverted] = useState({
    InputTONSmo_ti: "",
    InputTONSmo_tr: "",
    InputTONSfw_ti: "",
    InputTONSfw_tr: "",
    InputTONSyw_ti: "",
    InputTONSyw_tr: "",    
    InputRML_ti: "",
    InputRML_tr: ""
  });

  const [transport, setTransport] = useState({
    InputMilesFacility: "",
    InputMilesLandfill: "",
    InputMilesResidual: "",
    /* add the fields */
    InputMilesCompost: "",    
    InputAltFuel: "",
    InputBiodsl: "",
    InputCNG: "",
    InputRNG: "",
    InputHyd: "",
    InputEV: "",
  });

  const [digestate, setDigestate] = useState({
    InputPLA: ""
  });


  const changeTransport = (e) => {
    const updatedInputs = Object.assign({}, transport, e);
    setTransport(updatedInputs);
  }

  const changeDiverted = (e) => {
    const updatedInputs = Object.assign({}, diverted, e);
    setDiverted(updatedInputs);
  }

  
  const changeDigestate = (e) => {
    const updatedInputs = Object.assign({}, digestate, e);
    setDigestate(updatedInputs);
  }
  

  const changeOperation = (e) => {
    const updatedInputs = Object.assign({}, anaerobic_inputs, e);
    setAnaerobicInputs(updatedInputs);
  }

  const [loading, setLoading] = useState(0);

  const [step, setStep] = useState(0);
  const [showResult, setShowResult] = useState(0);
  const [result, setResult] = useState({
    total: [],
    pro_rate: [],
    re_year: [],
    F117: "",
    F118: "",
    F124: "",
    graph: [],
    metric: []
  });

  const changeGeneral = (e) => {
    const updatedInputs = Object.assign({}, inputs, e);
    setInputs(updatedInputs);
  }

  const changeLand = (e) => {
    const updatedInputs = Object.assign({}, lan_inputs, e);
    setLandInputs(updatedInputs);
  }

  const calculateResult = () => {
    // setStep(5);
    // return true;
    // if (!digestate.InputPLA) {
    //   setShowError(true);
    //   return false;
    // }
    setShowError(false);

    setLoading(1);
    
    axios.post(ajax_url, qs.stringify({
      action: "ert_calculator",
      InputDollars: inputs.InputDollars,
      InputTotalDollars: inputs.InputTotalDollars,

      InputState: lan_inputs.InputState,
      InputLFGSystem: lan_inputs.InputLFGSystem,
      InputMoisture: lan_inputs.InputMoisture,
      InputCollectionEfficiency: lan_inputs.InputCollectionEfficiency,
      InputPrimEndUseGas: lan_inputs.InputPrimEndUseGas,
      InputPercentPrime: lan_inputs.InputPercentPrime,
      InputSecEndUseGas: (parseInt(lan_inputs.InputPercentPrime) == 100) ? "" : lan_inputs.InputSecEndUseGas,
      InputPercentSec: (parseInt(lan_inputs.InputPercentPrime) == 100) ? "" : lan_inputs.InputPercentSec,

      InputOpLife: anaerobic_inputs.InputOpLife,
      InputYEARS_ti: anaerobic_inputs.InputYEARS_ti,
      InputOpType: anaerobic_inputs.InputOpType,
      
      InputTONSmo_ti: diverted.InputTONSmo_ti,
      InputTONSmo_tr: diverted.InputTONSmo_tr,
      InputTONSfw_ti: diverted.InputTONSfw_ti,
      InputTONSfw_tr: diverted.InputTONSfw_tr,
      InputTONSyw_ti: diverted.InputTONSyw_ti,
      InputTONSyw_tr: diverted.InputTONSyw_tr,
      // InputRMR_ti:  diverted.InputRMR_ti,
      // InputRMR_tr:  diverted.InputRMR_tr,
      InputRML_ti:  diverted.InputRML_ti,
      InputRML_tr:  diverted.InputRML_tr,
    
      InputPLA: digestate.InputPLA,
      InputMilesFacility:  transport.InputMilesFacility,
      InputMilesLandfill:  transport.InputMilesLandfill,
      InputMilesResidual:  transport.InputMilesResidual,
      InputMilesCompost: transport.InputMilesCompost,
      InputAltFuel: transport.InputAltFuel,
      InputBiodsl: transport.InputAltFuel == "Yes" ? transport.InputBiodsl : 0,
      InputCNG:  transport.InputAltFuel == "Yes" ? transport.InputCNG : 0,
      InputRNG:  transport.InputAltFuel == "Yes" ? transport.InputRNG : 0,
      InputHyd: transport.InputAltFuel == "Yes" ? transport.InputHyd : 0,
      InputEV: transport.InputAltFuel == "Yes" ? transport.InputEV : 0,

    })).then(res => {
      console.log(res);
      setResult(res.data);
      setStep(last_step + 1);
      setLoading(0);
    }).catch(err => {
      console.log(err);
      setLoading(0);
    });
    // setStep(5);
    // setResult({
    //   total: "", pro_rate: "", re_year : "", F117 : "", F118 : "", F124 : ""
    // });
  } 

  const nextStep = () => {
    switch (step) {
      case 0:
        if (!inputs.InputDollars || !inputs.InputTotalDollars) {
          setShowError(true);
          return false;
        }
        break;

      case 1:
        if (lan_inputs.InputState && lan_inputs.InputLFGSystem == "No") {
          break;
        } else if (lan_inputs.InputState && lan_inputs.InputLFGSystem == "Yes" && 
        lan_inputs.InputCollectionEfficiency && lan_inputs.InputMoisture 
        && lan_inputs.InputPrimEndUseGas
        && lan_inputs.InputPercentPrime != ""
        && lan_inputs.InputSecEndUseGas
        && lan_inputs.InputPercentSec
        ) {
          break;
        } else if (lan_inputs.InputState && lan_inputs.InputLFGSystem == "Yes" && 
        lan_inputs.InputCollectionEfficiency && lan_inputs.InputMoisture 
        && lan_inputs.InputPrimEndUseGas
        && lan_inputs.InputPercentPrime == "100") {
          break;
        } else {

          setShowError(true);
          return false;
        }

        break;
      
      case 2:
        if (anaerobic_inputs.InputOpType &&  anaerobic_inputs.InputYEARS_ti) {
          break;
        } else {
          setShowError(true);
          return false;
        }        
        break;

      case 3:
        if (diverted.InputRML_ti && diverted.InputRML_tr   &&
          diverted.InputTONSfw_ti && diverted.InputTONSfw_tr && diverted.InputTONSmo_ti && diverted.InputTONSmo_tr && 
          diverted.InputTONSyw_ti && diverted.InputTONSyw_tr) {
            break;
          } else {
            setShowError(true);
            return false;
          }
        break;

      case 4:
      if (digestate.InputPLA) {
          break;
        } else {
          setShowError(true);
          return false;
        }
      break;
      case 5: 
      (window as any).chk_data1 = false;
      if (transport.InputAltFuel != "Yes") {
        break;
      }
      else if (transport.InputAltFuel == "Yes" && transport.InputBiodsl && transport.InputCNG && transport.InputRNG && transport.InputHyd && transport.InputEV) {
        break;
      } else {
        setShowError(true);
        return false;
      }
      break;
    }

    setShowError(false);
    let nextstep = step + 1;
    if (nextstep > last_step) {
      calculateResult();
      return;     
    } 
    setStep(nextstep);    
  }

  const exportCSV = () => {
    let exportData = [];
    exportData.push(["Inputs - Project Data", ""]);
    exportData.push(["", ""]);
    exportData.push(["", ""]);

    exportData.push(["General Project Information", ""]);
    exportData.push(["Bond issuer", inputs.bond_isser]);
    exportData.push(["CUSIP number", inputs.cusip_member]);
    exportData.push(["ISIN", inputs.isin]);
    exportData.push(["Bond name", inputs.bond_name]);
    exportData.push(["Project name", inputs.project_name]);
    exportData.push(["Contact person", inputs.contact_person]);
    exportData.push(["Contact email", inputs.contact_email]);
    exportData.push(["Contact phone", inputs.contact_phone]);
    exportData.push(["Total bond financing for the diversion of organic waste for composting project ($)", inputs.InputDollars]);
    exportData.push(["Total project cost ($)", inputs.InputTotalDollars]);

    exportData.push(["Landfill Information", ""]);
    exportData.push(["Location of landfill from which material is diverted (state)", lan_inputs.InputState]);
    exportData.push(["Existence of a landfill gas (LFG) capture system at the landfill from which material is diverted", lan_inputs.InputLFGSystem]);

    if (lan_inputs.InputLFGSystem == "Yes") {
      exportData.push(["     If yes, moisture conditions", lan_inputs.InputMoisture]);
      exportData.push(["     If yes, gas collection efficiency (%)", lan_inputs.InputCollectionEfficiency]);
      exportData.push(["     If yes, primary end-use for gas", lan_inputs.InputPrimEndUseGas]);
      exportData.push(["     If yes, percentage of gas sent to primary end-use", lan_inputs.InputPercentPrime]);
      exportData.push(["     If yes, secondary end-use for gas, if applicable", lan_inputs.InputSecEndUseGas]);
      exportData.push(["     If yes, percentage of gas sent to secondary end-use, if applicable", lan_inputs.InputPercentSec]);
    }
    
    exportData.push(["Composting Operation Information", ""]);
    exportData.push(["Project operational life (years)", anaerobic_inputs.InputOpLife]);
    exportData.push(["Duration of initial start-up period prior to full operation (years)", anaerobic_inputs.InputYEARS_ti]);
    exportData.push(["Anaerobic digester operation type", anaerobic_inputs.InputOpType]);
    // exportData.push(["Type of bioenergy or biofuel produced", anaerobic_inputs.InputEnergyFuelType]);
    // exportData.push([returnAnnual(anaerobic_inputs.InputEnergyFuelType),  "During initial start-up period", "During remainder of operational life"]);
    // exportData.push([returnAnnual(anaerobic_inputs.InputEnergyFuelType),  anaerobic_inputs.InputEnergyFuelProduced_ti,anaerobic_inputs.InputEnergyFuelProduced_tr ]);

    exportData.push(["Diverted Material Information", ""]);
    exportData.push(["Quantity of organic material annually diverted from a landfill AND composted:", "During initial start-up period", "During remainder of operational life"]);
    exportData.push(["     a. Mixed organics (short tons/year)",  diverted.InputTONSmo_ti, diverted.InputTONSmo_tr ]);
    exportData.push(["     b. Food waste (short tons/year)",  diverted.InputTONSfw_ti, diverted.InputTONSfw_tr ]);
    exportData.push(["     c. Yard waste (short tons/year)",  diverted.InputTONSyw_ti, diverted.InputTONSyw_tr ]);    
    exportData.push(["Quantity of residual material initially diverted but later landfilled by project (short tons/year)",  diverted.InputRML_ti, diverted.InputRML_tr ]);

    exportData.push(["Finished Compost Information", ""]);
    exportData.push(["Percent of finished compost distributed for land application (%)", digestate.InputPLA]);

    exportData.push(["Transportation Information", ""]);
    exportData.push(["Average distance traveled to transport diverted waste from curb to compost facility (miles)", replace_special_charactor(transport.InputMilesFacility)]);
    exportData.push(["Average distance traveled to transport waste from curb to landfill (miles)", replace_special_charactor(transport.InputMilesLandfill)]);
    exportData.push(["Average distance traveled to transport residual material from compost facility to landfill (miles)", replace_special_charactor(transport.InputMilesResidual)]);

    exportData.push(["Average distance traveled to transport compost from facility to land application (miles)", replace_special_charactor(transport.InputMilesCompost)]);
    exportData.push(["Alternative fuel solid waste collection vehicles", transport.InputAltFuel]);
    exportData.push(["     If yes, percentage of fleet biodiesel", transport.InputBiodsl]);
    exportData.push(["     If yes, percentage of fleet CNG", transport.InputCNG]);
    exportData.push(["     If yes, percentage of fleet RNG", transport.InputRNG]);
    exportData.push(["     If yes, percentage of fleet hydrogen", transport.InputHyd]);
    exportData.push(["     If yes, percentage of fleet electric", transport.InputEV]);
    
    // output
    exportData.push(["", ""]);
    exportData.push(["", ""]);
    exportData.push(["Outputs - Project KPI", ""]);
    exportData.push(["", ""]);
    exportData.push(["", ""]);
    exportData.push(["KEY PERFORMANCE INDICATOR", "TOTAL", "PRO-RATED (if applicable)", "REPRESENTATIVE YEAR", "UNIT" ]);

    const {total, pro_rate, re_year, metric} = result;
    // exportData.push(["GHG Impact from Project Operations", total[0], pro_rate[0], re_year[0], "Metric tons carbon dioxide equivalent (MTCO2e)" ]);
    // exportData.push([" Primary GHG Impact from Project Operations", total[1], pro_rate[1], re_year[1], "MTCO2e" ]);

    const firstlines = [
    "GHG Impact from Project Operations",
    "          Primary GHG Impact from Project Operations",
    "          Potential Secondary GHG Impact from Project Operations",
    "Carbon Return",
    "GHG Cost Effectiveness",
    "Social Cost of Carbon Benefit",
    "Project GHG Impact Compared to Benchmark",
    "Project GHG Impact Compared to Benchmark",
    "Net Organic Material Diverted from Landfills",
    "Net Material Diverted Per Dollar Invested",
    "Compost Produced",
    "Compost Produced Per Dollar Invested"
    ];
  
    const unitlines = [
      "Metric tons carbon dioxide equivalent (MTCO2e) emission reductions",
      "MTCO2e emission reductions",
      "MTCO2e emission reductions",
      "MTCO2e emission reductions/$1,000 bond financing/years of project operation",
      "MTCO2e emission reductions/$1,000 bond financing",
      "$, in thousands",
      "MTCO2e emission reductions compared to benchmark",
      "% relative to benchmark",
      "short tons",
      "short tons/$1,000 bond financing",
      "short tons",
      "short tons/$1,000 bond financing"      
    ];

    for (var i in firstlines) {
      exportData.push([firstlines[i], total[i], pro_rate[i], re_year[i], unitlines[i] ]);
    }

    exportData.push(["", ""]);
    exportData.push(["", ""]);
    
    exportData.push(["ADDITIONAL KEY PROJECT METRICS", ""]);
    exportData.push(["Total Green Bond Financing for the Project", "$" + inputs.InputDollars]);
    exportData.push(["Project Operational Life", anaerobic_inputs.InputOpLife ? anaerobic_inputs.InputOpLife + "Years" : "25 Years"]);

    exportData.push(["", ""]);
    exportData.push(["", ""]);
    
    exportData.push(["ANAEROBIC DIGESTER BENCHMARKS", "", ""]);
    exportData.push(["", "TOTAL", "REPRESENTATIVE YEAR"]);
    exportData.push(["GHG Impact (MTCO2e Emission Reductions)", metric[0],  metric[1]]);
    // exportData.push(["Surplus Bioenergy or Biofuel Production (GJ)", get_change_format(Math.floor(metric[2])), get_change_format(Math.floor(metric[3]))]);


    exportToCsv("Draft-Organic-Waste-Compost-Calculator.csv", exportData);
  }
  
  const Element = (pos) => {
    switch (pos) {
      case 0:
        return (<General bond_isser={inputs.bond_isser} bond_name = {inputs.bond_name}  cusip_member = {inputs.cusip_member} isin = {inputs.isin}  project_name={inputs.project_name} contact_person={inputs.contact_person} 
          contact_email = {inputs.contact_email} contact_phone = {inputs.contact_phone} InputDollars={inputs.InputDollars} InputTotalDollars={inputs.InputTotalDollars} changeInput={changeGeneral} />);
        break;
      case 1:
        return (<Landfill InputState ={lan_inputs.InputState}
        InputLFGSystem = {lan_inputs.InputLFGSystem}
        InputMoisture = {lan_inputs.InputMoisture}
        InputCollectionEfficiency = {lan_inputs.InputCollectionEfficiency}
        InputPrimEndUseGas = {lan_inputs.InputPrimEndUseGas}
        InputPercentPrime = {lan_inputs.InputPercentPrime}
        InputSecEndUseGas = {lan_inputs.InputSecEndUseGas}
        InputPercentSec = {lan_inputs.InputPercentSec}
        changeInput={changeLand}  />);
        break;
      case 2:
        return (<Operation InputOpLife= {anaerobic_inputs.InputOpLife}
        InputYEARS_ti = {anaerobic_inputs.InputYEARS_ti}
        InputOpType = {anaerobic_inputs.InputOpType}        
        changeInput={changeOperation} />);
        break;
      case 3:
        return (<Diverted 
        InputTONSmo_ti = {diverted.InputTONSmo_ti}
        InputTONSmo_tr = {diverted.InputTONSmo_tr}
        InputTONSfw_ti = {diverted.InputTONSfw_ti}
        InputTONSfw_tr = {diverted.InputTONSfw_tr}
        InputTONSyw_ti = {diverted.InputTONSyw_ti}
        InputTONSyw_tr = {diverted.InputTONSyw_tr}
        InputRML_ti = {diverted.InputRML_ti}
        InputRML_tr = {diverted.InputRML_tr}
        changeInput={changeDiverted}
          />);
        break;
      case 4:
        return (
          <Digestate
          InputPLA = {digestate.InputPLA}
          changeInput={changeDigestate}
          />
        )
      case last_step:
        return (<Transport           
          InputMilesFacility  = {transport.InputMilesFacility}
          InputMilesLandfill = {transport.InputMilesLandfill}
          InputMilesResidual = {transport.InputMilesResidual}

          InputMilesCompost = {transport.InputMilesCompost}
          InputAltFuel = {transport.InputAltFuel}
          InputBiodsl = {transport.InputBiodsl}
          InputCNG = {transport.InputCNG}
          InputRNG = {transport.InputRNG}
          InputHyd = {transport.InputHyd}
          InputEV = {transport.InputEV}

          changeInput={changeTransport}
          />);
        break; 
      case last_step + 1:
        return (
          <Result result={result} InputOpLife={anaerobic_inputs.InputOpLife} InputDollars={inputs.InputDollars}/>
        );
          break;
    }
  
    return (<></>);
  };

  return (
  <>
    <Loading loading={loading}></Loading>
    <div className={"ert-calculator-container ert-step" + step}>
    {Element(step)}
    {
      show_error ? (<small style={{color: "#d93025", paddingLeft:"15px"}}>An input must be entered in all required fields before proceeding</small>):(<></>)
    }
    
    <div className="main-footer">
      { step > 0 ? 
      (<button className="btn s-btn" onClick={() => {setShowError(false);setStep(step - 1);}}>Back</button>)
      : null }

      { step < last_step ?
      (<button className="btn s-btn" onClick={nextStep}>Next</button>)
      : null }
      
      { step == last_step ? 
        (<button className="btn s-btn s-btn-result" onClick={nextStep}>Result</button>)
        : null }
      
      { step > last_step ? 
      (<>
      <button className="btn s-btn" onClick={() => {setStep(0);}}>General</button>
      <button className="btn s-btn" onClick={() => {setStep(1);}}>LandFill</button>
      <button className="btn s-btn" onClick={() => {setStep(2);}}>Composting Operation</button>
      <button className="btn s-btn" onClick={() => {setStep(3);}}>Diverted Material</button>
      <button className="btn s-btn" onClick={() => {setStep(4);}}>Compost</button>
      <button className="btn s-btn" onClick={() => {setStep(last_step);}}>Transportation</button>

      <button className="btn s-btn  s-btn-export" onClick={() => {exportCSV();}}>Export</button>
      </>): null
      }
    </div>
    </div>
  </>);

}

export default App;

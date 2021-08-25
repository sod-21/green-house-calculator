import React, {useState} from 'react';
// import { Bar } from 'react-chartjs-2';
import C3Chart from 'react-c3js';
import d3 from "d3";
import NumberFormat from "react-number-format";
import "./../../node_modules/c3/c3.min.css";
import CheckButton  from "./CheckButton";

interface Props {
    result: any,
    InputOpLife: string,
    InputDollars: number
}

const get_img_url = (e) => {
    return (window as any).acr_img_url + e;
}

const get_change_format = (x) =>  {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const get_percent_for_index = (x) => {
  if (x == 5) {
    return "$";
  }

  if (x == 7 || x == 12) {
    return "%";
  }
  return "";
}
const Result:React.FC<Props> = ({result, InputOpLife, InputDollars})  => {
    const {total, pro_rate, re_year, F117, F118, F124, graph, metric} = result;
    
    
    if (typeof total == "undefined") {
      return (
        <>
        No Data
        </>
      );
    }

    const addTD = (count) => (
        <>
            <td>{total[count]}</td>
            <td>{pro_rate[count]}</td>
            <td>{re_year[count]}</td>
        </>
    );
    
    // const data = {
               
	// 		labels: ['Benchmark GHG Emission Reductions', 'Project GHG Emission Reductions'],
	// 		datasets: [
    //             {
    //                 label: 'Total',
    //                 backgroundColor: '#8ac230',
    //                 borderColor: "#8ac230",
    //                 borderWidth: 1,
    //                 data: [graph[0], graph[1]]
    //             },
    //             {
    //                 label: 'Representative Year',
    //                 backgroundColor: '#8ac230',
    //                 borderColor: "#8ac230",
    //                 borderWidth: 1,
    //                 data: [graph[2], graph[3]]
    //             }
    //        ],
           
    // };
    
    // const date_format = (t, id, i, j) => {
    //   const _pecent = chk_data1 ? re_year[6] : total[6];      
    //   return ( i > 0) ?   _pecent  + "% Relative to Benchmark"  : "";
    // }

    const [data1, setData1] = useState({
        "json": {
            "Emission Reductions": [graph[0], graph[1]]
        },
        "labels": {
            format: function(t, id, i, j) {
                //return t > 1e3 || t < -1e3 ? d3.format(".3s")(t) : d3.round(t, 2)
                // console.log((window as any).chk_data1);
                const _pecent = (typeof (window as any).chk_data1 == "undefined" ||  !(window as any).chk_data1) ? graph[4] : graph[5];
                // console.log(_pecent);
                return ( i > 0) ?  get_change_format(_pecent)  + "% Relative to Benchmark"  : "";
            }
            // format: date_format
        },
        "type": "bar"
    });

    

    // const [data2, setData2] = useState({
    //     "json": {
    //         "Biofuel Production": [metric[2], total[9]] // [total[8], re_year[11]]
    //     },
    //     "labels": {
    //         format: function(t, id, i, j) {
    //             //return t > 1e3 || t < -1e3 ? d3.format(".3s")(t) : d3.round(t, 2)
                
    //             const _pecent = (window as any).acr_bigochanged ? re_year[12] : total[12];
    //             return ( i > 0) ? get_change_format(_pecent) + "% Relative to Benchmark" : "";
    //         }
    //     },
    //     "type": "bar"
    // });

    // const [data3, setData3] = useState({
    //     "json": {
    //         "Landfills": [total[13], total[14]] // [total[12], re_year[12]]
    //     },
    //     "labels": {
    //         format: function(t) {
    //             return t > 1e3 || t < -1e3 ? d3.format(".3s")(t) : d3.round(t, 2)
    //         }
    //     },
    //     "type": "bar"
    // });

    // const [data4, setData4] = useState({
    //     "json": {
    //         "compost": [total[16] ] // [total[15], re_year[15]]
    //     },
    //     "labels": {
    //         format: function(t) {
    //             return t > 1e3 || t < -1e3 ? d3.format(".3s")(t) : d3.round(t, 2)
    //         }
    //     },
    //     "type": "bar"
    // });
    // const data = {
    //     "labels": {
    //         format: function(t) {
    //             return t > 1e3 || t < -1e3 ? d3.format(".3s")(t) : d3.round(t, 2)
    //         }
    //     },
    //     "type": "bar"      
    // };
    // const axios2 =  {
    //     "x": {
    //       "type": "category",
    //       "categories": [
    //         "Benchmark Bioenergy or Biofuel Production",
    //         "Project Bioenergy or Biofuel Production"
    //       ],
    //       "tick": {
    //         "rotate": false
    //       }
    //     },
    //     "y": {
    //       "label": {
    //         "text": "",             
    //         position: 'outer-middle'               
    //       },
          
    //       "tick":  {
    //           format: function(t) {
    //             return get_change_format(t); //d3.format(",.2r")(t);
    //               // return t > 1e3 || t < -1e3 ? d3.format(".3s")(t) : d3.round(t, 2)
    //           },
    //           width: 150,
    //       }
    //     }
    //   }

    //   const axios3 =  {
    //     "x": {
    //       "type": "category",
    //       "categories": [
    //         "Net Organic Material Diverted from Landfills",
    //         "Net Material Diverted from Landfills"
    //       ],
    //       "tick": {
    //         "rotate": false
    //       }
    //     },
    //     "y": {
    //       "label": {
    //         "text": "Short tons",
    //         "position": "outer-middle"
    //       },
    //       // "tick":  {
    //       //     format: function(t) {
    //       //         return t > 1e3 || t < -1e3 ? d3.format(".3s")(t) : d3.round(t, 2)
    //       //     }
    //       // }
    //     }
    //   }

    //   const axios4 =  {
    //     "x": {
    //       "type": "category",
    //       "categories": [
    //         "Digestate or Compost Produced",            
    //       ],
    //       "tick": {
    //         "rotate": false
    //       }
    //     },
    //     "y": {
    //       "label": {
    //         "text": "Short tons",
    //         "position": "outer-middle"
    //       },
    //       // "tick":  {
    //       //     format: function(t) {
    //       //         return t > 1e3 || t < -1e3 ? d3.format(".3s")(t) : d3.round(t, 2)
    //       //     }
    //       // }
    //     }
    //   }
    
    const tooltip =  {
      format: {          
          value: function (value, ratio, id) {
              return get_change_format(Math.floor(value))
          }
      }
    }

    const options = {
        "color": {
          "pattern": [
            "#78AB42",
            "#78AB42"
          ]
        },

        "bar": {
          "width": {
            "ratio": 0.75
          },
          // adding : {
          //   left: 50,
          //   top: 50,
          //   bottom: 50,
          //   right: 50,
          // },
        },

        "axis": {
          "x": {
            "type": "category",
            "categories": [
              "Benchmark GHG Emission Reductions",
              "Project GHG Emission Reductions"
            ],
            "tick": {
              "rotate": false
            }
          },
          
          "y": {
            "label": {
              "text": "   ",
              position: 'outer-middle'
            },
            
            "tick":  {
                format: function(t) {
                  return get_change_format(t); //d3.format(",.2r")(t);
                    // return t > 1e3 || t < -1e3 ? d3.format(".3s")(t) : d3.round(t, 2)
                },
                width: 200,
            }
          }
        },
        "grid": {
          "y": {
            "lines": [
              {
                "value": 0
              }
            ]
          }
        }
      };
      
      

      const btnlabels = ["Total", "Representative Year"];

      const GHGChanged = (e) => {
        // setChkData1(!chk_data1);
        
        if (e == 0) {
          (window as any).chk_data1 = false;
            var newdata = Object.assign({}, data1, {
              "json": {
                  "Emission Reductions": [graph[0], graph[1]]
              }
          });
          setData1(
              newdata
          );
            
        } else {
          (window as any).chk_data1 = true;
          setData1(Object.assign({}, data1, {
              "json": {
                  "Emission Reductions": [graph[2], graph[3]]
              }                
          }));
        } 
      }

      
      // const bigoChanged = (e) => {
      //   if (e == 0) {
      //     (window as any).acr_bigochanged = false;
      //       var newdata = Object.assign({}, data2, {
      //         "json": {
      //             "Biofuel Production": [metric[2], total[9]] // [total[8], total[8]]
      //         }
      //       });
      //     setData2(
      //         newdata
      //     );
      //   } else {
      //     (window as any).acr_bigochanged = true;
      //     setData2(Object.assign({}, data2, {
      //         "json": {
      //             "Biofuel Production": [metric[3], re_year[9]] //[re_year[11], re_year[11]]
      //         }
      //     }));
      //   }
      // }
      
      // const landChanged = (e) => {
      //   if (e == 0) {
      //       var newdata = Object.assign({}, data3, {
      //         "json": {
      //             "Landfills": [total[13], total[14]] // [total[12], total[12]]
      //         }});
      //     setData3(
      //         newdata
      //     );
      //   } else {
      //     setData3(Object.assign({}, data3, {
      //         "json": {
      //             "Landfills": [re_year[13], re_year[14]] //[re_year[13], re_year[13]]
      //         }
      //     }));
      //   }
      // }

      
      // const compostChanged = (e) => {
      //   if (e == 0) {
      //       var newdata = Object.assign({}, data4, {
      //         "json": {
      //             "compost": [total[16]] // [total[15], re_year[15]]
      //         }});
      //     setData4(
      //         newdata
      //     );
      //   } else {
      //     setData4(Object.assign({}, data4, {
      //         "json": {
      //             "compost": [re_year[16]]
      //         }
      //     }));
      //   }
      // }

    return (
      <>
        <div className="page-step">            
            <div className="s-section general-section">
                <div className="table-responsive-wrapper">
                <table className="s-table">
                    <tr>
                        <th>KEY PERFORMANCE INDICATOR</th>
                        <th>TOTAL<small className="small-top">1</small></th>
                        <th>PRO-RATED<small className="small-top">2</small><br/><small>(if applicable)</small></th>
                        <th>REPRESENTATIVE YEAR<small className="small-top">3</small></th>
                        <th>UNIT</th>                        
                        <th>SUSTAINABLE DEVELOPMENT GOAL</th>
                    </tr>
                    <tr>
                        <td>GHG Impact from Project Operations</td>
                        {addTD(0)}
                        <td>Metric tons carbon dioxide equivalent (MTCO₂e) emission reductions</td>
                        <td rowSpan={8} className="img2-wrapper">
                            <img className="result-img" src={get_img_url("1.png")}></img></td>
                    </tr>

                    <tr>
                        <td>          Primary GHG Impact from Project Operations</td>
                        {addTD(1)}
                        <td>MTCO₂e emission reductions</td>
                    </tr>

                    <tr>
                        <td>          Potential Secondary GHG Impact from Project Operations</td>
                        {addTD(2)}
                        <td>MTCO₂e emission reductions</td>
                    </tr>

                    <tr>
                        <td>Carbon Return</td>
                        {addTD(3)}
                        <td>MTCO₂e emission reductions/$1,000 bond financing/years of project operation</td>
                    </tr>

                    <tr>
                        <td>GHG Cost Effectiveness</td>
                        {addTD(4)}
                        <td>MTCO₂e emission reductions/$1,000 bond financing</td>
                    </tr>

                    <tr>
                        <td>Social Cost of Carbon Benefit</td>
                        {addTD(5)}
                        <td>$, in thousands</td>
                    </tr>

                    <tr>
                        <td>Project GHG Impact Compared to Benchmark</td>
                        {addTD(6)}
                        <td>MTCO₂e emission reductions compared to benchmark</td>
                    </tr>


                    <tr>
                        <td>Project GHG Impact Compared to Benchmark</td>
                        {addTD(7)}
                        <td>% relative to benchmark</td>
                    </tr>

                    <tr>
                        <td>Net Organic Material Diverted from Landfills</td>
                        {addTD(8)}
                        <td>short tons</td>
                        <td rowSpan={2} className="img2-wrapper">
                          <img  src={get_img_url("3.png")}></img>
                          <img   src={get_img_url("4.png")}></img>
                        </td>
                    </tr>

                    <tr>
                        <td>Net Material Diverted Per Dollar Invested</td>
                        {addTD(9)}
                        <td>short tons/$1,000 bond financing</td>                        
                    </tr>

                    <tr>
                        <td>Compost Produced</td>
                        {addTD(10)}
                        <td>short tons</td>
                        <td rowSpan={2} className="img2-wrapper">
                          <img className="result-img" src={get_img_url("5.png")}></img>
                        </td>
                    </tr>

                    <tr>
                        <td>Compost Produced Per Dollar Invested</td>
                        {addTD(11)}
                        <td>short tons/$1,000 bond financing</td>                        
                    </tr>

                </table>

                <p><small className="small-top">1</small> Total values represent the project impacts over the duration of the project operational life.</p>
                <p><small className="small-top">2</small> Pro-rated values represent the portion of project impacts attributable to the bond financing compared to the total project costs.</p>
                <p><small className="small-top">3</small> Representative year values represent the annual impacts when operating at full capacity.</p>
                </div>
                <table className="s-table">
                    <colgroup>
                      <col style={{width: "75%"}} />
                      <col style={{width: "25%"}} />
                    </colgroup>
                    <tr>
                        <th colSpan={2}>ADDITIONAL KEY PROJECT METRICS</th>                       
                    </tr>

                    <tr>
                        <td>
                        Total Bond Financing for the Project
                        </td>
                        <td>                        
                            <NumberFormat   prefix={'$'} displayType={'text'} value={InputDollars} thousandSeparator={true} ></NumberFormat>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        Project Operational Life
                        </td>
                        <td>
                            {InputOpLife ? InputOpLife + " Years" : "25 Years"} 
                        </td>
                    </tr>
                </table>

                <table className="s-table">
                    <colgroup>
                      <col style={{width: "60%"}} />
                      <col style={{width: "15%"}} />
                      <col style={{width: "25%"}} />
                    </colgroup>

                    <tr>
                        <th colSpan={3}>COMPOST BENCHMARK</th>                       
                    </tr>
                    <tr>
                      <th>

                      </th>
                      <th>
                      TOTAL
                      </th>
                      <th>
                      REPRESENTATIVE YEAR
                      </th>
                    </tr>
                    <tr>
                      <td>
                      GHG Impact (MTCO₂e Emission Reductions)                      
                      </td>                        
                        <td className="text-center">                        
                        {metric[0]}
                        </td>
                        <td className="text-center">                        
                        {metric[1]}
                        </td>
                    </tr>
                    
                </table>

                <div className="chart-board">
                
                     <div className="chart-section">
                        <h4>Project GHG Impact Compared to Benchmark</h4>
                        <div className="btn-toggle-option">
                        <CheckButton check={0} label={btnlabels} onChange={(e) => {GHGChanged(e)}}></CheckButton>
                        </div>
                        <div className="chart-bar-wrapper">
                          <span className="y-label">MTCO₂e</span>
                            <div>
                          <C3Chart color={options.color} bar={options.bar}  axis = {options.axis} grid={options.grid} tooltip = {tooltip} data={data1}></C3Chart>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </>
    );
  

}

export default Result;

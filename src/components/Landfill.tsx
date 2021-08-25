import React from 'react';
import NumberFormat from "react-number-format";

interface Props {
    InputState: string,
    InputLFGSystem: string,
    InputMoisture: string,
    InputCollectionEfficiency: string,
    InputPrimEndUseGas: string,
    InputPercentPrime: string,
    InputSecEndUseGas: string,
    InputPercentSec: string,
    changeInput: Function,
}

const Landfill:React.FC<Props> = ({InputState, InputLFGSystem, InputMoisture, InputCollectionEfficiency, InputPrimEndUseGas, InputPercentPrime, InputSecEndUseGas, InputPercentSec, changeInput})  => {
    const handleChange = (e:React.ChangeEvent<HTMLSelectElement>, key: string) => {
        changeInput({
            [key]: e.target.value
        });
    }

    const changeNumber = (e:any, key:string) => {
        changeInput({
            [key]: e.value
        }); 
    }

    const handleInput = (e:React.ChangeEvent<any>, key: string) => {
        changeInput({
            [key]: e.target.value
        });
    }

    const states = (window as any).acr_options[4];
    const YesNos = (window as any).acr_options[0];
    const InputMoistures = (window as any).acr_options[1];
    const InputCollectionEfficiencys = (window as any).acr_options[2];
    const InputEndUseGases =  (window as any).acr_options[3];
    
    const comRef = React.useRef<HTMLInputElement>(null);
    React.useEffect(() => {
        if (comRef.current) {
            comRef.current.scrollIntoView();
        }
    });

    return (
      <>
        <div className="page-step" ref={comRef}>
            <h2>Landfill Information</h2>
            <div className="s-section general-section">

                <div className="s-group">
                    <label className="s-f-2">
                    Location of landfill from which material is diverted (state)
                    </label>
                    <div className="s-f-2">
                        <select name="InputState" className="s-field is-required" value={InputState} onChange={(e) => {handleChange(e, "InputState");}}>
                            <option value=""></option>
                            {states.map((state) => (
                                <option key={state[0]} value={state[0]}>
                                {state[0]}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="s-group">
                    <label className="s-f-2">                    
                    Existence of a landfill gas (LFG) capture system at the landfill from which material is diverted
                    </label>
                    <div className="s-f-2">
                        
                        <select name="InputLFGSystem" className="s-field is-required" value={InputLFGSystem} onChange={(e) => {handleChange(e, "InputLFGSystem");}}>
                        <option value=""></option>
                            {YesNos.map((moi) => (
                                <option key={moi[0]} value={moi[0]}>
                                {moi[0]}
                                </option>
                            ))}
                        </select>

                    </div>
                </div>
                {
                    InputLFGSystem == "Yes" ? (<>
                        <div className="s-group">
                    <label className="s-f-2">
                    Moisture conditions at location of landfill from which material is diverted
                    </label>
                    <div className="s-f-2">
                    
                        <select name="InputMoisture" className="s-field is-required" value={InputMoisture} onChange={(e) => {handleChange(e, "InputMoisture");}}>
                        <option value=""></option>
                            {InputMoistures.map((im) => (
                                <option key={im[0]} value={im[0]}>
                                {im[0]}
                                </option>
                            ))}
                        </select>

                    </div>
                </div>

                <div className="s-group">
                    <label className="s-f-2">
                    Gas collection efficiency (%)
                    </label>
                    <div className="s-f-2">
                    
                    <select name="InputCollectionEfficiency" className="s-field is-required" value={InputCollectionEfficiency} onChange={(e) => {handleChange(e, "InputCollectionEfficiency");}}>
                    <option value=""></option>
                            {InputCollectionEfficiencys.map((im) => (
                                <option key={im[0]} value={im[0]}>
                                {im[0]}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="s-group">
                    <label className="s-f-2">
                    {/* End-use for gas */}
                    Primary end-use for gas
                    </label>
                    <div className="s-f-2">
                    <select name="InputPrimEndUseGas" className="s-field is-required" value={InputPrimEndUseGas} onChange={(e) => {handleChange(e, "InputPrimEndUseGas");}}>
                    <option value=""></option>
                            {InputEndUseGases.map((im) => (
                                <option key={im[0]} value={im[0]}>
                                {im[0]}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                
                <div className="s-group">
                    <label className="s-f-2">                    
                    Percentage of gas sent to primary end-use
                    </label>
                    <div className="s-f-2">
                    <NumberFormat name="InputPercentPrime" value={InputPercentPrime} className="s-field is-required"  onValueChange={(val) => {changeNumber(val, "InputPercentPrime")}} suffix="%"/>
                        {/* <input type="text" name="InputPercentPrime" className="s-field is-required" value={InputPercentPrime}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>): void => {handleInput(e, "InputPercentPrime");}}
                        /> */}
                    </div>
                </div>
                
                { (InputPercentPrime == "" || parseInt(InputPercentPrime) < 100) && (
                    <>
                    <div className="s-group">
                    <label className="s-f-2">                    
                    Secondary end-use for gas, if applicable
                    </label>
                    <div className="s-f-2">
                    <select name="InputSecEndUseGas" className="s-field is-required" value={InputSecEndUseGas} onChange={(e) => {handleChange(e, "InputSecEndUseGas");}}>
                    <option value=""></option>
                            {InputEndUseGases.map((im) => (
                                <option key={im[0]} value={im[0]}>
                                {im[0]}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                  <div className="s-group">
                  <label className="s-f-2">
                  Percentage of gas sent to secondary end-use, if applicable
                  </label>
                  <div className="s-f-2">
                      <NumberFormat name="InputPercentSec" value={InputPercentSec} className="s-field is-required"  onValueChange={(val) => {changeNumber(val, "InputPercentSec")}} suffix="%"/>
                      {/* <input type="text" name="InputPercentSec" className="s-field is-required" value={InputPercentSec}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>): void => {handleInput(e, "InputPercentSec");}} */}
                  
                  </div>
              </div></>
                )}
                

              

                    </>) : null
                }
                

            </div>
        </div>
      </>
    );
  

}

export default Landfill;

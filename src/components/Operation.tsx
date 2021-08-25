import React from 'react';
import NumberFormat from "react-number-format";
import {returnAnnual} from "./module";

interface Props {
    InputOpLife: string,
    InputYEARS_ti: string,
    InputOpType: string,
    changeInput: Function,
}

const Operation:React.FC<Props> = ({InputOpLife, InputYEARS_ti, InputOpType, changeInput})  => {
    
    const handleChange = (e:React.ChangeEvent<any>, key: string) => {
        changeInput({
            [key]: e.target.value
        });
    }

    const changeNumber = (e:any, key:string) => {
        changeInput({
            [key]: e.value
        }); 
    }

    const optypes = (window as any).acr_options[5];
    // const InputEnergyFuelTypes = (window as any).acr_options[6];
    
    const comRef = React.useRef<HTMLInputElement>(null);
    React.useEffect(() => {
        if (comRef.current) {
            comRef.current.scrollIntoView();
        }
    });

    return (
      <>
        <div className="page-step" ref={comRef}>
            <h2>Composting Operation Information</h2>
            <div className="s-section general-section">

                <div className="s-group">
                    <label className="s-f-2">
                    Project operational life (years)<br/>
                    <em><small>Optional: If left blank a default project operational life of 25 years is applied - this includes both the initial start-up period and the remainder period of full operation.</small></em>
                    </label>
                    <div className="s-f-2">                        
                        <NumberFormat name="InputOpLife" value={InputOpLife} className="s-field "  onValueChange={(val) => {changeNumber(val, "InputOpLife")}}/>
                    
                    </div>
                </div>

                <div className="s-group">
                    <label className="s-f-2">
                    Duration of initial start-up period prior to full operation (years)
                    </label>
                    <div className="s-f-2">                        
                        <NumberFormat name="InputYEARS_ti" value={InputYEARS_ti} className="s-field is-required"  onValueChange={(val) => {changeNumber(val, "InputYEARS_ti")}}/>
                    </div>
                </div>

                <div className="s-group">
                    <label className="s-f-2">
                    Composting operation type
                    </label>
                    <div className="s-f-2">                
                    <select name="InputOpType" className="s-field is-required" value={InputOpType} onChange={(e) => {handleChange(e, "InputOpType");}}>
                        
                        <option value=""></option>
                            {optypes.map((ot) => (
                                <option key={ot[0]} value={ot[0]}>
                                {ot[0]}
                                </option>
                            ))}
                    </select >
                    </div>
                </div>
            </div>
        </div>
      </>
    );
  

}

export default Operation;

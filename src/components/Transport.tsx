import React from 'react';

interface Props {   
    InputMilesFacility: string,
    InputMilesLandfill: string,
    InputMilesResidual: string,
    InputMilesCompost: string,
    InputAltFuel: string,
    InputBiodsl: string,
    InputCNG: string,
    InputRNG: string,
    InputHyd: string,
    InputEV: string,
    changeInput: Function,
}

const Transport:React.FC<Props> = ({InputMilesFacility, InputMilesLandfill, InputMilesResidual, 
    InputMilesCompost,
    InputAltFuel,
    InputBiodsl,
    InputCNG,
    InputRNG,
    InputHyd,
    InputEV,
    changeInput })  => {

    const handleChange = (e:React.ChangeEvent<any>, key: string) => {
        changeInput({
            [key]: e.target.value
        });
    }

    const handleInput = (e:React.ChangeEvent<any>, key: string) => {
        changeInput({
            [key]: e.target.value
        });
    }

    const InputMilesADs = (window as any).acr_options[7];
    const YesNos = (window as any).acr_options[0];
    const comRef = React.useRef<HTMLInputElement>(null);
    React.useEffect(() => {
        if (comRef.current) {
            comRef.current.scrollIntoView();
        }
    });

    return (
      <>
        <div className="page-step" ref={comRef}>
            {/* <h2>Digestate / Finished Compost Information</h2>
            <div className="s-section general-section">

                <div className="s-group">
                    <label className="s-f-2">
                    Percent of digestate or compost distributed for land application during total operational life (%)
                    </label>
                    <div className="s-f-2">
                        <input type="text" name="InputPLA" className="s-field is-required" value={InputPLA} onChange={(e:React.ChangeEvent<HTMLInputElement>): void => {handleChange(e, "InputPLA");}}/>
                    </div>
                </div>
            </div> */}

            <h2>Transportation Information</h2>
            <div className="s-section trans-section">
                <div className="s-group">
                    <label className="s-f-2">
                    Average distance traveled to transport diverted waste from curb to compost facility (miles)<br/>
                    <em><small>Optional: If left blank a default distance of {">"} 200 miles is applied.</small></em>
                    </label>
                    <div className="s-f-2">                        
                        <select name="InputMilesAD" className="s-field" value={InputMilesFacility} onChange={(e:React.ChangeEvent<HTMLSelectElement>) => {handleChange(e, "InputMilesFacility");}}>
                        <option value=""></option>
                            {InputMilesADs.map((im) => (
                                <option key={im[0]} value={im[0]}>
                                {im[0]}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="s-group">
                    <label className="s-f-2">
                    Average distance traveled to transport waste from curb to landfill (miles)<br/>
                    <em><small>Optional: If left blank a default distance of {">"} 200 miles is applied.</small></em>
                    </label>
                    <div className="s-f-2">                    
                    <select name="InputMilesLandfill" className="s-field" value={InputMilesLandfill} onChange={(e:React.ChangeEvent<HTMLSelectElement>) => {handleChange(e, "InputMilesLandfill");}}>
                        <option value=""></option>
                            {InputMilesADs.map((im) => (
                                <option key={im[0]} value={im[0]}>
                                {im[0]}
                                </option>
                            ))}
                        </select>

                    </div>
                </div>

                <div className="s-group">
                    <label className="s-f-2">
                    Average distance traveled to transport residual material from compost facility to landfill (miles)<br/>
                    <em><small>Optional: If left blank a default distance of {">"} 200 miles is applied.</small></em>
                    </label>
                    <div className="s-f-2">
                    
                    <select name="InputMilesResidual" className="s-field" value={InputMilesResidual} onChange={(e:React.ChangeEvent<HTMLSelectElement>) => {handleChange(e, "InputMilesResidual");}}>
                        <option value=""></option>
                            {InputMilesADs.map((im) => (
                                <option key={im[0]} value={im[0]}>
                                {im[0]}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="s-group">
                    <label className="s-f-2">
                    Average distance traveled to transport compost from facility to land application site (miles)<br/>
                    <em><small>Optional: If left blank a default distance of {">"} 200 miles is applied.</small></em>
                    </label>
                    <div className="s-f-2">
                    
                    <select name="InputMilesCompost" className="s-field" value={InputMilesCompost} onChange={(e:React.ChangeEvent<HTMLSelectElement>) => {handleChange(e, "InputMilesCompost");}}>
                        <option value=""></option>
                            {InputMilesADs.map((im) => (
                                <option key={im[0]} value={im[0]}>
                                {im[0]}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                
                <div className="s-group">
                    <label className="s-f-2">
                    Alternative fuel solid waste collection vehicles<br/>
                    <em><small>Optional: If left blank conventional fuel is applied.</small></em>
                    </label>
                    <div className="s-f-2">
                    
                    <select name="InputAltFuel" className="s-field" value={InputAltFuel} onChange={(e:React.ChangeEvent<HTMLSelectElement>) => {handleChange(e, "InputAltFuel");}}>
                        <option value=""></option>
                            {YesNos.map((im) => (
                                <option key={im[0]} value={im[0]}>
                                {im[0]}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                
                {
                    InputAltFuel == "Yes" ? (<>
                <div className="s-group">
                    <label className="s-f-2">
                    Percentage of fleet biodiesel
                    </label>
                    <div className="s-f-2">
                        <input type="text" name="InputBiodsl" className="s-field is-required" value={InputBiodsl}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>): void => {handleInput(e, "InputBiodsl");}}
                        />
                    </div>
                </div>

                <div className="s-group">
                    <label className="s-f-2">
                    Percentage of fleet CNG
                    </label>
                    <div className="s-f-2">
                        <input type="text" name="InputCNG" className="s-field is-required" value={InputCNG}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>): void => {handleInput(e, "InputCNG");}}
                        />
                    </div>
                </div>
                
                <div className="s-group">
                    <label className="s-f-2">
                    Percentage of fleet RNG
                    </label>
                    <div className="s-f-2">
                        <input type="text" name="InputRNG" className="s-field is-required" value={InputRNG}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>): void => {handleInput(e, "InputRNG");}}
                        />
                    </div>
                </div>
                
                <div className="s-group">
                    <label className="s-f-2">
                    Percentage of fleet hydrogen
                    </label>
                    <div className="s-f-2">
                        <input type="text" name="InputHyd" className="s-field is-required" value={InputHyd}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>): void => {handleInput(e, "InputHyd");}}
                        />
                    </div>
                </div>
                
                <div className="s-group">
                    <label className="s-f-2">
                    Percentage of fleet electric
                    </label>
                    <div className="s-f-2">
                        <input type="text" name="InputEV" className="s-field is-required" value={InputEV}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>): void => {handleInput(e, "InputEV");}}
                        />
                    </div>
                </div>

                    </>) : null
                }
            </div>
        </div>
      </>
    );
  

}

export default Transport;

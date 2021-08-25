import React from 'react';
import NumberFormat from "react-number-format";

interface Props {
    InputTONSmo_ti: string,
    InputTONSmo_tr: string,
    InputTONSfw_ti: string,
    InputTONSfw_tr: string,
    InputTONSyw_ti: string,
    InputTONSyw_tr: string,
    InputRML_ti: string,
    InputRML_tr: string,
    changeInput: Function,
}

const Diverted:React.FC<Props> = ({InputTONSmo_ti, InputTONSmo_tr, InputTONSfw_ti, InputTONSfw_tr, InputTONSyw_ti, InputTONSyw_tr, InputRML_ti, InputRML_tr, changeInput})  => {
    
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

    const comRef = React.useRef<HTMLInputElement>(null);
    React.useEffect(() => {
        if (comRef.current) {
            comRef.current.scrollIntoView();
        }
    });

    return (
      <>
        <div className="page-step" ref={comRef}>
            <h2>Diverted Material Information</h2>
            <div className="s-section general-section">

                <div className="s-group">
                    <label className="s-f-2">
                    Quantity of organic material annually diverted from a landfill AND composted:
                    </label>                   
                </div>

                <div className="s-group">
                    <label className="s-f-2">
                    a. Mixed organics (short tons/year)
                    </label>
                    <div className="s-f-3">
                        <em><small>During initial start-up period</small></em><br/>
                        
                        <NumberFormat name="InputTONSmo_ti" value={InputTONSmo_ti} thousandSeparator={true} className="s-field is-required"
                        onValueChange={(val) => {changeNumber(val, "InputTONSmo_ti")}}/>

                    </div>
                    <div className="s-f-3">
                        <em><small>During remainder of operational life</small></em><br/>
                        
                        <NumberFormat name="InputTONSmo_tr" value={InputTONSmo_tr} thousandSeparator={true} className="s-field is-required"
                        onValueChange={(val) => {changeNumber(val, "InputTONSmo_tr")}}/>
                    </div>
                </div>

                <div className="s-group">
                    <label className="s-f-2">
                    b. Food waste (short tons/year)
                    </label>
                    <div className="s-f-3">
                    <em><small>During initial start-up period</small></em><br/>
                        
                        <NumberFormat name="InputTONSfw_ti" value={InputTONSfw_ti} thousandSeparator={true} className="s-field is-required"
                        onValueChange={(val) => {changeNumber(val, "InputTONSfw_ti")}}/>

                    </div>
                    <div className="s-f-3">
                    <em><small>During remainder of operational life</small></em><br/>
                        
                        <NumberFormat name="InputTONSfw_tr" value={InputTONSfw_tr} thousandSeparator={true} className="s-field is-required"
                        onValueChange={(val) => {changeNumber(val, "InputTONSfw_tr")}}/>

                    </div>
                </div>

                <div className="s-group">
                    <label className="s-f-2">
                    c. Yard waste (short tons/year)
                    </label>
                    <div className="s-f-3">
                    <em><small>During initial start-up period</small></em><br/>

                        <NumberFormat name="InputTONSyw_ti" value={InputTONSyw_ti} thousandSeparator={true} className="s-field is-required"
                        onValueChange={(val) => {changeNumber(val, "InputTONSyw_ti")}}/>

                    </div>
                    <div className="s-f-3">
                    <em><small>During remainder of operational life</small></em><br/>

                        <NumberFormat name="InputTONSyw_tr" value={InputTONSyw_tr} thousandSeparator={true} className="s-field is-required"
                        onValueChange={(val) => {changeNumber(val, "InputTONSyw_tr")}}/>

                    </div>
                </div>


                <div className="s-group">
                    <label className="s-f-2">
                    Quantity of residual material initially diverted but later landfilled by project (short tons/year)
                    </label>
                    <div className="s-f-3">
                    <em><small>During initial start-up period</small></em><br/>

                        <NumberFormat name="InputRML_ti" value={InputRML_ti} thousandSeparator={true} className="s-field is-required"
                        onValueChange={(val) => {changeNumber(val, "InputRML_ti")}}/>

                    </div>
                    <div className="s-f-3">
                    <em><small>During remainder of operational life</small></em><br/>

                        <NumberFormat name="InputRML_tr" value={InputRML_tr} thousandSeparator={true} className="s-field is-required"
                        onValueChange={(val) => {changeNumber(val, "InputRML_tr")}}/>


                    </div>
                </div>

            </div>
        </div>
      </>
    );
  

}

export default Diverted;

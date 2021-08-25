import React from 'react';
import NumberFormat from "react-number-format";


interface Props {
  bond_isser: string,
  bond_name: string,
  isin: string,
  cusip_member: string,
  project_name: string,
  contact_person: string,
  contact_email: string,
  contact_phone: string,
  InputDollars: number,
  InputTotalDollars: number,
  changeInput: Function,
}

const General:React.FC<Props> = ({bond_isser, bond_name, cusip_member, isin, project_name, contact_person, contact_email, contact_phone, InputDollars, InputTotalDollars, changeInput})  => {
    
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>, key: string) => {
        let value = e.target.value;
        
        changeInput({
            [key]: value
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
            <h2 >General Project Information</h2>
            <div className="s-section general-section">

                <div className="s-group">
                    <label className="s-f-2">
                    Bond issuer
                    </label>
                    <div className="s-f-2">
                        <input type="text" name="bond_issuer" value={bond_isser} onChange={(e:React.ChangeEvent<HTMLInputElement>): void => {handleChange(e, "bond_isser");}} className="s-field"/>
                    </div>
                </div>

                <div className="s-group">
                    <label className="s-f-2">
                    CUSIP number
                    </label>
                    <div className="s-f-2">
                        <input type="text" name="cusip_member" value={cusip_member} onChange={(e) => {handleChange(e, "cusip_member");}} className="s-field"/>
                    </div>
                </div>

                <div className="s-group">
                    <label className="s-f-2">
                    ISIN
                    </label>
                    <div className="s-f-2">
                        <input type="text" name="cusip_member" value={isin} onChange={(e) => {handleChange(e, "isin");}} className="s-field"/>
                    </div>
                </div>

                <div className="s-group">
                    <label className="s-f-2">
                        Bond name
                    </label>
                    <div className="s-f-2">
                        <input type="text" name="bond_name" value={bond_name} onChange={(e) => {handleChange(e, "bond_name");}} className="s-field"/>
                    </div>
                </div>

                <div className="s-group">
                    <label className="s-f-2">
                        Project name
                    </label>
                    <div className="s-f-2">
                    <input type="text" name="project_name"  value={project_name} onChange={(e) => {handleChange(e, "project_name");}}  className="s-field"/>
                    </div>
                </div>

                <div className="s-group">
                    <label className="s-f-2">
                    Contact person: name, title
                    </label>
                    <div className="s-f-2">
                    <input type="text" name="contact_person" value={contact_person} onChange={(e) => {handleChange(e, "contact_person");}}  className="s-field"/>
                    </div>
                </div>

                <div className="s-group">
                    <label className="s-f-2">
                    Contact email
                    </label>
                    <div className="s-f-2">
                    <input type="text" name="contact_email " value={contact_email} onChange={(e) => {handleChange(e, "contact_email");}}  className="s-field"/>
                    </div>
                </div>

                <div className="s-group">
                    <label className="s-f-2">
                    Contact phone
                    </label>
                    <div className="s-f-2">
                    <input type="text" name="contact_phone" value={contact_phone} onChange={(e) => {handleChange(e, "contact_phone");}}  className="s-field"/>
                    </div>
                </div>

                <div className="s-group">
                    <label className="s-f-2">
                    Total bond financing for the diversion of organic waste for composting project ($)
                    </label>
                    <div className="s-f-2">
                    {/* <input type="text" name="total_green" value={InputDollars} onChange={(e) => {handleChange(e, "InputDollars");}}  className="s-field"/> */}
                    <NumberFormat name="total_green" value={InputDollars} thousandSeparator={true}  prefix={'$'} className="s-field is-required"
                    onValueChange={(val) => {changeNumber(val, "InputDollars")}}/>
                    </div>
                </div>

                <div className="s-group">
                    <label className="s-f-2">
                    Total project cost ($)
                    </label>
                    <div className="s-f-2">                        
                        <NumberFormat name="total_project_cost" value={InputTotalDollars} thousandSeparator={true}  prefix={'$'} className="s-field is-required"
                        onValueChange={(val) => {changeNumber(val, "InputTotalDollars")}}/>
                        
                    </div>
                </div>

            </div>
        </div>
      </>
    );
  

}

export default General;

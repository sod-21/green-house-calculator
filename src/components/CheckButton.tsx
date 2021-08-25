import React, {useState}  from 'react';


interface Props {
    check: number,
    onChange: any,
    label: string[],
}

const CheckButton:React.FC<Props> = ({check, onChange, label})  => {
    const [checked, setChecked] = useState(check);

    const btnClicked = (i) => {
        setChecked(i);
        onChange(i);
    }
    return (
      <>
        <div className="chkgroup">
            {
                label.map((l, index)=>(<button className={ index == checked ? "btn s-btn  s-btn1 active" :  "btn s-btn s-btn1"} onClick={(e) => {btnClicked(index)}}>{l}</button>))
            }            
        </div>
      </>
    );
  

}

export default CheckButton;

import React from 'react';

interface Props {
    InputPLA: string,
    changeInput: Function,
}

const Digestate:React.FC<Props> = ({InputPLA, changeInput })  => {

    const handleChange = (e:React.ChangeEvent<any>, key: string) => {
        changeInput({
            [key]: e.target.value
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
            <h2>Finished Compost Information</h2>
            <div className="s-section general-section">

                <div className="s-group">
                    <label className="s-f-2">
                    Percent of finished compost distributed for land application during total operational life (%)
                    </label>
                    <div className="s-f-2">
                        <input type="text" name="InputPLA" className="s-field is-required" value={InputPLA} onChange={(e:React.ChangeEvent<HTMLInputElement>): void => {handleChange(e, "InputPLA");}}/>
                    </div>
                </div>
            </div>
        </div>
      </>
    );
}

export default Digestate;

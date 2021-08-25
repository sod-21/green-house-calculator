import React from 'react';

interface Props {
    loading: number
}

const Loading:React.FC<Props> = ({loading})  => {

    return (
      <>{loading ? (
        <div id="overlay" style={{display: "block"}}>
			<div className="cv-spinner">
				<span className="spinner"></span>
			</div>
		</div>) : null}
      </>
    );
  

}

export default Loading;

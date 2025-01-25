import React from 'react'


type ShowErrorPopUpProps = {
    errorMessage: string
}

const ShowErrorPopUp: React.FC<ShowErrorPopUpProps> = ({ errorMessage }) => {
    return (
      <div className="absolute inset-0 flex justify-center h-14 top-2">
        <div className="bg-rose-500 text-zinc-50 p-4  shadow-lg rounded-lg">
          <p>{errorMessage}</p>
        </div>
      </div>
    );
  };
  
  export default ShowErrorPopUp;
  

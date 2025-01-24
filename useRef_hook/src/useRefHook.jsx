//This example is just for Accessing DOM
import React,{useRef} from "react";
function InputFocus(){
  //create ref object
  const inputRef = useRef(null);

  const handleFocus = () =>{
    //Focus the input element directly
    inputRef.current.Focus();
  };

  return(
    <div>
      <input ref={inputRef} type="text" placeholder="Focus me with the button"/>
      <button onClick={handleFocus}>
        Focus Input
      </button>
    </div>
  );
}
export default InputFocus;
import React,{createContext,useContext} from "react";

//step1: create a context
const UserContext = createContext();

function App(){
  const user = {
    name : "Ali",
    age : 18
  };

  return(
    //step2 : provide context to user
    <UserContext.Provider value={user}>
      <ChildComponent />
    </UserContext.Provider>
  );
}
function ChildComponent(){
  //step3:consume the context value
  const user = useContext(UserContext);
  return(
    <div>
      <h2>Name:{user.name}</h2>
      <p>Age:{user.age}</p>
    </div>
  )
}
export default App;
import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState(""); // to save input data
  const [recentPrompt, setRecentPrompt] = useState(""); // input data will store here and display
  const [prevPrompts, setPrevPrompts] = useState([]); // to store history and display
  const [showResult, setShowResult] = useState(false); // if it true hide the normal and display the result
  const [loading, setLoading] = useState(false); // if it true it display the loading animation
  const [resultData, setResultData] = useState(""); // to display the result on page

// typing effect for input

const delayPara=(index,nextword) =>{
    setTimeout(function(){
            setResultData(prev=>prev+nextword)
    },75*index)
}


  const onSent = async (prompt) => {
    setResultData("")
    setLoading(true)
    setShowResult(true)
    let response ;
    if(prompt !== undefined){
        response = await runChat(prompt);
        setRecentPrompt(prompt)
    }
    else{
        setPrevPrompts(prev => [...prev,input]);
        setRecentPrompt(input);
        response = await runChat(input);
    }
    
    let responseArray =response.split("**")
    let newResponse="";
    for(let i =0; i< responseArray.length;i++)
    {
        if(i===0 || i%2 !== 1){
            newResponse+= responseArray[i]

        }
        else{
            newResponse+= "<b>"+responseArray[i]+"</b>"
        }
    }
    let newResponse2=newResponse.split("*").join("</br>")
    let newResponseArray =newResponse2.split(" ");
    for(let i=0; i<newResponseArray.length; i++)
    {
        const nextword=newResponseArray[i];
        delayPara(i,nextword+" ")
    }


    setLoading(false)
    setInput("")
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;

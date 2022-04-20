import * as React from "react"
import { astiko,yperastiko,SPD,notSPD, anazitisi, ypologismos } from "../modules/constants";
import {citiesData,valuesData} from "../modules/data";
// markup
const IndexPage = () => {


    const [places,setPlaces] =  React.useState([<option key={1}>ΠΟΛΗ</option>]);
	  const [optionPlaces,setOptionPlaces] = React.useState([<option key={1}>ΚΟΜΟΤΗΝΗ</option>]);
    const [placesValues,setPlacesValues] = React.useState([0]);
    const [place,setPlace] = React.useState("ΚΟΜΟΤΗΝΗ");
    const [value,setValue] = React.useState(placesValues[0]);
    const [CRL,setCRL] = React.useState(-1);
    const [perivallon,setPerivallon] = React.useState(850);
    const [searchValue,setSearchValue] = React.useState('');

    const [showResults,setShowResults] = React.useState(0);
    const [message,setMessage] = React.useState(SPD);

    const optionOnChange = (event:any) => {
      setPlace(event.target.selectedOptions[0].value);
      
      optionPlaces.map((row,i) => {
        if(row.props.value==event.target.selectedOptions[0].value)
        {
          setValue(placesValues[i]);
        }

      })
    }

    React.useEffect(() => {

      const newCities:JSX.Element[] = [];
      places.filter( (row) => 
      {
        if(searchValue == ""){
          newCities.push(row);
        }else if (row.props.value.toLowerCase().startsWith(searchValue.toLowerCase()))
        {
          newCities.push(row);
        }

      } )

      setOptionPlaces(newCities);


    },[searchValue])

    const handleOnCalculate = () => {
      console.info(perivallon);
      console.info(value);
      const apotelesma = (perivallon/value);
      setCRL(apotelesma);

      if(perivallon/value > 1000)
      {
        setMessage(notSPD);
      } else {
        setMessage(SPD);
      }
      setShowResults(1);

    }



    const func = async() => {
    const places: JSX.Element[] = [];
    const placesV :number[] = valuesData;
  
    citiesData.map((row,i)=>(places.push(<option key={`item_${i}`} value={citiesData[i]}>{ citiesData[i] }</option>)))
    setPlacesValues(placesV);
    setValue(placesV[0]);

    setOptionPlaces(places);
    setPlaces(places);


    }


    React.useState( () => {

      func();

    })


    
  return (
    <main>
      <title>Home Page</title>
      
        <div>
         <form>
           <label>{anazitisi}
            <input type="text" value={searchValue} onChange={(e) => {
              setSearchValue(e.target.value);
              console.info(e.target.value);
            }} />
           </label>
         </form>
         <select defaultValue={"ΠΟΛΗ"} onChange={optionOnChange}>
           {optionPlaces}
         </select>

        <select onChange={(event) => {
          console.info(event.target.selectedOptions[0].value);
          if(event.target.selectedOptions[0].value=="1")
          {
            setPerivallon(850);
            return;
          }
          setPerivallon(85);        }}>
          <option value={"1"} key={1}>{astiko}</option>
          <option value={"2"} key={2}>{yperastiko}</option>
        </select>
        
       <div style={{paddingLeft:'300px'}}>
       <button onClick={handleOnCalculate}>{ypologismos}</button>
         

        {showResults ? 

          <h1 style={{wordSpacing:'10px'}}>{`CRL = ${CRL.toFixed(2)}       (${message})`}</h1>  
          :null
        }


      </div>
</div>
          </main>
  )
}

export default IndexPage



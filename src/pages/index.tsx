import * as React from "react"
import * as XLSX from 'xlsx';
import { graphql,useStaticQuery } from 'gatsby'
import { excelColumnName,excelValueName,astiko,yperastiko,SPD,notSPD, anazitisi, ypologismos } from "../modules/constants";
// markup
const IndexPage = () => {
    const queryData = useStaticQuery(query);

    const domain = "https://chalkiadakistsagkalismain.gtsb.io";
    const domainDev = "http://localhost:8000";

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
      console.info(newCities);
      setOptionPlaces(newCities);


    },[searchValue])

    const handleOnCalculate = () => {
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
    const placesV :number[] = [];
    const url = domain+queryData.allFile.nodes[0].publicURL;
    const data2 = await (await fetch(url)).arrayBuffer();
   /* data is an ArrayBuffer */
    const workbook3 = XLSX.read(data2);
    const sheetToJson = XLSX.utils.sheet_to_json(workbook3.Sheets[workbook3.SheetNames[0]]);
    sheetToJson.map((row,i)=>(places.push(<option key={`item_${i}`} value={row[excelColumnName]}>{ row[excelColumnName] }</option>)))
    console.info(sheetToJson);
    sheetToJson.map((row,i)=>(placesV.push(row[excelValueName])))

    placesV.shift();
    setPlacesValues(placesV);
    setValue(placesV[0]);

    places.shift();
    setOptionPlaces(places);
    setPlaces(places);


    }

    const funcDev = async() => {
    const places: JSX.Element[] = [];
    const placesV :number[] = [];
    const url = domainDev+queryData.allFile.nodes[0].publicURL;
    const data2 = await (await fetch(url)).arrayBuffer();
   /* data is an ArrayBuffer */
    const workbook3 = XLSX.read(data2,{type:"array"});
    const sheetToJson = XLSX.utils.sheet_to_json(workbook3.Sheets[workbook3.SheetNames[0]]);
    sheetToJson.map((row,i)=>(places.push(<option key={`item_${i}`} value={row[excelColumnName]}>{ row[excelColumnName] }</option>)))
    console.info(sheetToJson);
    sheetToJson.map((row,i)=>(placesV.push(row[excelValueName])))

    placesV.shift();
    setPlacesValues(placesV);
    setValue(placesV[0]);

    places.shift();
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
          setPerivallon(50);        }}>
          <option value={"1"} key={1}>{astiko}</option>
          <option value={"2"} key={2}>{yperastiko}</option>
        </select>
        
       <div style={{paddingLeft:'300px'}}>
       <button onClick={handleOnCalculate}>{ypologismos}</button>
       <div style={{bottom:'30px'}} >
         

        {showResults ? 

          <h1>{`CRL = ${CRL.toFixed(2)}  ${message}`}</h1>  
          :null
         }


       </div>
      </div>
</div>
          </main>
  )
}

export const query = graphql`
  query {
    allFile {
      nodes {
        dir
        publicURL
      }
    }
  }`

export default IndexPage



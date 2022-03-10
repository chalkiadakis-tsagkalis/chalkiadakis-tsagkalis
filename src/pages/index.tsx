import { Dir } from "fs";
import * as React from "react"
import * as XLSX from 'xlsx';
import { graphql,useStaticQuery } from 'gatsby'

// markup
const IndexPage = () => {
    const data = useStaticQuery(query);

    const domain = window.location.host;
    console.info(domain);
    const func = async() => {
    const url = "http://"+domain+"/"+data.allFile.nodes[0].publicURL;
    const data2 = await (await fetch(url)).arrayBuffer();
   /* data is an ArrayBuffer */
    const workbook3 = XLSX.read(data2);
    console.info(workbook3);
    }
    func();
    
    

  return (
    <main>
      <title>Home Page</title>
      <div>
       <h1>YOLO</h1> 
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



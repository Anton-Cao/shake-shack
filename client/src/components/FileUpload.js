import axios from 'axios'; 
  
import React,{Component} from 'react'; 
import { Button } from 'react-bootstrap';
import {uid} from 'react-uid';
import { Redirect } from 'react-router-dom';
  
class FileUpload extends Component { 
   
    state = { 
  
      // Initially, no file is selected 
      selectedFile: null,
      isCsv: true,
      redirect: false,
      key: null,
    }; 
     
    // On file select (from the pop up) 
    onFileChange = event => { 
     
      // Update the state 
      if (event.target.files[0].type.includes("csv")){
        this.setState({ selectedFile: event.target.files[0],
                        isCsv: true 
                    }); 
      } else {
        this.setState({ selectedFile: null,
                        isCsv: false})
      }
      
     
    }; 
     
    // On file upload (click the upload button) 
    onFileUpload = () => { 
     
      // Create an object of formData 
      const formData = new FormData(); 
     
      // Update the formData object 
      const key = uid(this.state.selectedFile);
      formData.append( 
        key, 
        this.state.selectedFile, 
        this.state.selectedFile.name 
      ); 

      console.log(this.state.selectedFile);
      console.log(key);
     
      // Request made to the backend api 
      // Send formData object 
      axios.post("api/uploadfile", formData); 
      this.setState({redirect: true, key: key});
    }; 
     
    // File content to be displayed after 
    // file upload is complete 
    fileData = () => { 
     
      if (this.state.selectedFile) { 
          
        return ( 
          <div> 
            <h2>File Details:</h2> 
            <p>File Type: {this.state.selectedFile.type}</p> 
          </div> 
        ); 
      } else { 
          return ;
      } 
    }; 

    notCsv = () => {
        if (this.state.isCsv) {
            return;
        } else {
            return (
                <div>
                    Please upload a file that is a csv!
                </div>
            )
        }
    }
    
    redirect = () => {
        if (this.state.redirect) {
            return <Redirect to ={'/'+this.state.key}  />
        }
    }
     
    render() { 
     
      return ( 
        <div className="upload"> 
            {this.redirect()}
            <h3> 
              Upload your data in a .csv here!
            </h3> 
            <div> 
                <input type="file" onChange={this.onFileChange} /> 
                <Button onClick={this.onFileUpload}> 
                  Upload! 
                </Button> 
                {this.notCsv()}
            </div> 
        </div> 
      ); 
    } 
  } 
  
  export default FileUpload; 
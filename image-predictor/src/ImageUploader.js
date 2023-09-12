import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState('');

  const handleDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await axios.post('http://localhost:4200', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    var my_arr = ["airplane", "car", "bird", "cat", "deer", "dog", "frog", "horse", "ship", "truck"]
    var my_arr_cars = ["audi", "BMW", "Chevrolet", "Dodge", "Ford", "Honda", "Hyundai", "Jeep","Nissan", "Toyota"]
    var res = "";
    if(response.data.prediction_type == 1 ){
      res = "\nits a car! \n the type of the car is type " + my_arr_cars[response.data.prediction_car];
    }
    else{
      res = "\nits a  "+my_arr[response.data.prediction_type] +"!";
    }
    setPrediction(res);
  };
  return (
    <div>
      <Dropzone onDrop={handleDrop} >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {file ? (
              <p>File uploaded: {file.name}</p>
            ) : (
              <p>Drag and drop an image file here, or click to select a file.</p>
            )}
          </div>
        )}
      </Dropzone>
      <button onClick={handleSubmit}>Predict</button>
      {prediction && (
        <p>The prediction for this image is: {prediction}</p>
      )}
    </div>

  );
};

export default ImageUploader;
import json
from flask_cors import CORS
from flask import Flask, request, jsonify
from tensorflow import keras
import numpy as np
from PIL import Image

app = Flask(__name__)
CORS(app)
model = keras.models.load_model("model3.tf")
model_car = keras.models.load_model("model_cars3_nissan_toyota.tf")
@app.route('/',methods=['POST'])
def query_example():
  file = request.files["image"]
  image = Image.open(file.stream).convert("RGB")
  image = image.resize((224, 224))
  image_array = np.array(image) / 255.0
  image_array = np.expand_dims(image_array, axis=0)
  prediction = model.predict(image_array)
  class_index = np.argmax(prediction[0])
  print("class is " + str(class_index))
  typeofcar = -1
  if class_index == 1:
    prediction1 = model_car.predict(image_array)
    typeofcar = np.argmax(prediction1[0])
    print("car class is " + str(typeofcar))
  response = {'prediction_type':  str(class_index) , 'prediction_car':  str(typeofcar)}
  return json.dumps(response)

if __name__ == '__main__':
    app.run(debug=True,host='127.0.0.1',port=4200)

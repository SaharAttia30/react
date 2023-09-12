import json
from flask_cors import CORS
from flask import Flask, request, jsonify
from tensorflow import keras
import numpy as np
from PIL import Image
import sys
if __name__=='__main__':
  image_path = sys.argv[1]
  model = keras.models.load_model("model3.tf")
  model_car = keras.models.load_model("model_cars3_nissan_toyota.tf")
  image_path = sys.argv[1]
  img = Image.open(image_path)
  img = img.resize((224, 224))
  img = np.array(img, dtype=np.float32) / 255.0
  img = np.expand_dims(img, axis=0)
  prediction = model.predict(img)
  class_index = np.argmax(prediction[0])
  typeofcar = -1
  if class_index == 1:
    prediction1 = model_car.predict(img)
    typeofcar = np.argmax(prediction1[0])
  response = '**'+str(class_index) + ',' + str(typeofcar)+'**'
  print(response)
  sys.stdout.flush()
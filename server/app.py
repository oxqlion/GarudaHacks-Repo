from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import cv2
import numpy as np
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app)

# Load your LSTM model
model = load_model('action.h5')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    frame_data = data['frame'].split(',')[1]
    frame_bytes = base64.b64decode(frame_data)
    nparr = np.frombuffer(frame_bytes, np.uint8)
    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    # Resize frame to match expected input shape of (30, 1662)
    resized_frame = cv2.resize(frame, (1662, 30))
    
    # Expand dimensions to match model input shape (None, 30, 1662)
    input_data = np.expand_dims(resized_frame, axis=0)
    
    # Get prediction
    prediction = model.predict(input_data)
    
    # Post-process the prediction if necessary
    result = prediction.tolist()  # Convert numpy array to list

    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

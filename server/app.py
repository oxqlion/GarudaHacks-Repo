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
    frame_data = data['frame'].split(',')[1]  # Remove data URL prefix
    frame_bytes = base64.b64decode(frame_data)  # Decode base64 to bytes
    frame_np = np.frombuffer(frame_bytes, dtype=np.uint8)  # Convert bytes to numpy array
    frame = cv2.imdecode(frame_np, cv2.IMREAD_GRAYSCALE)  # Decode image to grayscale

    # Resize frame to match expected input shape of (30, 1662)
    resized_frame = cv2.resize(frame, (1662, 30))

    # Ensure that the resized_frame has the shape (30, 1662)
    if resized_frame.shape != (30, 1662):
        raise ValueError(f"Resized frame has an incorrect shape: {resized_frame.shape}")

    # Reshape to (1, 30, 1662) to match LSTM input shape
    input_data = np.reshape(resized_frame, (1, 30, 1662))

    # Get prediction
    prediction = model.predict(input_data)

    # Post-process the prediction if necessary
    result = prediction.tolist()  # Convert numpy array to list
    print(result)
    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)

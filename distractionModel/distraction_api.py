import os
os.environ["TF_USE_LEGACY_KERAS"] = "1"
from flask import Flask, request, jsonify
import cv2
import numpy as np
from tf_keras.models import load_model
import imutils
from tf_keras.utils import img_to_array
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

face_cascade = cv2.CascadeClassifier('haarcascade_files/haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier('haarcascade_files/haarcascade_eye.xml')
distract_model = load_model('cnn/distraction_model.hdf5', compile=False)


@app.route('/process_image', methods=['POST'])
def process_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image_file = request.files['image']

    image = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_COLOR)

    frame_w = 1200
    image = imutils.resize(image, width=frame_w)

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(240, 240), flags=cv2.CASCADE_SCALE_IMAGE)

    if len(faces) > 0:
        for (x, y, w, h) in faces:
            roi_gray = gray[y:y + h, x:x + w]
            roi_color = image[y:y + h, x:x + w]

            eyes = eye_cascade.detectMultiScale(roi_gray, scaleFactor=1.1, minNeighbors=5, minSize=(60, 60))

            if len(eyes) > 0:
                probs = []

                for (ex, ey, ew, eh) in eyes:

                    roi = roi_color[ey:ey + eh, ex:ex + ew]
                    roi = cv2.resize(roi, (64, 64))
                    roi = roi.astype("float") / 255.0
                    roi = img_to_array(roi)
                    roi = np.expand_dims(roi, axis=0)

                    # Distraction classification
                    prediction = distract_model.predict(roi)
                    probs.append(prediction[0])

                probs_mean = np.mean(probs)

                if np.isnan(probs_mean):
                    probs_mean = 0.1

                if probs_mean <= 0.5:
                    label = 'distracted'
                else:
                    label = 'focused'

                return jsonify({'result': label})

    return jsonify({'result': 'distracted'})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)

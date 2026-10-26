from keras.utils import img_to_array
import imutils
import cv2
from keras.models import load_model
import numpy as np

face_cascade = cv2.CascadeClassifier('haarcascade_files/haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier('haarcascade_files/haarcascade_eye.xml')
distract_model = load_model('cnn/distraction_model.hdf5', compile=False)

frame_w = 1200
border_w = 2
min_size_w = 240
min_size_h = 240
min_size_w_eye = 60
min_size_h_eye = 60
scale_factor = 1.1
min_neighbours = 5


cv2.namedWindow('Watcha Looking At?')
camera = cv2.VideoCapture(0)

if (camera.isOpened() == False):
    print("Unable to read camera feed")

while True:
    ret, frame = camera.read()

    if ret:

        frame = imutils.resize(frame, width=frame_w)

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        faces = face_cascade.detectMultiScale(gray, scaleFactor=scale_factor, minNeighbors=min_neighbours,
                                              minSize=(min_size_w, min_size_h), flags=cv2.CASCADE_SCALE_IMAGE)

        if len(faces) > 0:

            for (x, y, w, h) in faces:
                cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
                roi_gray = gray[y:y + h, x:x + w]
                roi_color = frame[y:y + h, x:x + w]
                eyes = eye_cascade.detectMultiScale(roi_gray, scaleFactor=scale_factor, minNeighbors=min_neighbours,
                                                    minSize=(min_size_w_eye, min_size_w_eye))
                if len(eyes) > 0:
                    probs = list()
                    for (ex, ey, ew, eh) in eyes:
                        cv2.rectangle(roi_color, (ex, ey), (ex + ew, ey + eh), (0, 255, 0), border_w)
                        roi = roi_color[ey + border_w:ey + eh - border_w, ex + border_w:ex + ew - border_w]
                        roi = cv2.resize(roi, (64, 64))
                        roi = roi.astype("float") / 255.0
                        roi = img_to_array(roi)
                        roi = np.expand_dims(roi, axis=0)
                        prediction = distract_model.predict(roi)
                        probs.append(prediction[0])
                        print(probs)

                    probs_mean = np.mean(probs)
                    if probs_mean.__eq__("nan"):
                        probs_mean = 0.1
                    if probs_mean <= 0.5:
                        label = 'distracted'
                    else:
                        label = 'focused'

                    cv2.putText(frame, label, (x, y - 5), cv2.FONT_HERSHEY_SIMPLEX,
                                1, (0, 0, 255), 3, cv2.LINE_AA)
                else:
                    cv2.putText(frame, 'distracted', (536, 230), cv2.FONT_HERSHEY_SIMPLEX,
                                1, (0, 0, 255), 3, cv2.LINE_AA)
        else:
            cv2.putText(frame, 'distracted', (536, 230), cv2.FONT_HERSHEY_SIMPLEX,
                        1, (0, 0, 255), 3, cv2.LINE_AA)

        cv2.imshow('Watcha Looking At?', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    else:
        break

camera.release()
cv2.destroyAllWindows()

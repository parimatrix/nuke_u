import cv2
import numpy as np
import sys
import datetime
facePath = "./haarcascade_frontalface_default.xml"
smilePath = "./haarcascade_smile.xml"
faceCascade = cv2.CascadeClassifier(facePath)
smileCascade = cv2.CascadeClassifier(smilePath)

cap = cv2.VideoCapture(0)
cap.set(3,640)
cap.set(4,480)

sF = 1.05
d=0
e=0
f=1


starttime = datetime.datetime.now()
while True:
    d=0
    endtime=datetime.datetime.now()
    
    datetimeFormat = '%Y-%m-%d %H:%M:%S.%f'
    tdelta=datetime.datetime.strptime(str(endtime),datetimeFormat)-datetime.datetime.strptime(str(starttime),datetimeFormat)
    #print(d)
    if d==0:
        e=e+1
    if tdelta.seconds >= 10:
        if f*1.0/e >= 0.1:
            print("You are a normal person")
            
        else:
            print("You must consult a doctor for the same")
            
        break
    ret, frame = cap.read() 
    img = frame
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    
    faces = faceCascade.detectMultiScale(
        gray,
        scaleFactor= sF,
        minNeighbors=8,
        minSize=(55, 55),
        flags=cv2.CASCADE_SCALE_IMAGE
    )

    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 0, 255), 2)
        roi_gray = gray[y:y+h, x:x+w]
        roi_color = frame[y:y+h, x:x+w]

        smile = smileCascade.detectMultiScale(
            roi_gray,
            scaleFactor= 1.7,
            minNeighbors=22,
            minSize=(25, 25),
            flags=cv2.CASCADE_SCALE_IMAGE
            )
        
        d=d+1
        for (x, y, w, h) in smile:
            if d!=0:
                f=f+1
            print ("Found", len(smile), "smiles! ", d)
            cv2.rectangle(roi_color, (x, y), (x+w, y+h), (255, 0, 0), 1)
            
      
    cv2.imshow('Smile Detector', frame)
    c = cv2.waitKey(7) % 0x100
    if c == 27:
        break

cap.release()
cv2.destroyAllWindows()
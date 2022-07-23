import time
from flask import Flask,request,send_from_directory
from flask_cors import CORS, cross_origin
import speech_recognition as sr

app = Flask(__name__,static_folder='frontend/build',static_url_path='')
# cors = CORS(app)

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

@app.route('/time')
def get_time():
    return {'time': time.time()}

@app.route('/api/hello')
# @cross_origin()
def hello():
    return {'hello': 'world'}

@app.route('/convert-audio', methods=['POST'])
# @cross_origin()
def convert_audio():
    if request.method == 'POST':
        if "file" not in request.files:
            return {'error': 'No file part'}

        file = request.files["file"]
        if file:
            recognizer = sr.Recognizer()
            audioFile = sr.AudioFile(file)
            with audioFile as source:
                audio = recognizer.record(source)
                try:
                    text = recognizer.recognize_google(audio, language='pl-PL')
                    return {'text': text}
                except sr.UnknownValueError:
                    return {'error': 'Could not understand audio'}
                except sr.RequestError as e:
                    return {'error': 'Could not request results from Google Speech Recognition service; {0}'.format(e)}
    else:
        return {'error': 'Incorrect method'}


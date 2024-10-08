from flask import Flask, current_app, jsonify, request
from flask_cors import CORS
from werkzeug.utils import secure_filename
from turnWordToIpa import word2Ipa
from turnWordToDef import word2Def
from aud2ipa import aud2IPA
from word2aud import word2AUD
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

app.config['UPLOAD_FOLDER'] = 'uploads'
try:
    os.makedirs(os.path.join(
        app.instance_path,
        app.config.get('UPLOAD_FOLDER', 'uploads')
    ), exist_ok=True)
except:
    pass

@app.route("/")
def home():
    return "home"

@app.route('/word2ipa/<word>')
def word2ipa(word):
    return word2Ipa(word)

@app.route('/word2def/<word>')
def word2def(word):
    return word2Def(word)

@app.route("/aud2ipa", methods=['POST'])
def aud2ipa():
    audio = request.files['audio_file']
    print(audio.mimetype)
    i = 1
    while True:
        dst = os.path.join(
            current_app.instance_path,
            current_app.config.get('UPLOAD_FOLDER', 'uploads'),
            secure_filename(f'audio_record_{i}.wav'))
        if not os.path.exists(dst): break
        i += 1
    audio.save(dst)
    
    return aud2IPA(dst)

@app.route('/word2aud/<word>')  # Move to JS
def word2aud_route(word):
    try:
        audio_url = word2AUD(word)  
        return jsonify({"audio_url": audio_url})
    except Exception as e:
        return jsonify({"error": str(e)}), 500  

if __name__ == "__main__":
    app.run(port=5000)

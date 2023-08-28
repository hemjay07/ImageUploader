import os
from flask import Flask, request, flash, url_for,send_from_directory
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = "./uploadedImages"


app = Flask(__name__,static_url_path='', static_folder="client.js/dist")
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
print("running")
app.secret_key = 'qwertyuiop'


@app.errorhandler(404)
def not_found(e):
  return app.send_static_file('index.html')



@app.route("/", defaults={'path': ''})
@app.route("/<path:path>")
def serve(path):
  if path != "" and os.path.exists(app.static_folder + '/' + path):
    return send_from_directory(app.static_folder, path)
  else :
    return send_from_directory(app.static_folder,"index.html")

@app.route("/api/upload", methods={"POST"})
def upload_picture():
  if request.method == "POST":
    
    if "imageFile" not in request.files: 
      return ("no file part")
      
    imageFile = request.files["imageFile"]
    if imageFile.filename=='' :
      flash('No selected file')
    filename = secure_filename(imageFile.filename)
    imageFile.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
    url = "/api/uploads/" + filename
  return url


@app.route("/api/uploads/<filename>")
def uploaded_pictures(filename):
  return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

if __name__ == "__main__":
    app.run(debug=True) 
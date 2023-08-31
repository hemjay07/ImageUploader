# ImageUploader
## A Flask React powered web app that allows you upload an image and generates a link to always view the image on.

### Screenshot

![screenshot of the nft card on desktop](/screenshot.png)



### Links

- Live Site URL: (https://imageuploader-flaskandreact.onrender.com/)


### Built with

- Flask
- React

### What I learned

- Learnt how to deploy a Flask-React full-stack application by serving the React static folder usign the Flask app
```python
// set the static folder to the build folder (dist)
app = Flask(__name__,static_url_path='', static_folder="client.js/dist")


// handle the 404 so that the flask api route will be called when the url requested is not any of that of the react routes 
@app.errorhandler(404)
def not_found(e):
  return app.send_static_file('index.html')

// create a routes handler that automatically directs to the react static folder whenever the url start from a home route
@app.route("/", defaults={'path': ''})
@app.route("/<path:path>")
def serve(path):
  if path != "" and os.path.exists(app.static_folder + '/' + path):
    return send_from_directory(app.static_folder, path)
  else :
    return send_from_directory(app.static_folder,"index.html")

```

- Learnt how to set an upload folder in flask 

```python
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

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
```

- Learnt how to implent drag and drop or manual upload of file in React 


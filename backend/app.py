from urllib import request
from flask import Flask, make_response, request
from dp import exec 
app = Flask(__name__)

@app.route('/dp', methods=['POST'])
def dp():
    sigma = float(request.form['sigma'])
    percent = exec(sigma)
    return make_response({'percent': percent}, 200)

if __name__ == '__main__':
    app.run(debug=True)
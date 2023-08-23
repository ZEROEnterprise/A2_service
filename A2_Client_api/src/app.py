from flask import Flask, request as req, json, make_response as mkresp
from os import system, environ
import pyodbc
from flask_cors import CORS
# import jwt

SECRET_TOKEN_KEY = 'API_TEST_A2'

app = Flask('A2_Client_Server')
CORS(app, resources={r"/a2_api/v1/*": {"origins": "localhost:5000"}})
dsn_name = "DBISAM"


@app.route('/a2_api/v1/execute-query', methods=['POST'])
def execute_query():
    try:
        body = req.form
        print(body.get('query'))
        connection = pyodbc.connect(f'DSN={dsn_name}')
        cursor = connection.cursor()
        # ejecuto query con pyodbc
        rows = cursor.execute(body.get('query'))

        print(rows.fetchall())
        cursor.close()
        connection.close()
        return json.loads(rows)
    except Exception as e:
        print(f'An error occurred {e}')
        raise e


@app.route('/a2_api/v1/validate-client', methods=['POST'])
def validate_client():
    try:
        body = req.data
        print(body)

        name = environ['COMPUTERNAME']
        data = {'name': name, 'localIp': '191.168.1.1'}
        # token = jwt.encode(data, SECRET_TOKEN_KEY, algorithm='HS256')
        resp = mkresp({"token": 'sasdgwk3hrkdksbfksjfb'})

        return resp, 200

    except Exception as e:
        print(f'An error occurred {e}')
        raise e


@app.errorhandler(404)
def page_not_found(error):
    return {"messageError": "Page not found"}, 404


@app.errorhandler(Exception)
def server_internal_error(error):
    return {"messageError": 'Server internal error '}, 500


app.run('192.168.1.31', 8000)

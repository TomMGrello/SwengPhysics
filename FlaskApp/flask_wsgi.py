import sys
sys.path.append('/var/www/FlaskApp')
from flask_application import flask_application as application
application.secret_key = 'rowanphysicssweng'

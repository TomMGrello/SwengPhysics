import sys
sys.path.append('/var/www/html/physics/lab')
from flask_application import flask_application as application
application.secret_key = 'rowanphysicssweng'

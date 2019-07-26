from flask import Flask, request
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config.from_object('config')
api = Api(app)
db = SQLAlchemy(app)

from app import models, router
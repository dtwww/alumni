# -*- coding: UTF-8 -*-
from app import db, models
from flask_restful import Resource, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()
parse.add_argument('enrolment_year')
parse.add_argument('department')
parse.add_argument('class_number')

class findActivities(Resource):
  def post(self):
    args = parse.parse_args()
    print(args)

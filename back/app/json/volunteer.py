#-*- coding: UTF-8 -*-
from app import db, models
from flask_restful import Resource, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()
parse.add_argument('username')
parse.add_argument('password')

class volunteer(Resource):
    # 查询志愿者信息
    def get(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的用户名
        username = args.get('username')
        # username为空，查询志愿者列表
        if (username == None):
            l = []
            volunteers = models.volunteer.query.all()
            for item in volunteers:
                l.append({
                    "username": item.username,
                    "password": item.password,
                })
            d = {}
            d["list"] = l
            return d, 200
        # username不为空，根据用户名得到表中某条志愿者信息
        else:
            # 判断志愿者是否存在
            volunteer = models.volunteer.query.get(username)
            if volunteer:
                return {
                           "username": volunteer.username,
                           "password": volunteer.password,
                       }, 200
            else:
                # return {
                #     abort(404, message="{} doesn't exist".format(username))
                # }
                return {
                    "username": "",
                    "password": "",
                }, 200

    # 添加志愿者信息
    def post(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的用户名
        username = args.get('username')
        # 判断志愿者是否已经存在
        if models.volunteer.query.get(username):
            abort(400, message="{} existed".format(username))
        # 创建志愿者
        volunteer = models.volunteer()
        # 将传入参数加入到volunteer中
        volunteer.username = args.username
        volunteer.password = args.password
        # 将volunteer存入数据库
        try:
            db.session.add(volunteer)
            db.session.commit()
            return {"message": "success"}
        except Exception as e:
            db.session.rollback()
            abort(500)

    # 修改志愿者信息
    def put(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的用户名
        username = args.get('username')
        # 根据用户名得到表中某条志愿者信息
        volunteer = models.volunteer.query.get(username)
        # 判断志愿者是否存在
        if volunteer:
            volunteer.password = args.password if args.password else volunteer.password
            # 将修改后的volunteer存入数据库
            db.session.commit()
            return {"message": "success"}
        else:
            return {
                abort(404, message="{} doesn't exist".format(username))
            }
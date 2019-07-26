#-*- coding: UTF-8 -*-
from app import db, models
from flask_restful import Resource, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()
parse.add_argument('nickname')
parse.add_argument('name')
parse.add_argument('sex')
parse.add_argument('enrolmentYear')
parse.add_argument('department')
parse.add_argument('classNumber')
parse.add_argument('contact')

class user(Resource):
    # 查询用户信息
    def get(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的昵称
        nickname = args.get('nickname')
        # nickname为空，查询用户列表
        if (nickname == None):
            l = []
            users = models.user.query.all()
            for item in users:
                l.append({
                    "nickname": item.nickname,
                    "name": item.name,
                    "sex": item.sex,
                    "enrolmentYear": item.enrolmentYear,
                    "department": item.department,
                    "classNumber": item.classNumber,
                    "contact": item.contact,
                })
            d = {}
            d["list"] = l
            return d, 200
        # nickname不为空，根据昵称得到表中某条用户信息
        else:
            # 判断用户是否存在
            user = models.user.query.get(nickname)
            if user:
                return {
                           "nickname": user.nickname,
                           "name": user.name,
                           "sex": user.sex,
                           "enrolmentYear": user.enrolmentYear,
                           "department": user.department,
                           "classNumber": user.classNumber,
                           "contact": user.contact,
                       }, 200
            else:
                # return {
                #     abort(404, message="{} doesn't exist".format(nickname))
                # }
                # 创建用户
                user = models.user()
                # 将传入参数加入到user中
                user.nickname = args.nickname
                user.name = ""
                user.sex = ""
                user.enrolmentYear = ""
                user.department = ""
                user.classNumber = ""
                user.contact = ""
                # 将user存入数据库
                try:
                    db.session.add(user)
                    db.session.commit()
                    return {
                               "nickname": user.nickname,
                               "name": user.name,
                               "sex": user.sex,
                               "enrolmentYear": user.enrolmentYear,
                               "department": user.department,
                               "classNumber": user.classNumber,
                               "contact": user.contact,
                           }, 200
                except Exception as e:
                    db.session.rollback()
                    abort(500)

    # 添加用户信息
    def post(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的昵称
        nickname = args.get('nickname')
        # 判断用户是否已经存在
        if models.user.query.get(nickname):
            abort(400, message="{} existed".format(nickname))
        # 创建用户
        user = models.user()
        # 将传入参数加入到user中
        user.nickname = args.nickname
        user.name = args.name
        user.sex = args.sex
        user.enrolmentYear = args.enrolmentYear
        user.department = args.department
        user.classNumber = args.classNumber
        user.contact = args.contact
        # 将user存入数据库
        try:
            db.session.add(user)
            db.session.commit()
            return {"message": "success"}
        except Exception as e:
            db.session.rollback()
            abort(500)

    # 修改用户信息
    def put(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的昵称
        nickname = args.get('nickname')
        # 根据昵称得到表中某条用户信息
        user = models.user.query.get(nickname)
        # 判断用户是否存在
        print(args)
        if user:
            user.name = args.name if args.name else user.name
            user.sex = args.sex if args.sex else user.sex
            user.enrolmentYear = args.enrolmentYear if args.enrolmentYear else user.enrolmentYear
            user.department = args.department if args.department else user.department
            user.classNumber = args.classNumber if args.classNumber else user.classNumber
            user.contact = args.contact if args.contact else user.contact
            # 将修改后的user存入数据库
            db.session.commit()
            return {
                "message": "success"
            }
        else:
            return {
                abort(404, message="{} doesn't exist".format(nickname))
            }

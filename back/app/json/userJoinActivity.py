# -*- coding: UTF-8 -*-
from app import db, models
from flask_restful import Resource, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()
parse.add_argument('id')
parse.add_argument('nickname')
parse.add_argument('activity_id')

class userJoinActivity(Resource):
    # 查询用户加入活动信息
    def get(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的活动id
        id = args.get('id')
        nickname = args.get('nickname')
        activity_id = args.get('activity_id')
        # id为空且nickname为空，查询整个列表
        if (id == None and nickname ==None and activity_id == None):
            l = []
            userJoinActivities = models.userJoinActivity.query.all()
            for item in userJoinActivities:
                l.append({
                    "id": item.id,
                    "nickname": item.nickname,
                    "activity_id": item.activity_id,
                })
            d = {}
            d["list"] = l
            return d, 200
        # id不为空，根据id查询用户加入活动
        elif (id != None):
            # 判断用户加入活动是否存在
            userJoinActivity = models.userJoinActivity.query.get(id)
            if userJoinActivity:
                return {
                        "id": userJoinActivity.id,
                        "nickname": userJoinActivity.nickname,
                        "activity_id": userJoinActivity.activity_id
                       }, 200
            else:
                return {
                    abort(404, message="{} doesn't exist".format(id))
                }
        # nickname不为空，查询该用户的加入活动列表
        elif (nickname != None):
            l = []
            userJoinActivities = models.userJoinActivity.query.all()
            for item in userJoinActivities:
                if (item.nickname == nickname):
                    l.append({
                        "id": item.id,
                        "nickname": item.nickname,
                        "activity_id": item.activity_id,
                    })
            d = {}
            d["list"] = l
            return d, 200
        # activity_id不为空，查询该活动的所有加入者
        elif (activity_id != None):
            l = []
            userJoinActivities = models.userJoinActivity.query.all()
            for item in userJoinActivities:
                if (item.activity_id == int(activity_id)):
                    l.append({
                        "id": item.id,
                        "nickname": item.nickname,
                        "activity_id": item.activity_id,
                    })
            d = {}
            d["list"] = l
            print(d)
            return d, 200
    # 添加用户加入活动信息
    def post(self):
        # 得到参数列表
        args = parse.parse_args()
        # 找到之前最大的id
        max = models.userJoinActivity.query.order_by(db.desc(models.userJoinActivity.id)).first()
        id = max.id + 1 if max else 1
        # 创建用户加入活动
        userJoinActivity = models.userJoinActivity()
        # 将传入参数加入到userJoinActivity中
        userJoinActivity.id = id
        userJoinActivity.nickname = args.nickname
        userJoinActivity.activity_id = args.activity_id
        # 将userJoinActivity存入数据库
        try:
            db.session.add(userJoinActivity)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(500)

    # 修改用户加入活动信息
    def put(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的id
        id = args.get('id')
        # 根据用户加入活动id得到表中某条用户加入活动信息
        userJoinActivity = models.userJoinActivity.query.get(id)
        # 判断用户加入活动是否存在
        if userJoinActivity:
            userJoinActivity.nickname = args.nickname if args.nickname else userJoinActivity.nickname
            userJoinActivity.activity_id = args.activity_id if args.activity_id else userJoinActivity.activity_id
            #  将修改后的userJoinActivity存入数据库
            db.session.commit()
            return {"message": "success"}
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))
            }

# 删除用户加入活动信息
    def delete(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的用户加入活动id
        id = args.get('id')
        activity_id = args.get('activity_id')
        if (id != None):
            # 根据用户加入活动id得到表中某条用户加入活动信息
            userJoinActivity = models.userJoinActivity.query.filter_by(id = id).first()
            # 判断用户加入活动是否存在
            if userJoinActivity:
                try:
                    db.session.delete(userJoinActivity)
                    db.session.commit()
                except Exception as e:
                    db.session.rollback()
                    abort(500)
            else:
                return {
                    abort(404, message="userJoinActivity doesn't exist")
                }
        elif (activity_id != None):
            userJoinActivities = models.userJoinActivity.query.all()
            if (userJoinActivities != None):
                for item in userJoinActivities:
                    if (item.activity_id == int(activity_id)):
                        try:
                            db.session.delete(item)
                            db.session.commit()
                        except Exception as e:
                            db.session.rollback()
                            abort(500)

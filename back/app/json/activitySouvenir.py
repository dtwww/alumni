# -*- coding: UTF-8 -*-
from app import db, models
from flask_restful import Resource, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()
parse.add_argument('id')
parse.add_argument('activity_id')
parse.add_argument('souvenir_id')
parse.add_argument('amount')

class activitySouvenir(Resource):
    # 查询活动纪念品信息
    def get(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的id
        id = args.get('id')
        activity_id = args.get('activity_id')
        # id和活动id均为空，查询活动纪念品列表
        if (id == "" and activity_id == ""):
            l = []
            activitySouvenirs = models.activitySouvenir.query.all()
            for item in activitySouvenirs:
                l.append({
                    "id": item.id,
                    "activity_id": item.activity_id,
                    "souvenir_id": item.souvenir_id,
                    "amount": item.amount,
                })
            d = {}
            d["list"] = l
            return d, 200
        # id不为空，根据id查询活动纪念品
        elif (id != ""):
            # 判断活动纪念品是否存在
            activitySouvenir = models.activitySouvenir.query.get(id)
            if activitySouvenir:
                return {
                        "id": activitySouvenir.id,
                        "activity_id": activitySouvenir.activity_id,
                        "souvenir_id": activitySouvenir.souvenir_id,
                        "amount": activitySouvenir.amount,
                       }, 200
            else:
                return {
                    abort(404, message="{} doesn't exist".format(id))
                }
        # activityId不为空，根据activityId查询活动纪念品
        elif (activity_id != ""):
            l = []
            activitySouvenirs = models.activitySouvenir.query.all()
            # print(type(activity_id))
            activityId = int (activity_id)
            # print(type(activityId))
            for item in activitySouvenirs:
                # print(type(item.activity_id))
                if (item.activity_id == activityId):
                    l.append({
                        "id": item.id,
                        "activity_id": item.activity_id,
                        "souvenir_id": item.souvenir_id,
                        "amount": item.amount,
                    })
                    # print('aaa')
            d = {}
            d["list"] = l
            return d, 200

    # 添加活动纪念品信息
    def post(self):
        # 得到参数列表
        args = parse.parse_args()
        # 找到之前最大的id
        max = models.activitySouvenir.query.order_by(db.desc(models.activitySouvenir.id)).first()
        id = max.id + 1 if max else 1
        # 创建活动纪念品
        activitySouvenir = models.activitySouvenir()
        # 将传入参数加入到activitySouvenir中
        activitySouvenir.id = id
        activitySouvenir.activity_id = args.activity_id
        activitySouvenir.souvenir_id = args.souvenir_id
        activitySouvenir.amount = args.amount
        # 将activitySouvenir存入数据库
        try:
            db.session.add(activitySouvenir)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(500)

    # 修改活动纪念品信息
    def put(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的id
        id = args.get('id')
        # 根据活动纪念品id得到表中某条活动纪念品信息
        activitySouvenir = models.activitySouvenir.query.get(id)
        # 判断活动纪念品是否存在
        if activitySouvenir:
            # print(args.activity_id)
            # print(args.souvenir_id)
            # print(args.amount)
            # 如果都为空，说明该活动不选纪念品，删除该项
            if ((args.souvenir_id == "" and args.amount == "") or (args.souvenir_id == None and args.amount == None)):
                try:
                    db.session.delete(activitySouvenir)
                    db.session.commit()
                except Exception as e:
                    db.session.rollback()
                    abort(500)
            # 否则，修改该项
            else:
                activitySouvenir.activity_id = args.activity_id if args.activity_id else activitySouvenir.activity_id
                activitySouvenir.souvenir_id = args.souvenir_id if args.souvenir_id else activitySouvenir.souvenir_id
                activitySouvenir.amount = args.amount if args.amount else activitySouvenir.amount
                #  将修改后的activitySouvenir存入数据库
                db.session.commit()
                return {"message": "success"}
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))
            }

# 删除活动纪念品信息
    def delete(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的活动纪念品id
        id = args.get('id')
        activityId = args.get('activity_id')
        # id非空，则按id删除一条记录
        if (id != None):
            # 根据活动纪念品id得到表中某条活动纪念品信息
            activitySouvenir = models.activitySouvenir.query.filter_by(id = id).first()
            # 判断活动纪念品是否存在
            if activitySouvenir:
                try:
                    db.session.delete(activitySouvenir)
                    db.session.commit()
                except Exception as e:
                    db.session.rollback()
                    abort(500)
            else:
                return {
                    abort(404, message="activitySouvenir doesn't exist")
                }
        # activity_id非空，则删除该活动所有记录
        elif (activityId != None):
            activitySouvenirs = models.activitySouvenir.query.all()
            if (activitySouvenirs != None):
                for item in activitySouvenirs:
                    if (item.activity_id == int(activityId)):
                        try:
                            db.session.delete(item)
                            db.session.commit()
                        except Exception as e:
                            db.session.rollback()
                            abort(500)



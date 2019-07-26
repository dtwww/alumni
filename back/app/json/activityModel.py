# -*- coding: UTF-8 -*-
from app import db, models
from flask_restful import Resource, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()
parse.add_argument('id')
parse.add_argument('name')
parse.add_argument('time1')
parse.add_argument('activity1')
parse.add_argument('time2')
parse.add_argument('activity2')
parse.add_argument('time3')
parse.add_argument('activity3')

class activityModel(Resource):
    # 查询活动模板信息
    def get(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的活动id
        id = args.get('id')
        # id为空，查询活动模板列表
        if (id is None):
            l = []
            activityModels = models.activityModel.query.all()
            for item in activityModels:
                l.append({
                    "id": item.id,
                    "name": item.name,
                    "time1": item.time1,
                    "activity1": item.activity1,
                    "time2": item.time2,
                    "activity2": item.activity2,
                    "time3": item.time3,
                    "activity3": item.activity3,
                })
            d = {}
            d["list"] = l
            return d, 200
        # id不为空，根据id查询活动模板
        else:
            # 判断活动模板是否存在
            activityModel = models.activityModel.query.get(id)
            if activityModel:
                return {
                        "id": activityModel.id,
                        "name": activityModel.name,
                        "time1": activityModel.time1,
                        "activity1": activityModel.activity1,
                        "time2": activityModel.time2,
                        "activity2": activityModel.activity2,
                        "time3": activityModel.time3,
                        "activity3": activityModel.activity3,
                       }, 200
            else:
                return {
                    abort(404, message="{} doesn't exist".format(id))
                }

    # 添加活动模板信息
    def post(self):
        # 得到参数列表
        args = parse.parse_args()
        # 找到之前最大的id
        max = models.activityModel.query.order_by(db.desc(models.activityModel.id)).first()
        id = max.id + 1 if max else 1
        # 创建活动模板
        activityModel = models.activityModel()
        # 将传入参数加入到activityModel中
        activityModel.id = id
        activityModel.name = args.name
        activityModel.time1 = args.time1
        activityModel.activity1 = args.activity1
        activityModel.time2 = args.time2
        activityModel.activity2 = args.activity2
        activityModel.time3 = args.time3
        activityModel.activity3 = args.activity3
        # 将activityModel存入数据库
        try:
            db.session.add(activityModel)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(500)

    # 修改活动模板信息
    def put(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的id
        id = args.get('id')
        # 根据活动模板id得到表中某条活动模板信息
        activityModel = models.activityModel.query.get(id)
        # 判断活动模板是否存在
        if activityModel:
            activityModel.name = args.name if args.name else activityModel.name
            activityModel.time1 = args.time1 if args.time1 else activityModel.time1
            activityModel.activity1 = args.activity1 if args.activity1 else activityModel.activity1
            activityModel.time2 = args.time2 if args.time2 else activityModel.time2
            activityModel.activity2 = args.activity2 if args.activity2 else activityModel.activity2
            activityModel.time3 = args.time3 if args.time3 else activityModel.time3
            activityModel.activity3 = args.activity3 if args.activity3 else activityModel.activity3
            #  将修改后的activityModel存入数据库
            db.session.commit()
            return {"message": "success"}
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))
            }

# 删除活动模板信息
    def delete(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的活动模板id
        id = args.get('id')
        # 根据活动模板id得到表中某条活动模板信息
        activityModel = models.activityModel.query.filter_by(id = id).first()
        # 判断活动模板是否存在
        if activityModel:
            try:
                db.session.delete(activityModel)
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                abort(500)
        else:
            return {
                abort(404, message="activityModel doesn't exist")
            }

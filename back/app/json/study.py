# -*- coding: UTF-8 -*-
from app import db, models
from flask_restful import Resource, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()
parse.add_argument('id')
parse.add_argument('name')
parse.add_argument('picture1')
parse.add_argument('picture2')
parse.add_argument('picture3')
parse.add_argument('detail')
parse.add_argument('address')

class study(Resource):
    # 查询自习室信息
    def get(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的活动id
        id = args.get('id')
        # id为空，查询自习室列表
        if (id is None):
            l = []
            studies = models.study.query.all()
            for item in studies:
                l.append({
                    "id": item.id,
                    "name": item.name,
                    "picture1": item.picture1,
                    "picture2": item.picture2,
                    "picture3": item.picture3,
                    "detail": item.detail,
                    "address": item.address,
                })
            d = {}
            d["list"] = l
            return d, 200
        # id不为空，根据id查询自习室
        else:
            # 判断自习室是否存在
            study = models.study.query.get(id)
            if study:
                return {
                        "id": study.id,
                        "name": study.name,
                        "picture1": study.picture1,
                        "picture2": study.picture2,
                        "picture3": study.picture3,
                        "detail": study.detail,
                        "address": study.address
                       }, 200
            else:
                return {
                    abort(404, message="{} doesn't exist".format(id))
                }

    # 添加自习室信息
    def post(self):
        # 得到参数列表
        args = parse.parse_args()
        # 找到之前最大的id
        max = models.study.query.order_by(db.desc(models.study.id)).first()
        id = max.id + 1 if max else 1
        # 创建自习室
        study = models.study()
        # 将传入参数加入到study中
        study.id = id
        study.name = args.name
        study.picture1 = args.picture1
        study.picture2 = args.picture2
        study.picture3 = args.picture3
        study.detail = args.detail
        study.address = args.address
        # 将study存入数据库
        try:
            db.session.add(study)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(500)

    # 修改自习室信息
    def put(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的id
        id = args.get('id')
        # 根据自习室id得到表中某条自习室信息
        study = models.study.query.get(id)
        # 判断自习室是否存在
        if study:
            study.name = args.name if args.name else study.name
            study.picture1 = args.picutre1 if args.picture1 else study.picture1
            study.picture2 = args.picutre2 if args.picture2 else study.picture2
            study.picture3 = args.picutre3 if args.picture3 else study.picture3
            study.detail = args.detail if args.detail else study.detail
            study.address = args.address if args.address else study.address
            #  将修改后的study存入数据库
            db.session.commit()
            return {"message": "success"}
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))
            }

# 删除自习室信息
    def delete(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的自习室id
        id = args.get('id')
        # 根据自习室id得到表中某条自习室信息
        study = models.study.query.filter_by(id = id).first()
        # 判断自习室是否存在
        if study:
            try:
                db.session.delete(study)
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                abort(500)
        else:
            return {
                abort(404, message="study doesn't exist")
            }

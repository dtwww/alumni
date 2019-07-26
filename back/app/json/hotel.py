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

class hotel(Resource):
    # 查询宾馆信息
    def get(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的活动id
        id = args.get('id')
        # id为空，查询宾馆列表
        if (id is None):
            l = []
            hotels = models.hotel.query.all()
            for item in hotels:
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
        # id不为空，根据id查询宾馆
        else:
            # 判断宾馆是否存在
            hotel = models.hotel.query.get(id)
            if hotel:
                return {
                        "id": hotel.id,
                        "name": hotel.name,
                        "picture1": hotel.picture1,
                        "picture2": hotel.picture2,
                        "picture3": hotel.picture3,
                        "detail": hotel.detail,
                        "address": hotel.address
                       }, 200
            else:
                return {
                    abort(404, message="{} doesn't exist".format(id))
                }

    # 添加宾馆信息
    def post(self):
        # 得到参数列表
        args = parse.parse_args()
        # 找到之前最大的id
        max = models.hotel.query.order_by(db.desc(models.hotel.id)).first()
        id = max.id + 1 if max else 1
        # 创建宾馆
        hotel = models.hotel()
        # 将传入参数加入到hotel中
        hotel.id = id
        hotel.name = args.name
        hotel.picture1 = args.picture1
        hotel.picture2 = args.picture2
        hotel.picture3 = args.picture3
        hotel.detail = args.detail
        hotel.address = args.address
        # 将hotel存入数据库
        try:
            db.session.add(hotel)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(500)

    # 修改宾馆信息
    def put(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的id
        id = args.get('id')
        # 根据宾馆id得到表中某条宾馆信息
        hotel = models.hotel.query.get(id)
        # 判断宾馆是否存在
        if hotel:
            hotel.name = args.name if args.name else hotel.name
            hotel.picture1 = args.picutre1 if args.picture1 else hotel.picture1
            hotel.picture2 = args.picutre2 if args.picture2 else hotel.picture2
            hotel.picture3 = args.picutre3 if args.picture3 else hotel.picture3
            hotel.detail = args.detail if args.detail else hotel.detail
            hotel.address = args.address if args.address else hotel.address
            #  将修改后的hotel存入数据库
            db.session.commit()
            return {"message": "success"}
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))
            }

# 删除宾馆信息
    def delete(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的宾馆id
        id = args.get('id')
        # 根据宾馆id得到表中某条宾馆信息
        hotel = models.hotel.query.filter_by(id = id).first()
        # 判断宾馆是否存在
        if hotel:
            try:
                db.session.delete(hotel)
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                abort(500)
        else:
            return {
                abort(404, message="hotel doesn't exist")
            }

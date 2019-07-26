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

class apartment(Resource):
    # 查询公寓信息
    def get(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的活动id
        id = args.get('id')
        # id为空，查询公寓列表
        if (id is None):
            l = []
            apartments = models.apartment.query.all()
            for item in apartments:
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
        # id不为空，根据id查询公寓
        else:
            # 判断公寓是否存在
            apartment = models.apartment.query.get(id)
            if apartment:
                return {
                        "id": apartment.id,
                        "name": apartment.name,
                        "picture1": apartment.picture1,
                        "picture2": apartment.picture2,
                        "picture3": apartment.picture3,
                        "detail": apartment.detail,
                        "address": apartment.address
                       }, 200
            else:
                return {
                    abort(404, message="{} doesn't exist".format(id))
                }

    # 添加公寓信息
    def post(self):
        # 得到参数列表
        args = parse.parse_args()
        # 找到之前最大的id
        max = models.apartment.query.order_by(db.desc(models.apartment.id)).first()
        id = max.id + 1 if max else 1
        # 创建公寓
        apartment = models.apartment()
        # 将传入参数加入到apartment中
        apartment.id = id
        apartment.name = args.name
        apartment.picture1 = args.picture1
        apartment.picture2 = args.picture2
        apartment.picture3 = args.picture3
        apartment.detail = args.detail
        apartment.address = args.address
        # 将apartment存入数据库
        try:
            db.session.add(apartment)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(500)

    # 修改公寓信息
    def put(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的id
        id = args.get('id')
        # 根据公寓id得到表中某条公寓信息
        apartment = models.apartment.query.get(id)
        # 判断公寓是否存在
        if apartment:
            apartment.name = args.name if args.name else apartment.name
            apartment.picture1 = args.picutre1 if args.picture1 else apartment.picture1
            apartment.picture2 = args.picutre2 if args.picture2 else apartment.picture2
            apartment.picture3 = args.picutre3 if args.picture3 else apartment.picture3
            apartment.detail = args.detail if args.detail else apartment.detail
            apartment.address = args.address if args.address else apartment.address
            #  将修改后的apartment存入数据库
            db.session.commit()
            return {"message": "success"}
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))
            }

# 删除公寓信息
    def delete(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的公寓id
        id = args.get('id')
        # 根据公寓id得到表中某条公寓信息
        apartment = models.apartment.query.filter_by(id = id).first()
        # 判断公寓是否存在
        if apartment:
            try:
                db.session.delete(apartment)
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                abort(500)
        else:
            return {
                abort(404, message="apartment doesn't exist")
            }

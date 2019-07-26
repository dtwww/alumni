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
parse.add_argument('contact')

class photo(Resource):
    # 查询摄影信息
    def get(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的活动id
        id = args.get('id')
        # id为空，查询摄影列表
        if (id is None):
            l = []
            photos = models.photo.query.all()
            for item in photos:
                l.append({
                    "id": item.id,
                    "name": item.name,
                    "picture1": item.picture1,
                    "picture2": item.picture2,
                    "picture3": item.picture3,
                    "detail": item.detail,
                    "contact": item.contact,
                })
            d = {}
            d["list"] = l
            return d, 200
        # id不为空，根据id查询摄影
        else:
            # 判断摄影是否存在
            photo = models.photo.query.get(id)
            if photo:
                return {
                        "id": photo.id,
                        "name": photo.name,
                        "picture1": photo.picture1,
                        "picture2": photo.picture2,
                        "picture3": photo.picture3,
                        "detail": photo.detail,
                        "contact": photo.contact
                       }, 200
            else:
                return {
                    abort(404, message="{} doesn't exist".format(id))
                }

    # 添加摄影信息
    def post(self):
        # 得到参数列表
        args = parse.parse_args()
        # 找到之前最大的id
        max = models.photo.query.order_by(db.desc(models.photo.id)).first()
        id = max.id + 1 if max else 1
        # 创建摄影
        photo = models.photo()
        # 将传入参数加入到photo中
        photo.id = id
        photo.name = args.name
        photo.picture1 = args.picture1
        photo.picture2 = args.picture2
        photo.picture3 = args.picture3
        photo.detail = args.detail
        photo.contact = args.contact
        # 将photo存入数据库
        try:
            db.session.add(photo)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(500)

    # 修改摄影信息
    def put(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的id
        id = args.get('id')
        # 根据摄影id得到表中某条摄影信息
        photo = models.photo.query.get(id)
        # 判断摄影是否存在
        if photo:
            photo.name = args.name if args.name else photo.name
            photo.picture1 = args.picutre1 if args.picture1 else photo.picture1
            photo.picture2 = args.picutre2 if args.picture2 else photo.picture2
            photo.picture3 = args.picutre3 if args.picture3 else photo.picture3
            photo.detail = args.detail if args.detail else photo.detail
            photo.contact = args.contact if args.contact else photo.contact
            #  将修改后的photo存入数据库
            db.session.commit()
            return {"message": "success"}
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))
            }

# 删除摄影信息
    def delete(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的摄影id
        id = args.get('id')
        # 根据摄影id得到表中某条摄影信息
        photo = models.photo.query.filter_by(id = id).first()
        # 判断摄影是否存在
        if photo:
            try:
                db.session.delete(photo)
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                abort(500)
        else:
            return {
                abort(404, message="photo doesn't exist")
            }

# -*- coding: UTF-8 -*-
from app import db, models
from flask_restful import Resource, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()
parse.add_argument('id')
parse.add_argument('name')
parse.add_argument('picture')

class souvenir(Resource):
    # 查询纪念品信息
    def get(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的活动id
        id = args.get('id')
        # id为空，查询纪念品列表
        if (id is None):
            l = []
            souvenirs = models.souvenir.query.all()
            for item in souvenirs:
                l.append({
                    "id": item.id,
                    "name": item.name,
                    "picture": item.picture,
                })
            d = {}
            d["list"] = l
            return d, 200
        # id不为空，根据id查询纪念品
        else:
            # 判断纪念品是否存在
            souvenir = models.souvenir.query.get(id)
            if souvenir:
                return {
                        "id": souvenir.id,
                        "name": souvenir.name,
                        "picture": souvenir.picture,
                       }, 200
            else:
                return {
                    abort(404, message="{} doesn't exist".format(id))
                }

    # 添加纪念品信息
    def post(self):
        # 得到参数列表
        args = parse.parse_args()
        # 找到之前最大的id
        max = models.souvenir.query.order_by(db.desc(models.souvenir.id)).first()
        id = max.id + 1 if max else 1
        # 创建纪念品
        souvenir = models.souvenir()
        # 将传入参数加入到souvenir中
        souvenir.id = id
        souvenir.name = args.name
        souvenir.picture = args.picture
        # 将souvenir存入数据库
        try:
            db.session.add(souvenir)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(500)

    # 修改纪念品信息
    def put(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的id
        id = args.get('id')
        # 根据纪念品id得到表中某条纪念品信息
        souvenir = models.souvenir.query.get(id)
        # 判断纪念品是否存在
        if souvenir:
            souvenir.name = args.name if args.name else souvenir.name
            souvenir.picture = args.picutre1 if args.picture else souvenir.picture
            #  将修改后的souvenir存入数据库
            db.session.commit()
            return {"message": "success"}
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))
            }

# 删除纪念品信息
    def delete(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的纪念品id
        id = args.get('id')
        # 根据纪念品id得到表中某条纪念品信息
        souvenir = models.souvenir.query.filter_by(id = id).first()
        # 判断纪念品是否存在
        if souvenir:
            try:
                db.session.delete(souvenir)
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                abort(500)
        else:
            return {
                abort(404, message="souvenir doesn't exist")
            }

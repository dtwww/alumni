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

class market(Resource):
    # 查询超市信息
    def get(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的活动id
        id = args.get('id')
        # id为空，查询超市列表
        if (id is None):
            l = []
            markets = models.market.query.all()
            for item in markets:
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
        # id不为空，根据id查询超市
        else:
            # 判断超市是否存在
            market = models.market.query.get(id)
            if market:
                return {
                        "id": market.id,
                        "name": market.name,
                        "picture1": market.picture1,
                        "picture2": market.picture2,
                        "picture3": market.picture3,
                        "detail": market.detail,
                        "address": market.address
                       }, 200
            else:
                return {
                    abort(404, message="{} doesn't exist".format(id))
                }

    # 添加超市信息
    def post(self):
        # 得到参数列表
        args = parse.parse_args()
        # 找到之前最大的id
        max = models.market.query.order_by(db.desc(models.market.id)).first()
        id = max.id + 1 if max else 1
        # 创建超市
        market = models.market()
        # 将传入参数加入到market中
        market.id = id
        market.name = args.name
        market.picture1 = args.picture1
        market.picture2 = args.picture2
        market.picture3 = args.picture3
        market.detail = args.detail
        market.address = args.address
        # 将market存入数据库
        try:
            db.session.add(market)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(500)

    # 修改超市信息
    def put(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的id
        id = args.get('id')
        # 根据超市id得到表中某条超市信息
        market = models.market.query.get(id)
        # 判断超市是否存在
        if market:
            market.name = args.name if args.name else market.name
            market.picture1 = args.picutre1 if args.picture1 else market.picture1
            market.picture2 = args.picutre2 if args.picture2 else market.picture2
            market.picture3 = args.picutre3 if args.picture3 else market.picture3
            market.detail = args.detail if args.detail else market.detail
            market.address = args.address if args.address else market.address
            #  将修改后的market存入数据库
            db.session.commit()
            return {"message": "success"}
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))
            }

# 删除超市信息
    def delete(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的超市id
        id = args.get('id')
        # 根据超市id得到表中某条超市信息
        market = models.market.query.filter_by(id = id).first()
        # 判断超市是否存在
        if market:
            try:
                db.session.delete(market)
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                abort(500)
        else:
            return {
                abort(404, message="market doesn't exist")
            }

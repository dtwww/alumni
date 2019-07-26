#-*- coding: UTF-8 -*-
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
parse.add_argument('money')
parse.add_argument('school_money')
parse.add_argument('volunteer_money')

class donation(Resource):
    # 查询捐款类活动信息
    def get(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的活动id
        id = args.get('id')
        # 查询捐款类活动列表
        if (id == None):
            l = []
            donations = models.donation.query.all()
            for item in donations:
                l.append({
                    "id": item.id,
                    "name": item.name,
                    "picture1": item.picture1,
                    "picture2": item.picture2,
                    "picture3": item.picture3,
                    "detail": item.detail,
                    "money": item.money,
                    "school_money": item.school_money,
                    "volunteer_money": item.volunteer_money
                })
            d = {}
            d["list"] = l
            return d, 200
        # 根据id查询某捐款活动
        else:
            donation = models.donation.query.get(id)
            if donation:
                return {
                    "id": donation.id,
                    "name": donation.name,
                    "picture1": donation.picture1,
                    "picture2": donation.picture2,
                    "picture3": donation.picture3,
                    "detail": donation.detail,
                    "money": donation.money,
                    "school_money": donation.school_money,
                    "volunteer_money": donation.volunteer_money
                    }, 200
            else:
                return {
                    abort(404, message="{} doesn't exist".format(id))
                }

    # 添加捐款类活动信息
    def post(self):
        # 得到参数列表
        args = parse.parse_args()
        # 找到之前最大的id
        max = models.donation.query.order_by(db.desc(models.donation.id)).first()
        id = max.id + 1 if max else 1
        # 创建捐款类活动
        donation = models.donation()
        # 将传入参数加入到donation中
        donation.id = id
        donation.name = args.name
        donation.picture1 = args.picture1
        donation.picture2 = args.picture2
        donation.picture3 = args.picture3
        donation.detail = args.detail
        donation.money = 0
        donation.school_money = 0
        donation.volunteer_money = 0
        # 将donation存入数据库
        try:
            db.session.add(donation)
            db.session.commit()
            return {"message": "success"}
        except Exception as e:
            db.session.rollback()
            abort(500)

    # 修改捐款类活动信息
    def put(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的活动id
        id = args.get('id')
        # 根据活动id得到表中某条捐款类活动信息
        donation = models.donation.query.get(id)
        # 判断捐款类活动是否存在
        if donation:
            donation.name = args.name if args.name else donation.name
            donation.picture1 = args.picture1 if args.picture1 else donation.picture1
            donation.picture2 = args.picture2 if args.picture2 else donation.picture2
            donation.picture3 = args.picture3 if args.picture3 else donation.picture3
            donation.detail = args.detail if args.detail else donation.detail
            # 将修改后的donation存入数据库
            db.session.commit()
            return {"message": "success"}
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))
            }

    # 删除捐款类活动信息
    def delete(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的活动id
        id = args.get('id')
        # 根据活动id得到表中某条捐款类活动信息
        donation = models.donation.query.get(id)
        # 判断捐款类活动是否存在
        if donation:
            # 删除数据库中该条捐款类活动信息
            try:
                db.session.delete(donation)
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                abort(500)
            # 删除数据库中与该活动有关的用户-捐款类活动信息
            userDonations = models.userDonation.query.filter_by(donation_id = id).all()
            for item in userDonations:
                try:
                    db.session.delete(item)
                    db.session.commit()
                    return {"message": "success"}
                except Exception as e:
                    db.session.rollback()
                    abort(500)
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))
            }
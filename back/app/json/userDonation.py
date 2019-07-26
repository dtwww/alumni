#-*- coding: UTF-8 -*-
from app import db, models
from flask_restful import Resource, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()
parse.add_argument('id')
parse.add_argument('nickname')
parse.add_argument('donation_id')
parse.add_argument('money')

class userDonation(Resource):
    # 查询用户-捐款类活动信息
    def get(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的微信昵称
        nickname = args.get('nickname')
        donation_id = args.get('donation_id')
        # 根据昵称查找
        if (nickname != None):
            # 判断用户是否存在
            if models.user.query.filter_by(nickname = nickname).all():
                l = []
                userDonations = models.userDonation.query.filter_by(nickname = nickname).all()
                for item in userDonations:
                    donation = models.donation.query.filter_by(id = item.donation_id).first()
                    donationDetail = {
                        "id": donation.id,
                        "name": donation.name,
                        "picture1": donation.picture1,
                        "picture2": donation.picture2,
                        "picture3": donation.picture3,
                        "detail": donation.detail,
                        "money": donation.money
                    }
                    l.append({
                        "id": item.id,
                        "nickname": item.nickname,
                        "donation_detail": donationDetail,
                        "money": item.money
                    })
                d = {}
                d["list"] = l
                return d, 200
            else:
                return {
                    abort(404, message="{} doesn't exist".format(nickname))
                }
        # 根据捐款id查找
        elif (donation_id != None):
            l = []
            donationList = models.userDonation.query.filter_by(donation_id=donation_id).all()
            for item in donationList:
                user = models.user.query.filter_by(nickname=item.nickname).first()
                name = user.name
                l.append({
                    "id": item.id,
                    "nickname": item.nickname,
                    "name": name,
                    "money": item.money,
                })
            d = {}
            d["list"] = l
            return d, 200

    # 添加用户-捐款类活动信息
    def post(self):
        # 得到参数列表
        args = parse.parse_args()
        # 找到之前最大的id
        max = models.userDonation.query.order_by(db.desc(models.userDonation.id)).first()
        id = max.id + 1 if max else 1
        # 判断活动是否存在
        donation = models.donation.query.filter_by(id = args.donation_id).first()
        if donation:
            # 创建用户-捐款类活动
            userDonation = models.userDonation()
            # 将传入参数加入到userDonation中
            userDonation.id = id
            userDonation.nickname = args.nickname
            userDonation.donation_id = args.donation_id
            userDonation.money = args.money
            # 将userDonation存入数据库
            try:
                db.session.add(userDonation)
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                abort(500)
            # 修改donation相应活动的已捐款钱数
            donation.money = donation.money + int(args.money)
            donation.school_money = int(donation.money*0.8)
            donation.volunteer_money = donation.money - donation.school_money
            try:
                db.session.add(donation)
                db.session.commit()
                return {"message": "success"}
            except Exception as e:
                db.session.rollback()
                abort(500)
        else:
            return {
                abort(404, message="donation {} doesn't exist".format(args.donation_id))
            }

    # # 修改用户-捐款类活动信息
    # def put(self):
    #     # 得到参数列表
    #     args = parse.parse_args()
    #     # 得到参数列表中的id
    #     id = args.get('id')
    #     # 根据微信昵称及物品id得到表中某条用户-捐款类活动信息
    #     userDonation = models.userDonation.query.get(id)
    #     # 判断用户-捐款类活动是否存在
    #     if userDonation:
    #         userDonation.deleted = args.deleted if args.deleted else userDonation.deleted
    #         #  将修改后的userDonation存入数据库
    #         db.session.commit()
    #         return {"message": "success"}
    #     else:
    #         return {
    #             abort(404, message="{} doesn't exist".format(id))
    #         }

# # 删除用户-捐款类活动信息（用户可参加多次捐款？）
#     def delete(self):
#         # 得到参数列表
#         args = parse.parse_args()
#         # 得到参数列表中的微信昵称和活动id
#         nickname = args.get('nickname')
#         donation_id = args.get('donation_id')
#         # 根据微信昵称和活动id得到表中某条用户-捐款类活动信息
#         userDonation = models.userDonation.query.filter_by(nickname = nickname, donation_id = donation_id).first()
#         # 判断用户-捐款类活动是否存在
#         if userDonation:
#             try:
#                 db.session.delete(userDonation)
#                 db.session.commit()
#             except Exception as e:
#                 db.session.rollback()
#                 abort(500)
#             donation = models.donation.query.filter_by(id=args.donation_id).first()
#             # 修改donation相应活动的已捐款钱数
#             donation.money = donation.money - userDonation.money
#             try:
#                 db.session.add(donation)
#                 db.session.commit()
#                 return {"message": "success"}
#             except Exception as e:
#                 db.session.rollback()
#                 abort(500)
#         else:
#             return {
#                 abort(404, message="userDonation doesn't exist")
#             }


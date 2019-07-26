# -*- coding: UTF-8 -*-
from app import db, models
from flask_restful import Resource, reqparse, abort

# 参数初始化
parse = reqparse.RequestParser()
parse.add_argument('id')
parse.add_argument('name')
parse.add_argument('people')
parse.add_argument('hotel_id')
parse.add_argument('hotel_people')
parse.add_argument('hotel_day')
parse.add_argument('activity_model_id')
parse.add_argument('create_nickname')
parse.add_argument('time1')
parse.add_argument('activity1')
parse.add_argument('time2')
parse.add_argument('activity2')
parse.add_argument('time3')
parse.add_argument('activity3')
parse.add_argument('photo_id')
parse.add_argument('else_need')
parse.add_argument('status')
parse.add_argument('enrolment_year')
parse.add_argument('department')
parse.add_argument('class_number')
parse.add_argument('activity_type')

class activity(Resource):
    # 查询活动信息
    def get(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的活动id
        id = args.get('id')
        create_nickname = args.get('create_nickname')
        # id为空且create_nickname为空，查询活动列表
        if (id is None and create_nickname is None):
            l = []
            activities = models.activity.query.all()
            for item in activities:
                l.append({
                    "id": item.id,
                    "name": item.name,
                    "people": item.people,
                    "hotel_id": item.hotel_id,
                    "hotel_people": item.hotel_people,
                    "hotel_day": item.hotel_day,
                    "activity_model_id": item.activity_model_id,
                    "create_nickname": item.create_nickname,
                    "time1": item.time1,
                    "activity1": item.activity1,
                    "time2": item.time2,
                    "activity2": item.activity2,
                    "time3": item.time3,
                    "activity3": item.activity3,
                    "photo_id": item.photo_id,
                    "else_need": item.else_need,
                    "status": item.status,
                    "enrolment_year": item.enrolment_year,
                    "department": item.department,
                    "class_number": item.class_number,
                    "activity_type": item.activity_type
                })
            d = {}
            d["list"] = l
            return d, 200
        # id不为空，根据id查询活动
        elif (id != None):
            # 判断活动是否存在
            activity = models.activity.query.get(id)
            if activity:
                return {
                        "id": activity.id,
                        "name": activity.name,
                        "people": activity.people,
                        "hotel_id": activity.hotel_id,
                        "hotel_people": activity.hotel_people,
                        "hotel_day": activity.hotel_day,
                        "activity_model_id": activity.activity_model_id,
                        "create_nickname": activity.create_nickname,
                        "time1": activity.time1,
                        "activity1": activity.activity1,
                        "time2": activity.time2,
                        "activity2": activity.activity2,
                        "time3": activity.time3,
                        "activity3": activity.activity3,
                        "photo_id": activity.photo_id,
                        "else_need": activity.else_need,
                        "status": activity.status,
                        "enrolment_year": activity.enrolment_year,
                        "department": activity.department,
                        "class_number": activity.class_number,
                        "activity_type": activity.activity_type
                       }, 200
            else:
                return {
                    abort(404, message="{} doesn't exist".format(id))
                }
        # create_nickname不为空，查询该用户创建的所有活动
        elif (create_nickname != None):
            l = []
            activities = models.activity.query.all()
            for item in activities:
                if (item.create_nickname == create_nickname):
                    l.append({
                        "id": item.id,
                        "name": item.name,
                        "people": item.people,
                        "hotel_id": item.hotel_id,
                        "hotel_people": item.hotel_people,
                        "hotel_day": item.hotel_day,
                        "activity_model_id": item.activity_model_id,
                        "create_nickname": item.create_nickname,
                        "time1": item.time1,
                        "activity1": item.activity1,
                        "time2": item.time2,
                        "activity2": item.activity2,
                        "time3": item.time3,
                        "activity3": item.activity3,
                        "photo_id": item.photo_id,
                        "else_need": item.else_need,
                        "status": item.status,
                        "enrolment_year": item.enrolment_year,
                        "department": item.department,
                        "class_number": item.class_number,
                        "activity_type": item.activity_type
                    })
            d = {}
            d["list"] = l
            return d, 200

    # 添加活动信息
    def post(self):
        # 得到参数列表
        args = parse.parse_args()
        # 找到之前最大的id
        max = models.activity.query.order_by(db.desc(models.activity.id)).first()
        id = max.id + 1 if max else 1
        # 创建活动
        activity = models.activity()
        # 将传入参数加入到activity中
        activity.id = id
        activity.name = args.name
        activity.people = args.people
        activity.hotel_id = args.hotel_id
        activity.hotel_people = args.hotel_people
        activity.hotel_day = args.hotel_day
        activity.activity_model_id = args.activity_model_id
        activity.create_nickname = args.create_nickname
        activity.time1 = args.time1
        activity.activity1 = args.activity1
        activity.time2 = args.time2
        activity.activity2 = args.activity2
        activity.time3 = args.time3
        activity.activity3 = args.activity3
        activity.photo_id = args.photo_id
        activity.else_need = args.else_need
        activity.status = args.status
        activity.enrolment_year = args.enrolment_year
        activity.department = args.department
        activity.class_number = args.class_number
        activity.activity_type = args.activity_type
        # 将activity存入数据库
        try:
            db.session.add(activity)
            db.session.commit()
            return id
        except Exception as e:
            db.session.rollback()
            abort(500)

    # 修改活动信息
    def put(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的id
        id = args.get('id')
        # 根据活动id得到表中某条活动信息
        activity = models.activity.query.get(id)
        # 判断活动是否存在
        if activity:
            activity.name = args.name if args.name else activity.name
            activity.people = args.people if args.people else activity.people
            activity.hotel_id = args.hotel_id if args.hotel_id else activity.hotel_id
            activity.hotel_people = args.hotel_people if args.hotel_people else activity.hotel_people
            activity.hotel_day = args.hotel_day if args.hotel_day else activity.hotel_day
            activity.activity_model_id = args.activity_model_id if args.activity_model_id else activity.activity_model_id
            activity.create_nickname = args.create_nickname if args.create_nickname else activity.create_nickname
            activity.time1 = args.time1 if args.time1 else activity.time1
            activity.activity1 = args.activity1 if args.activity1 else activity.activity1
            activity.time2 = args.time2 if args.time2 else activity.time2
            activity.activity2 = args.activity2 if args.activity2 else activity.activity2
            activity.time3 = args.time3 if args.time3 else activity.time3
            activity.activity3 = args.activity3 if args.activity3 else activity.activity3
            activity.photo_id = args.photo_id if args.photo_id else activity.photo_id
            activity.else_need = args.else_need if args.else_need else activity.else_need
            activity.status = args.status if args.status else activity.status
            activity.enrolment_year = args.enrolment_year if args.enrolment_year else activity.enrolment_year
            activity.department = args.department if args.department else activity.department
            activity.class_number = args.class_number if args.class_number else activity.class_number
            activity.activity_type = args.activity_type if args.activity_type else activity.activity_type
            #  将修改后的activity存入数据库
            db.session.commit()
            return {"message": "success"}
        else:
            return {
                abort(404, message="{} doesn't exist".format(id))
            }

# 删除活动信息
    def delete(self):
        # 得到参数列表
        args = parse.parse_args()
        # 得到参数列表中的活动id
        id = args.get('id')
        # 根据活动id得到表中某条活动信息
        activity = models.activity.query.filter_by(id = id).first()
        # 判断活动是否存在
        if activity:
            try:
                db.session.delete(activity)
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                abort(500)
        else:
            return {
                abort(404, message="activity doesn't exist")
            }

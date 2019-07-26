#-*- coding: UTF-8 -*-
from app import api

# 活动信息接口--GET POST PUT DELETE
from app.json.activity import activity
api.add_resource(activity, '/activity')

# 相关活动接口--POST
from app.json.findActivities import findActivities
api.add_resource(findActivities, '/activity/find')

# 活动模板信息接口--GET POST PUT DELETE
from app.json.activityModel import activityModel
api.add_resource(activityModel, '/activityModel')

# 活动纪念品信息接口--GET POST PUT DELETE
from app.json.activitySouvenir import activitySouvenir
api.add_resource(activitySouvenir, '/activitySouvenir')

# 公寓信息接口--GET POST PUT DELETE
from app.json.apartment import apartment
api.add_resource(apartment, '/apartment')

# 宾馆信息接口--GET POST PUT DELETE
from app.json.hotel import hotel
api.add_resource(hotel, '/hotel')

# 超市信息接口--GET POST PUT DELETE
from app.json.market import market
api.add_resource(market, '/market')

# 摄影信息接口--GET POST PUT DELETE
from app.json.photo import photo
api.add_resource(photo, '/photo')

# 纪念品信息接口--GET POST PUT DELETE
from app.json.souvenir import souvenir
api.add_resource(souvenir, '/souvenir')

# 自习室信息接口--GET POST PUT DELETE
from app.json.study import study
api.add_resource(study, '/study')

# 用户信息接口--GET POST PUT
from app.json.user import user
api.add_resource(user, '/user')

# 用户加入活动信息接口--GET POST PUT DELETE
from app.json.userJoinActivity import userJoinActivity
api.add_resource(userJoinActivity, '/userJoinActivity')

# 志愿者信息接口--GET POST PUT
from app.json.volunteer import volunteer
api.add_resource(volunteer, '/volunteer')

# 捐款活动接口--GET POST PUT
from app.json.donation import donation
api.add_resource(donation, '/donation')

# 志愿者信息接口--GET POST PUT
from app.json.userDonation import userDonation
api.add_resource(userDonation, '/userDonation')

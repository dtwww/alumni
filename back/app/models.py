from app import db


class activity(db.Model):
    __tablename__ = 'activity'
    id = db.Column(primary_key=True)
    name = db.Column()
    people = db.Column()
    hotel_id = db.Column()
    hotel_people = db.Column()
    hotel_day = db.Column()
    activity_model_id = db.Column()
    create_nickname = db.Column()
    time1 = db.Column()
    activity1 = db.Column()
    time2 = db.Column()
    activity2 = db.Column()
    time3 = db.Column()
    activity3 = db.Column()
    photo_id = db.Column()
    else_need = db.Column()
    status = db.Column()
    enrolment_year = db.Column()
    department = db.Column()
    class_number = db.Column()
    activity_type = db.Column()

class activityModel(db.Model):
    __tablename__ = 'activity_model'
    id = db.Column(primary_key=True)
    name = db.Column()
    time1 = db.Column()
    activity1 = db.Column()
    time2 = db.Column()
    activity2 = db.Column()
    time3 = db.Column()
    activity3 = db.Column()

class activitySouvenir(db.Model):
    __tablename__ = 'activity_souvenir'
    id = db.Column(primary_key=True)
    activity_id = db.Column()
    souvenir_id = db.Column()
    amount = db.Column()

class apartment(db.Model):
    __tablename__ = 'apartment'
    id = db.Column(primary_key=True)
    name = db.Column()
    picture1 = db.Column()
    picture2 = db.Column()
    picture3 = db.Column()
    detail = db.Column()
    address = db.Column()

class hotel(db.Model):
    __tablename__ = 'hotel'
    id = db.Column(primary_key=True)
    name = db.Column()
    picture1 = db.Column()
    picture2 = db.Column()
    picture3 = db.Column()
    detail = db.Column()
    address = db.Column()

class market(db.Model):
    __tablename__ = 'market'
    id = db.Column(primary_key=True)
    name = db.Column()
    picture1 = db.Column()
    picture2 = db.Column()
    picture3 = db.Column()
    detail = db.Column()
    address = db.Column()

class photo(db.Model):
    __tablename__ = 'photo'
    id = db.Column(primary_key=True)
    name = db.Column()
    picture1 = db.Column()
    picture2 = db.Column()
    picture3 = db.Column()
    detail = db.Column()
    contact = db.Column()

class souvenir(db.Model):
    __tablename__ = 'souvenir'
    id = db.Column(primary_key=True)
    name = db.Column()
    picture = db.Column()

class study(db.Model):
    __tablename__ = 'study'
    id = db.Column(primary_key=True)
    name = db.Column()
    picture1 = db.Column()
    picture2 = db.Column()
    picture3 = db.Column()
    detail = db.Column()
    address = db.Column()

class user(db.Model):
    __tablename__ = 'user'
    nickname = db.Column(primary_key=True)
    name = db.Column()
    sex = db.Column()
    enrolmentYear = db.Column()
    department = db.Column()
    classNumber = db.Column()
    contact = db.Column()

class userJoinActivity(db.Model):
    __tablename__ = 'user_join_activity'
    id = db.Column(primary_key=True)
    nickname = db.Column()
    activity_id = db.Column()

class volunteer(db.Model):
    __tablename__ = 'volunteer'
    username = db.Column(primary_key=True)
    password = db.Column()

class donation(db.Model):
    __tablename__ = 'donation'
    id = db.Column(primary_key=True)
    name = db.Column()
    picture1 = db.Column()
    picture2 = db.Column()
    picture3 = db.Column()
    detail = db.Column()
    money = db.Column()
    school_money = db.Column()
    volunteer_money = db.Column()

class userDonation(db.Model):
    __tablename__ = 'user_donation'
    id = db.Column(primary_key=True)
    nickname = db.Column()
    donation_id = db.Column()
    money = db.Column()


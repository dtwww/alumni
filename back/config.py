SECRET_KEY = 'hard to guess'
# 如果数据库和服务器在同一台机子上，这里写127.0.0.1就行；若不在，则写数据库所在机子的ip
SQLALCHEMY_DATABASE_URI='mysql+pymysql://root:jjfsx644@127.0.0.1:3306/ruan3'
SQLALCHEMY_TRACK_MODIFICATIONS = True
SQLALCHEMY_COMMIT_ON_TEARDOWN = True
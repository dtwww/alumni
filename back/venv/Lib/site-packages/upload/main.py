# coding=utf-8
import os
import sys
import hashlib
import functools
import qiniu

qn = qiniu.auth.Auth("A6QIIrx3TJ2f9QOUi3ozdUvCsWhoOoJUYLhRJO6z", "0EBm9OhxKiXWYTExqDUhSemN1qZBReci6BauDF6l")


def get_md5(object):
    with open(object, "rb") as fp:
        md5 = hashlib.md5()
        for bufer in iter(functools.partial(fp.read, 4096), b""):
            md5.update(bufer)
        return md5.hexdigest()


def qn_upload(object):
    remote = get_md5(object) + "/" + os.path.split(object)[1]
    token = qn.upload_token("upload", remote)
    ret = qiniu.put_file(token, remote, object)[0]
    # check
    assert ret["hash"] == qiniu.etag(object)
    print("http://cloud.jacksao.wang/%s" % remote)


def help():
    print("用法: upload 文件")


def cli(object=sys.argv):
    if len(object) == 1:
        help()
    elif os.path.isfile(object[1]):
        qn_upload(object[1])
    else:
        help()


if __name__ == "__main__":
    cli()

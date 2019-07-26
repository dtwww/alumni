const endpoint = 'http://127.0.0.1:5000'
const sendRequest = ({
  path,
  method,
  data
}) => new Promise((resolve, reject) => wx.request({
  url: `${endpoint}/${path}`,
  method,
  header: {
    'content-type': method === 'GET' ? 'json' : 'application/json',
  },
  data,
  success: resolve,
  fail: reject
}))
const sendRequest2 = ({
  path,
  method,
  data
}) => new Promise((resolve, reject) => wx.request({
  url: `${endpoint}/${path}`,
  method,
  header: {
    'content-type': 'application/json'
  },
  data,
  success: resolve,
  fail: reject
}))
const getEntity = (type, id) => sendRequest({
  path: `${type}${id ? `?id=${id}` : ''}`,
  method: 'GET'
})

const getUserByNickname = (nickName) => sendRequest({
  path: `user?nickname=${nickName}`,
  method: 'GET'
})

const saveUser = (nickName, data) => sendRequest2({
  path: `user?nickname=${nickName}`,
  method: 'PUT',
  data
})

const createUser = (userId, data) => sendRequest({
  path: `user`,
  method: 'POST',
  data: {
    ...data,
    userId,
  }
})

const createActivity = (data) => sendRequest({
  path: `activity`,
  method: 'POST',
  data
})

const joinActivity = (data) => sendRequest2({
  path: 'userJoinActivity',
  method: 'POST',
  data
})

const getUserActivities = (nickName) => sendRequest({
  path: `userJoinActivity?nickname=${nickName}`,
  method: 'GET',
})

const updateEntity = (type, id, data) => sendRequest2({
  path: `${type}?id=${id}}`,
  method: 'PUT',
  data
})

const findActivities = (data) => sendRequest({
  path: `activity/find`,
  method: 'POST',
  data
})

export {
  getEntity,
  updateEntity,
  getUserByNickname,
  saveUser,
  createUser,
  createActivity,
  joinActivity,
  getUserActivities,
  findActivities
}
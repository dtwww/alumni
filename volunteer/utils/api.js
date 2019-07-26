const endpoint = 'http://127.0.0.1:5000'
const sendRequest = ({ path, method, data }) => new Promise((resolve, reject) => wx.request({
  url: `${endpoint}/${path}`,
  method,
  header: {
    'content-type': 'json'
  },
  data,
  success: resolve,
  fail: reject
}))
const sendRequest2 = ({ path, method, data }) => new Promise((resolve, reject) => wx.request({
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

const getUserByNickname = (nickname) => sendRequest({
  path: `user?nickname=${nickname}`,
  method: 'GET'
})

const saveUser = (nickname, data) => sendRequest2({
  path: `user?nickname=${nickname}`,
  method: 'PUT',
  data
})

const joinActivity = (data) => sendRequest2({
  path: 'userJoinActivity',
  method: 'POST',
  data
})

const getUserActivities = (nickname) => sendRequest({
  path: `userJoinActivity?nickname=${nickname}`,
  method: 'GET',
})

const updateEntity = (type, id, data) => sendRequest2({
  path: `${type}?id=${id}}`,
  method: 'PUT',
  data
})

export {
  getEntity,
  updateEntity,
  getUserByNickname,
  saveUser,
  joinActivity,
  getUserActivities,
}

import axios from 'axios'
import Vue from 'vue'

const SERVER_URL = 'http://localhost:9095';

const instance = axios.create({
  baseURL: SERVER_URL,
  timeout: 1000
});

export default {

  async execute(method, resource, data, config) {
    let accessToken = await Vue.prototype.$auth.getAccessToken()
    return instance({
      method:method,
      url: resource,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      ...config
    })
  },

  // (C)reate
  createNew(text, completed) {
    return this.execute('POST', 'employees', {firstName: text, lastName: text, email: completed})
  },
  // (R)ead
  getAll() {
   return this.execute('GET','employees/', null, {
      transformResponse: [function (data) {
         return JSON.parse(data).employeeList;
      }]
    })
  },
  // (U)pdate
  updateForId(id, text, completed) {
    return this.execute('PUT', 'todos/' + id, { title: text, completed: completed })
  },

  // (D)elete
  removeForId(id) {
    return this.execute('DELETE', 'todos/'+id)
  }
}

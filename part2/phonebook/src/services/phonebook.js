import axios from 'axios'
//const baseUrl = 'http://localhost:3001/api/persons'
const baseUrl = '/api/persons'
const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObj => {
    return axios.post(baseUrl, newObj)
            .then(response=>console.log(response))
}

const remove = (id) => {
    const toDelete = baseUrl + '/' + id 
    //console.log(toDelete)
    axios.delete(toDelete)
}

const update = (id, newObj) => {
    const url = baseUrl + '/' + id 
    return axios.put(url, newObj)
}

export default {
    create: create,
    remove: remove,
    getAll: getAll,
    update: update
}
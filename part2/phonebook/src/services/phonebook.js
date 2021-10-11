import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const create = newObj => {
    axios.post(baseUrl, newObj)
         .then(response=>console.log(response))
}

export default {
    create: create
}
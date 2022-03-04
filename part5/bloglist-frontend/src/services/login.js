import axios from 'axios';
const baseurl = 'api/login'

const login = async (credentials) => {
    const user = await axios.post("http://localhost:3003/" + baseurl, credentials)
    return user.data
}

export default {login}
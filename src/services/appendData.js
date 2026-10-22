import axios from 'axios'
const baseUrl = 'http://localhost:3000/persons'

const append = newObject =>{
    return axios.post(baseUrl, newObject).then(response=>response.data)
}
export default {
    append
}
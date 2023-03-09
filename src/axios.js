// axios
import axios from 'axios'

const domain = ""
axios.defaults.baseURL="http://localhost:3000/";
export default axios.create({
  domain
  // You can add your headers here
})

import axios from "axios";


const fetchUsers = async() =>{
    try {
        const response = await axios.post('http://erp.lacty.com.vn:5000/user/login');
        const data = response.data
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}
export default fetchUsers;

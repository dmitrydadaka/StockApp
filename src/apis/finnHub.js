import axios from 'axios';

const TOKEN = 'ci4tifhr01qp1s6rf14gci4tifhr01qp1s6rf150';

export default axios.create({
    baseURL: 'https://finnhub.io/api/vi',
    params:{
        token: TOKEN
    }
});

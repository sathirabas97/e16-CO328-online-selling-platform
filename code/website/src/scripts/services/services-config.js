// 'use strict'
// import axios from 'axios';

// // Attributes
// let errors;

// // Constructor
// function Service() {

// }

// // Methods
//     // get all services
// Service.prototype.getServices = async () => {
//     let res = [];
//     try {
//         const url =`http://localhost:8081/services`;

//         await axios.get(url)
//         .then(response => {
//             res = response.data;
//         });
//     } catch (err) {
//         console.log(err);
//     }
//     return res;
// }

//     // schedule a time
// Service.prototype.schedule = async (userData, userToken) => {
//     let res = [];
//     try {
//         const url =`http://localhost:8081/schedules`;
//         const data = userData;
//         data.token = userToken;

//         await axios.post(url, data)
//         .then(response => {
//             res = response.data;
//         });
//     } catch (err) {
//         console.log(err);
//     }
//     return res;
// }

//     // get schedulings
// Service.prototype.getSchedulings = async (date) => {
//     let res = {};
//     try {
//         const url = `http://localhost:8081/schedules/date/${date.day}/${date.month}/${date.year}`;

//         await axios.get(url)
//             .then(response => {
//                 if(response.data.message) {
//                     res.data = [];
//                     for(let i = 0; i < 10; i++) {
//                         res.data[i] = {};
//                         res.data[i].customer = {};
//                         res.data[i].customer.name = 'LIVRE';
//                     }
//                 } else {
//                     res.data = response.data;
//                     for(let i = res.data.length; i < 10; i++) {
//                         res.data[i] = {};
//                         res.data[i].customer = {};
//                         res.data[i].customer.name = 'LIVRE';
//                     }
//                 }
//             });
//     } catch(err ) {
//         console.log(err);
//     }
//     return res;
// }

// Service.prototype.clear = () => {
//     errors = [];
// }

// export default Service;

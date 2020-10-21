import axios from 'axios';
import * as routes from '../routes';


const headers = {
    'Content-type': 'multipart/form-data',
    Accept: 'application/json',
    Authorization: 'Basic ' + btoa(routes.OAUTH.CLIENT_ID + ":" + routes.OAUTH.CLIENT_SECRET)
}

export const getStudentListById = (TeacherId) =>{
    return axios.get(`${routes.SERVER_ADDRESS}/students_bookings/search/findByTeacherAvailabilityIdIn?ids=${TeacherId}`
    )
        .then(res =>{
            console.log(res.data);
            return res.data;
        })
        .catch(err =>{
            alert(err.message);
        })
}

export const getStudentList = (page,size,sortName,sortType) =>{

    let startDate = '01/01/1900 00:00:00';
    let endDate = '01/01/2100 00:00:00';

    if(localStorage.getItem('startDateString').length > 0) {
        startDate = localStorage.getItem('startDateString');
    };
    if(localStorage.getItem('endDateString').length > 0) {
        endDate = localStorage.getItem('endDateString');
    };

    //return axios.get(`${routes.SERVER_ADDRESS}/students_bookings?page=${page}&size=${size}&sort=${sortName},${sortType}`)
    return axios.get(`${routes.SERVER_ADDRESS}/search/findByStartDateBetween?startDate=${startDate}&endDate=${endDate}&page=${page}&size=${size}&sort=${sortName},${sortType}`)
        .then(res =>{
            return res.data;
        })
        .catch(err =>{
            alert(err.message);
        })
}

export const getStudentDetail = (studentId) =>{
    return axios.get(`${routes.SERVER_ADDRESS}/students_bookings/${studentId}`)
        .then(res =>{
            return res.data;
        })
        .catch(err =>{
            alert(err.message);
        })
}

export const findStudentListByFirstNameAndLastName = (firstName,lastName,sortName,sortType) =>{
    return axios.get(`${routes.SERVER_ADDRESS}/students_bookings/search/findByStudentProfileFirstNameIgnoreCaseContainingOrStudentProfileLastNameIgnoreCaseContaining?firstName=${firstName}&lastName=${lastName}&sort=${sortName},${sortType}`)
        .then(res =>{
            return res.data;
        })
        .catch(err =>{
            alert(err.message);
        })
}

export const assignStudentlistToTeacher = (teacherId,studentIds) =>{
    console.log(`${routes.SERVER_ADDRESS}/schedule/${teacherId}/${studentIds}`);
    return axios.get(`${routes.SERVER_ADDRESS}/schedule/${teacherId}/${studentIds}`)
        .then(res =>{
            return res.data;
        })
        .catch(err =>{
            alert(err.message);
        })
}
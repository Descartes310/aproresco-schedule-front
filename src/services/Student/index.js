import axios from 'axios';
import * as routes from '../routes';


const headers = {
    'Content-type': 'multipart/form-data',
    Accept: 'application/json',
    Authorization: 'Basic ' + btoa(routes.OAUTH.CLIENT_ID + ":" + routes.OAUTH.CLIENT_SECRET)
}

export const getStudentListById = (TeacherId, type = 'availabilityId') => {
    // return axios.get(`${routes.SERVER_ADDRESS}/teacher-availability/${TeacherId}/student-bookings`)
    return axios.get(`${routes.SERVER_ADDRESS}/search/student-bookings?${type}=${TeacherId}`)
        .then(res => {
            console.log(res.data);
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getStudentList = (page, size, sortName, sortType) => {

    return axios.get(`${routes.SERVER_ADDRESS}/search/student-bookings?page=${page}&size=${size}&sort=${sortName},${sortType}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getStudentListByDate = (start, end, page, size, sortName, sortType) => {
    return axios.get(`${routes.SERVER_ADDRESS}/search/student-bookings?startDate=${start}&endDate=${end}&page=${page}&size=${size}&sort=${sortName},${sortType}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getParentProfile = (start, end, page, size, sortName, sortType) => {
    return axios.get(`${routes.SERVER_ADDRESS}/search/student-parents?page=${page}&size=${size}&sort=${sortName},${sortType}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getScheduleByDate = (gradeMin, gradeMax, start, end, page, size, sortName, sortType) => {
    return axios.get(`https://meet.appui.io:8443/search/schedules?gradeMin=${gradeMin}&gradeMax=${gradeMax}&startDate=${start}&endDate=${end}&page=${page}&size=${size}&sort=${sortName},${sortType}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getSchedule = (grade) => {
    let page = 0;
    let size = 20;
    let filter = 'startDate';
    let sort = 'asc';
    let tenant = JSON.parse(localStorage.getItem("tenant"));
    return axios.get(`https://meet.appui.io:8443/search/schedules?gradeMin=${0}&gradeMax=${100}&page=${page}&size=${size}&sort=${filter},${sort}`)
        .then(res => {
            return res.data;
        })
}


export const getCountry = () => {
    return axios.get(`http://ip-api.com/json`)
        .then(res => {
            return res.data;
        })
}

export const getStudentProfileByDate = (start, end, page, size, sortName, sortType) => {
    return axios.get(`${routes.SERVER_ADDRESS}/search/student-profiles?page=${page}&size=${size}&sort=${sortName},${sortType}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getTeacherProfileByDate = (start, end, page, size, sortName, sortType) => {
    return axios.get(`${routes.SERVER_ADDRESS}/search/teacher-profiles?page=${page}&size=${size}&sort=${sortName},${sortType}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getShortMessagesByDate = (type, start, end, page, size, sortName, sortType) => {
    return axios.get(`${routes.SERVER_ADDRESS}/search/customer-messages?category=${type}&startDate=${start}&endDate=${end}&page=${page}&size=${size}&sort=${sortName},${sortType}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getStudentDetail = (studentId) => {
    return axios.get(`${routes.SERVER_ADDRESS}/student-bookings/${studentId}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getBookings = (studentId) => {
    return axios.get(`${routes.SERVER_ADDRESS}/student-bookings/${studentId}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const findStudentListByFirstNameAndLastName = (firstName, start, end, page, size, sortName, sortType) => {
    return axios.get(`${routes.SERVER_ADDRESS}/search/student-bookings?firstName=${firstName}&startDate=${start}&endDate=${end}&page=${page}&size=${size}&sort=${sortName},${sortType}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const findParentProfileByEmail = (email, start, end, page, size, sortName, sortType) => {
    return axios.get(`${routes.SERVER_ADDRESS}/search/student-parents?email=${email}&page=${page}&size=${size}&sort=${sortName},${sortType}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const findScheduleByGrade = (gradeMin, gradeMax, start, end, page, size, sortName, sortType) => {
    return axios.get(`https://meet.appui.io:8443/search/schedules?gradeMin=${gradeMin}&gradeMax=${gradeMax}&startDate=${start}&endDate=${end}&page=${page}&size=${size}&sort=${sortName},${sortType}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const findStudentProfileByFirstNameAndLastName = (firstName, start, end, page, size, sortName, sortType) => {
    return axios.get(`${routes.SERVER_ADDRESS}/search/student-profiles?firstName=${firstName}&page=${page}&size=${size}&sort=${sortName},${sortType}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const findTeacherProfileByFirstNameAndLastName = (firstName, start, end, page, size, sortName, sortType) => {
    //return axios.get(`${routes.SERVER_ADDRESS}/students_bookings/search/findByStudentProfileFirstNameIgnoreCaseContainingOrStudentProfileLastNameIgnoreCaseContaining?firstName=${firstName}&lastName=${lastName}&sort=${sortName},${sortType}`)
    return axios.get(`${routes.SERVER_ADDRESS}/search/teacher-profiles?firstName=${firstName}&page=${page}&size=${size}&sort=${sortName},${sortType}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getShortMessages = (type, firstName, start, end, page, size, sortName, sortType) => {
    //return axios.get(`${routes.SERVER_ADDRESS}/students_bookings/search/findByStudentProfileFirstNameIgnoreCaseContainingOrStudentProfileLastNameIgnoreCaseContaining?firstName=${firstName}&lastName=${lastName}&sort=${sortName},${sortType}`)
    return axios.get(`${routes.SERVER_ADDRESS}/search/customer-messages?category=${type}&firstName=${firstName}&startDate=${start}&endDate=${end}&page=${page}&size=${size}&sort=${sortName},${sortType}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getChild = (id) => {
    return axios.get(`${routes.SERVER_ADDRESS}/search/student-profiles?parentId=${id}`)
        .then(res => {
            return res.data;
        })
}

export const getShortMessagesTemplates = (type, page, size, sortName, sortType) => {
    //return axios.get(`${routes.SERVER_ADDRESS}/students_bookings/search/findByStudentProfileFirstNameIgnoreCaseContainingOrStudentProfileLastNameIgnoreCaseContaining?firstName=${firstName}&lastName=${lastName}&sort=${sortName},${sortType}`)
    return axios.get(`${routes.SERVER_ADDRESS}/search/customer-message-templates?category=${type}&page=${page}&size=${size}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const assignStudentlistToTeacher = (teacherId, studentIds) => {
    return axios.get(`${routes.SERVER_ADDRESS}/schedule/${teacherId}/${studentIds}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const deleteStudentBooking = (studentIds) => {
    return axios.get(`${routes.SERVER_ADDRESS}/student-bookings/disable/${studentIds}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const assignStudentToAnotherTeacher = (teacherId, studentIds) => {
    let student_ids = [];

    studentIds.split(',').forEach(id => {
        let item = {};
        item.id = id;
        student_ids.push(item);
    });

    let data = {
        "studentBookings":
            student_ids
    }
    // console.log(`${routes.SERVER_ADDRESS}/meet/assign/${studentIds}/${teacherId}`);
    return axios.patch(`${routes.SERVER_ADDRESS}/teacher-availability/${teacherId}`, data)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const assignMeetingToAnotherTeacher = (teacherId, url) => {
    let data = {
        "teacherProfile": {
            "conferenceUrl": url
        }
    }
    return axios.patch(`${routes.SERVER_ADDRESS}/teacher-availability/${teacherId}`, data)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const bridgeManagement = (status) => {
    return axios.get(`https://meet.appui.io:8443/bridge?open=${status}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const persistManagement = (status) => {
    return axios.get(`${routes.SERVER_ADDRESS}/meet/bridge?persist=${status}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const bridgeStatus = () => {
    return axios.get(`${routes.SERVER_ADDRESS}/meet/bridge/status`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const editSubject = (id, subject) => {
    return axios.get(`${routes.SERVER_ADDRESS}/student-bookings/update/${id}?subject=${subject}`)
        .then(res => {
            return res;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const editSubjectGrade = (id, subjects, grades) => {
    return axios.get(`${routes.SERVER_ADDRESS}/teachers_availabilities/update/${id}?subjects=${subjects}&grades=${grades}`)
        .then(res => {
            return res;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const deleteSchedule = (ids) => {
    let data = ids.split(',');
    let url = '';
    data.forEach((d, i) => {
        if(i == data.length-1)
            url += 'id='+d
        else 
            url += 'id='+d+'&'
    })
    return axios.delete(`${routes.SERVER_ADDRESS}/schedule?${url}`).then(res => {
        return res;
    }).catch(err => console.log(err));
}

export const deleteStudentProfiles = (ids) => {
    let data = ids.split(',');
    let url = '';
    data.forEach((d, i) => {
        if(i == data.length-1)
            url += 'id='+d
        else 
            url += 'id='+d+'&'
    })
    return axios.delete(`${routes.SERVER_ADDRESS}/schedule?${url}`).then(res => {
        return res;
    }).catch(err => console.log(err));
}

export const deleteTeacherProfile = (ids) => {
    let data = ids.split(',');
    let url = '';
    data.forEach((d, i) => {
        if(i == data.length-1)
            url += 'id='+d
        else 
            url += 'id='+d+'&'
    })
    return axios.delete(`${routes.SERVER_ADDRESS}/schedule?${url}`).then(res => {
        return res;
    }).catch(err => console.log(err));
}

export const deleteParents = (ids) => {
    let data = ids.split(',');
    let url = '';
    data.forEach((d, i) => {
        if(i == data.length-1)
            url += 'id='+d
        else 
            url += 'id='+d+'&'
    })
    return axios.delete(`${routes.SERVER_ADDRESS}/student-parent?${url}`).then(res => {
        return res;
    }).catch(err => console.log(err));
}

export const deleteAvailabilities = (ids) => {
    let data = ids.split(',');
    let url = '';
    data.forEach((d, i) => {
        if(i == data.length-1)
            url += 'id='+d
        else 
            url += 'id='+d+'&'
    })
    return axios.delete(`${routes.SERVER_ADDRESS}/teacher-availability?${url}`).then(res => {
        return res;
    }).catch(err => console.log(err));
}

export const deleteBookings = (ids) => {
    let data = ids.split(',');
    let url = '';
    data.forEach((d, i) => {
        if(i == data.length-1)
            url += 'id='+d
        else 
            url += 'id='+d+'&'
    })
    return axios.delete(`${routes.SERVER_ADDRESS}/student-booking?${url}`).then(res => {
        return res;
    }).catch(err => console.log(err));
}
import axios from 'axios';
import * as routes from '../routes';

export const getStudentListById = (TeacherId, type = 'availabilityId') => {
    // return axios.get(`${routes.SERVER_ADDRESS}/teacher-availability/${TeacherId}/student-bookings`)
    return axios.get(`${routes.BOOKING}?${type}=${TeacherId}`)
        .then(res => {
            console.log(res.data);
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getStudentList = (page, size, sortName, sortType) => {

    return axios.get(`${routes.BOOKING}?page=${page}&size=${size}&sort=${sortName},${sortType ? sortType : 'asc'}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getStudentListByDate = (start, end, page, size, sortName, sortType) => {
    return axios.get(`${routes.BOOKING}?startDate=${start}&endDate=${end}&page=${page}&size=${size}&sort=${sortName},${sortType ? sortType : 'asc'}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getParentProfile = (page, size, sortName, sortType) => {
    return axios.get(`${routes.PARENT}?page=${page}&size=${size}&sort=${sortName},${sortType ? sortType : 'asc'}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getParentById = (id) => {
    return axios.get(`${routes.PARENT}/${id}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

// export const getTenant = (key) => {
//     return axios.get(`tenant-profile/${key}`)
//         .then(res => {
//             return res.data;
//         })
//         .catch(err => {
//         })
// }

const computeGrades = (gradesInput) => {

    gradesInput = gradesInput.trim();

    if (gradesInput.length === 0)
        return [];

    if (gradesInput.includes(',')) {
        try {
            let grades = gradesInput.split(',');
            let response = [];
            for (let index = 0; index < grades.length; index++) {
                const item = grades[index];
                if (item.includes('-')) {
                    response = [...response, ...computeGrades(item.trim())];
                } else {
                    response.push(new Number(item+"".trim()));
                }
            }
            return response;
        } catch (err) {
            console.log('Error 5 => ', err);
            throw 'Error... 5';
        }
    } else {
        let grades = gradesInput.split('-');
        if (grades.length <= 2 && grades.length > 0) {
            if (grades.length === 1) {
                try {
                    return [new Number(grades[0]+"".trim())];
                } catch (err) {
                    console.log('Error 1 => ', err);
                    throw "Error... 1"
                }
            } else {
                try {
                    let response = [];
                    for (let index = grades[0]; index <= grades[1]; index++) {
                        response.push(new Number(index+"".trim()));
                    }
                    return response;
                } catch (err) {
                    console.log('Error 3 => ', err)
                    throw "Error... 3";
                }
            }
        } else {
            console.log('Mauvais format de donnée');
            throw "Error... 4"
        }
    }
}

export const getScheduleByDate = (gradesInput, start, end, page, size, sortName, sortType, courseId = null) => {

    let gradeResponse = [];

    try {
        gradeResponse = computeGrades(gradesInput);
    } catch (err) {
        console.log(err);
        alert('Bad format for grades');
        return
    }

    let grades = '';

    for (let index = 0; index < gradeResponse.length; index++) {
        grades = grades + "&grade=" + gradeResponse[index]+"".trim();
    }

    return axios.get(`${routes.SCHEDULE}?startDate=${start}${courseId ? '&courseId=' + courseId : ''}${grades}&endDate=${end}&page=${page}&size=${size}&sort=${sortName},${sortType ? sortType : 'asc'}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getSchedules = (page, size, sortName, sortType) => {
    return axios.get(`${routes.SCHEDULE}?page=${page}&size=${size}&sort=${sortName},${sortType ? sortType : 'asc'}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getSchedule = (min = 0, max = 20) => {
    let page = 0;
    let size = 10000;
    let filter = 'startDate';
    let sort = 'asc';
    max = max === -1 ? min : max;

    let grades = "";

    for (let index = min; index <= max; index++) {
        grades = grades + "&grade=" + index
    }

    return axios.get(`${routes.SCHEDULE}?page=${page}${grades}&size=${size}&sort=${filter},${sort}`)
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
    return axios.get(`${routes.STUDENT}?startDate=${start}&endDate=${end}&page=${page}&size=${size}&sort=${sortName},${sortType ? sortType : 'asc'}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getTeacherProfileByDate = (start, end, page, size, sortName, sortType) => {
    return axios.get(`${routes.TEACHER}?startDate=${start}&endDate=${end}page=${page}&size=${size}&sort=${sortName},${sortType ? sortType : 'asc'}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getTeacherProfiles = (page, size, sortName, sortType) => {
    return axios.get(`${routes.TEACHER}?page=${page}&size=${size}&sort=${sortName},${sortType ? sortType : 'asc'}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getStudentDetail = (studentId) => {
    return axios.get(`${routes.BOOKING}/${studentId}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getStudentProfileById = (studentId) => {
    return axios.get(`${routes.STUDENT}/${studentId}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getBookings = (studentId) => {
    return axios.get(`${routes.BOOKING}/${studentId}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const findStudentListByFirstNameAndLastName = (firstName, start, end, page, size, tag, sortName, sortType) => {
    return axios.get(`${routes.BOOKING}?firstName=${firstName}&startDate=${start}&endDate=${end}&page=${page}&size=${size}&tag=${tag}&sort=${sortName},${sortType ? sortType : 'asc'}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const findParentProfileByEmail = (email, page, size, sortName, sortType) => {
    return axios.get(`${routes.PARENT}?email=${email}&page=${page}&size=${size}&sort=${sortName},${sortType ? sortType : 'asc'}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const findScheduleByGrade = (gradesInput, start, end, page, size, sortName, sortType, courseId = null) => {

    let gradeResponse = [];

    try {
        gradeResponse = computeGrades(gradesInput);
    } catch (err) {
        console.log(err);
        alert('Bad format for grades');
        return
    }

    let grades = '';

    for (let index = 0; index < gradeResponse.length; index++) {
        grades = grades + "&grade=" + gradeResponse[index]+"".trim();
    }

    return axios.get(`${routes.SCHEDULE}?startDate=${start}${courseId ? '&courseId=' + courseId : ''}${grades}&endDate=${end}&page=${page}&size=${size}&sort=${sortName},${sortType ? sortType : 'asc'}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const findStudentProfileByFirstNameAndLastName = (firstName, start, end, page, size, tag, sortName, sortType) => {
    return axios.get(`${routes.STUDENT}?firstName=${firstName}&startDate=${start}&endDate=${end}&page=${page}&size=${size}&tag=${tag}&sort=${sortName},${sortType ? sortType : 'asc'}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const findTeacherProfileByFirstNameAndLastName = (firstName, start, end, page, size, tag, sortName, sortType) => {
    //return axios.get(`students_bookings/search/findByStudentProfileFirstNameIgnoreCaseContainingOrStudentProfileLastNameIgnoreCaseContaining?firstName=${firstName}&lastName=${lastName}&sort=${sortName},${sortType}`)
    return axios.get(`${routes.TEACHER}?firstName=${firstName}&startDate=${start}&endDate=${end}&page=${page}&size=${size}&tag=${tag}&sort=${sortName},${sortType ? sortType : 'asc'}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getShortMessages = (type, term, page, size, sortName, sortType) => {
    //return axios.get(`${routes.SERVER_ADDRESS}/students_bookings/search/findByStudentProfileFirstNameIgnoreCaseContainingOrStudentProfileLastNameIgnoreCaseContaining?firstName=${firstName}&lastName=${lastName}&sort=${sortName},${sortType}`)
    return axios.get(`${routes.MESSAGE}/${type}?term=${term}&page=${page}&size=${size}&sort=${sortName},${sortType ? sortType : 'asc'}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getChild = (id) => {
    return axios.get(`${routes.STUDENT}?parentId=${id}`)
        .then(res => {
            return res.data;
        })
}

export const getShortMessagesTemplates = (type, page, size) => {
    //return axios.get(`${routes.SERVER_ADDRESS}/students_bookings/search/findByStudentProfileFirstNameIgnoreCaseContainingOrStudentProfileLastNameIgnoreCaseContaining?firstName=${firstName}&lastName=${lastName}&sort=${sortName},${sortType}`)
    return axios.get(`${routes.SERVER_ADDRESS}/${type}?page=${page}&size=${size}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const assignStudentlistToTeacher = (teacherId, studentIds) => {
    return axios.get(`${routes.SCHEDULE}/${teacherId}/${studentIds}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const deleteStudentBooking = (studentIds) => {
    return axios.get(`${routes.BOOKING}/disable/${studentIds}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getBookingAvailability = (bookingId) => {
    return axios.get(`${routes.AVAILABILITY}/booking?id=${bookingId}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const assignStudentToAnotherTeacher = (teacherId, studentId) => {
    let data = {
        availabilityId: teacherId,
        bookingId: studentId
    }

    return axios.post(`${routes.AVAILABILITY}/${teacherId}/booking/${studentId}`, data)
        .then(res => {
            return res.data;
        })
        .catch(err => {
        })
}
export const unAssignStudentToAnotherTeacher = (teacherId, studentId) => {
    let data = {
        availabilityId: teacherId,
        bookingId: studentId
    }

    return axios.delete(`${routes.AVAILABILITY}/${teacherId}/booking/${studentId}`, data)
        .then(res => {
            return res.data;
        })
        .catch(err => {
        })
}

export const assignMeetingToAnotherTeacher = (teacherId, url) => {
    let data = {
        "teacherProfile": {
            "conferenceUrl": url
        }
    }
    return axios.patch(`${routes.AVAILABILITY}/${teacherId}`, data)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const bridgeManagement = (status) => {
    return axios.get(`${routes.SERVER_ADDRESS}/bridge?open=${status}`)
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
    return axios.get(`${routes.BOOKING}/update/${id}?subject=${subject}`)
        .then(res => {
            return res;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getBooking = (id) => {
    return axios.get(`${routes.BOOKING}/${id}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const editSubjectGrade = (id, subjects, grades) => {
    return axios.get(`${routes.AVAILABILITY}/update/${id}?subjects=${subjects}&grades=${grades}`)
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
        if (i === data.length - 1)
            url += 'id=' + d
        else
            url += 'id=' + d + '&'
    })
    return axios.delete(`${routes.SCHEDULE}?${url}`).then(res => {
        return res;
    }).catch(err => console.log(err));
}

export const deleteStudentProfiles = (ids) => {
    let data = ids.split(',');
    let url = '';
    data.forEach((d, i) => {
        if (i === data.length - 1)
            url += 'id=' + d
        else
            url += 'id=' + d + '&'
    })
    return axios.delete(`${routes.SCHEDULE}?${url}`).then(res => {
        return res;
    }).catch(err => console.log(err));
}

export const deleteTeacherProfile = (ids) => {
    let data = ids.split(',');
    let url = '';
    data.forEach((d, i) => {
        if (i === data.length - 1)
            url += 'id=' + d
        else
            url += 'id=' + d + '&'
    })
    return axios.delete(`${routes.SCHEDULE}?${url}`).then(res => {
        return res;
    }).catch(err => console.log(err));
}

export const deleteParents = (ids) => {
    let data = ids.split(',');
    let url = '';
    data.forEach((d, i) => {
        if (i === data.length - 1)
            url += 'id=' + d
        else
            url += 'id=' + d + '&'
    })
    return axios.delete(`${routes.PARENT}?${url}`).then(res => {
        return res;
    }).catch(err => console.log(err));
}

export const deleteAvailabilities = (ids) => {
    let data = ids.split(',');
    let url = '';
    data.forEach((d, i) => {
        if (i === data.length - 1)
            url += 'id=' + d
        else
            url += 'id=' + d + '&'
    })
    return axios.delete(`${routes.AVAILABILITY}?${url}`).then(res => {
        return res;
    }).catch(err => console.log(err));
}

export const deleteBookings = (ids) => {
    let data = ids.split(',');
    let url = '';
    data.forEach((d, i) => {
        if (i === data.length - 1)
            url += 'id=' + d
        else
            url += 'id=' + d + '&'
    })
    return axios.delete(`${routes.BOOKING}?${url}`).then(res => {
        return res;
    }).catch(err => console.log(err));
}

export const sendStudentsMessage = (message_id) => {
    return axios.post(`${routes.SERVER_ADDRESS}/message​/${message_id}/students`).then(res => {
        return res;
    }).catch(err => console.log(err));
}

export const sendMessageBookings = (message_id) => {
    return axios.post(`${routes.SERVER_ADDRESS}/message/${message_id}/bookings`).then(res => {
        return res;
    }).catch(err => console.log(err));
}

export const sendMessageToBooking = (booking_id, message) => {
    var config = {
        headers: {
            'Content-Length': 0,
            'Content-Type': 'text/plain'
        },
        responseType: 'text'
    };
    return axios.post(`${routes.SERVER_ADDRESS}/message/booking/${booking_id}`, message, config).then(res => {
        return res;
    }).catch(err => console.log(err));
}

export const getTags = (page, size, sortName, sortType) => {
    return axios.get(`${routes.TAG}?page=${page}&size=${size}&sort=${sortName},${sortType ? sortType : 'asc'}`)
        .then(res => {
            return res.data;
        })
        .catch(err => console.log(err))
}
export const getTagByName = (name) => {
    return axios.get(`${routes.TAG}?name=${name}`)
        .then(res => {
            return res.data;
        })
        .catch(err => console.log(err))
}

export const addTag = (data) => {
    return axios.post(`${routes.TAG}`, data)
        .then(res => {
            return res.data;
        })
        .catch(err => console.log(err))
}

export const updateTag = (id, data) => {
    return axios.patch(`${routes.TAG}/${id}`, data)
        .then(res => {
            return res.data;
        })
        .catch(err => console.log(err))
}

export const enableTags = (data) => {
    return axios.post(`${routes.TAG}/enable`, data)
        .then(res => {
            return res.data;
        })
        .catch(err => console.log(err))
}

export const disableTags = (data) => {
    return axios.post(`${routes.TAG}/disable`, data)
        .then(res => {
            return res.data;
        })
        .catch(err => console.log(err))
}

export const getTagByDate = (page, size, sortName, sortType, name, date) => {
    return axios.get(`${routes.TAG}?page=${page}&size=${size}&sort=${sortName},${sortType}&name=${name}&createDate=${date}`)
        .then(res => {
            return res.data;
        })
        .catch(err => console.log(err))
}
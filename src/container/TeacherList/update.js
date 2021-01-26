import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import '../../Assets/container/StudentList.css'
import { PageHeader, Form, Input, Button, Select } from 'antd';
import React, { useEffect, useState, useReducer } from 'react'
import { createAvailibility } from '../../services/Teacher';
import { getTeacherProfileByDate, getSchedule } from '../../services/Student'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Moment from 'react-moment';

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

function CreateAvailibility() {

    const history = useHistory();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [loadingS, setLoadingS] = useState(false);
    const [student, setStudent] = useState(null);
    const [studentList, setStudentList] = useState([]);
    const [children, setChildren] = useState(null);
    const [form] = Form.useForm();
    const [schedules, setSchedules] = useState([]);
    const [dates, setDates] = useState([]);
    const [ends, setEnds] = useState([]);
    const [dat, setDat] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [subjec, setSubjec] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [teacher, setTeacher] = useState(location.state.teacher);

    useEffect(() => {
        setChildren(teacher.teacherProfile);
        getStudents();
    }, []);

    const changeChildren = (id) => {
        setDates([]);
        setDat(null);
        setSubjec(null);
        let _children = studentList.filter(c => c.id == id)[0];
        setChildren(_children);
        getSchedule(1).then(data => {
            setSchedules(data.content);
            setDat(null);
            setDates([...new Map(data.content.filter(s => _children.subjects.includes(s.subject)).map(item => [item['id'], item])).values()]);
        });
    }

    const changeDate = (date) => {
        setDat(date);
        setEnds([...new Map(schedules.filter(s => children.subjects.includes(s.subject)).filter(s => s.startDate == date).map(item => [item['id'], item])).values()]);
    }

    const changeEndDate = (date) => {
        setEndDate(date);
    }

    const handleSubmit = () => {
        let s = schedules.filter(s => s.startDate == dat).filter(s => s.endDate == endDate)[0];
        if (s == null || children == null) {
            alert('Fill the form');
            return
        }
        setSubmitting(true);
        createAvailibility(children, s).then(data => {
            history.push(`/teacherlist`)
        }).catch(err => {
            alert("Error occured when saving data, please retry!")
            console.log(err)
        })
            .finally(() => setSubmitting(false));
    }

    const getStudents = () => {
        setLoadingS(true);
        getTeacherProfileByDate(localStorage.getItem('toStart'), localStorage.getItem('toEnd'), 0, 100, 'firstName', 'asc').then(data => {
            if (data) {
                if (data.content) {
                    setStudentList(data.content);
                }
            }
        }).finally(() => setLoadingS(false))
    }

    return (

        <div>
            <PageHeader
                ghost={false}
                title={<p style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>Update Availability</p>}
                extra={[
                ]}
            >
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    autoComplete="off"
                    layout="vertical"
                    style={{ width: '80%', marginLeft: '10%' }}
                >

                    <Form.Item label="Teacher" required>
                        <Autocomplete
                            id="asynchronous-search"
                            options={studentList}
                            defaultValue={teacher.teacherProfile}
                            size="small"
                            inputValue={student}
                            // closeIcon={<EditOutlined style={{ color: 'blue' }}/>}
                            onInputChange={(__, newInputValue) => {
                                setStudent(newInputValue);
                            }}
                            onChange={(__, newValue) => {
                                changeChildren(newValue.id);
                            }}
                            open={open}
                            onOpen={() => {
                                setOpen(true);
                            }}
                            onClose={() => {
                                setOpen(false);
                            }}
                            loading={loadingS}
                            getOptionLabel={(record) => record.firstName + " " + record.lastName}
                            // style={{ minWidth: 450, marginLeft: -250 }}
                            renderInput={(params) =>
                                <TextField {...params}
                                    variant="outlined"
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <React.Fragment>
                                                {loadingS ? <CircularProgress color="inherit" size={20} /> : null}
                                                {params.InputProps.endAdornment}
                                            </React.Fragment>
                                        ),
                                    }}
                                />
                            }
                        />
                    </Form.Item>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Form.Item label="Start date" required style={{ flex: 1, marginRight: '10px' }}>
                            <Select onChange={(e) => changeDate(e)}defaultValue={<Moment local format="D MMM YYYY HH:MM" withTitle>
                                                    {teacher.schedule.startDate}
                                                </Moment>}>
                                <option value={null}>Select a start date</option>
                                {
                                    dates.map(date => {
                                        return (
                                            <option value={date.startDate} key={date.id}>
                                                <Moment local format="D MMM YYYY HH:MM" withTitle>
                                                    {date.startDate}
                                                </Moment>
                                            </option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="End date" required style={{ flex: 1, marginLeft: '10px' }}>
                            <Select onChange={(e) => changeEndDate(e)} defaultValue={<Moment local format="D MMM YYYY HH:MM" withTitle>
                                                    {teacher.schedule.endDate}
                                                </Moment>}>
                                <option value={null}>Select an end date</option>
                                {
                                    ends.map(date => {
                                        return (
                                            <option value={date.endDate} key={date.id}>
                                                <Moment local format="D MMM YYYY HH:MM" withTitle>
                                                    {date.endDate}
                                                </Moment>
                                            </option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </div>
                    <Form.Item>
                        <Button disabled={submitting} onClick={() => handleSubmit} type="primary" size="large" htmlType="submit">
                            {
                                submitting ? 'Loading...' : 'Update Teacher Availability'
                            }
                        </Button>
                    </Form.Item>
                </Form>
            </PageHeader>
        </div>
    )
}
export default CreateAvailibility

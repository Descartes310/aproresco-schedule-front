import 'antd/dist/antd.css';
import '../../Assets/container/StudentList.css';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useHistory, useLocation } from 'react-router-dom';
import { PageHeader, Form, Input, Button, Select } from 'antd';
import CircularProgress from '@material-ui/core/CircularProgress';
import { updateSchedule, getCoursesByGrade, getScheduleById } from '../../services/Teacher';


function UpdateSchedule(props) {

    const history = useHistory();
    const [form] = Form.useForm();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [grade, setGrade] = useState(1);
    const [courses, setCourses] = useState([]);
    const [endDate, setEndDate] = useState('');
    const [course, setCourse] = useState(null);
    const [defaultCourse, setDefaultCourse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [endTime, setEndTime] = useState('');
    const [startTime, setStartTime] = useState('');
    const [startDate, setStartDate] = useState('');
    const [courseId, setCourseId] = useState(null);
    const [repeatPeriod, setRepeatPeriod] = useState();
    const [submitting, setSubmitting] = useState(false);
    const [schedule, setSchedule] = useState(null);

    useEffect(() => {
        findScheduleById();
    }, []);

    useEffect(() => {
        if (schedule) {
            let start = new Date(schedule.startDate);
            let end = new Date(schedule.endDate);
            setStartDate(start.getFullYear() + '-' + ((start.getMonth()+1) < 10 ? '0'+(start.getMonth()+1) : (start.getMonth()+1)) + '-' + (start.getDate() < 10 ? '0'+start.getDate() : start.getDate()));
            setEndDate(end.getFullYear() + '-' + ((end.getMonth()+1) < 10 ? '0'+(end.getMonth()+1) : (end.getMonth()+1)) + '-' + (end.getDate() < 10 ? '0'+end.getDate() : end.getDate()));
            setStartTime(((start.getHours()) < 10 ? '0'+(start.getHours()) : (start.getHours())) +':'+((start.getMinutes()) < 10 ? '0'+(start.getMinutes()) : (start.getMinutes())));
            setEndTime(((end.getHours()) < 10 ? '0'+(end.getHours()) : (end.getHours())) +':'+((end.getMinutes()) < 10 ? '0'+(end.getMinutes()) : (end.getMinutes())));
            setCourseId(schedule.courseId);
            setRepeatPeriod(schedule.repeatPeriodInDays);
            getAllCourses();
        }
    }, [schedule]);

    const findScheduleById = () => {
        getScheduleById(props.match.params.id).then(response => {
            setSchedule(response);
        })
    }

    const getAllCourses = () => {
        setLoading(true);
        getCoursesByGrade(grade).then(data => {
            if (data) {
                if (data.content) {
                    setCourses(data.content);
                }
            }
        }).finally(() => setLoading(false))
    }

    const handleSubmit = () => {

        if (startDate && endDate) {
            if (startDate.toString().length <= 0 || endDate.toString().length <= 0) {
                alert("Please, fill dates!");
                return
            }
        } else {
            alert("Please, fill the form dates!");
            return
        }

        if (endDate < startDate) {
            alert("Start date cannot be after end date");
            return
        }
        if (!courseId) {
            alert("Please, fill the course!");
            return
        }

        setSubmitting(true)

        // console.log(startDate);
        // let date = new Date(startDate);
        // let d = (date.getMonth() + 1).toString().padStart(2, '0') + '/' + date.getDate().toString().padStart(2, '0') + '/' + date.getFullYear();
        let d = startDate.split('-')[1] + '/' + startDate.split('-')[2] + '/' + startDate.split('-')[0];

        // console.log(endDate);
        // let fdate = new Date(endDate);
        let f = endDate.split('-')[1] + '/' + endDate.split('-')[2] + '/' + endDate.split('-')[0];

        let data = {
            course: courses.find(c => c.id === courseId),
            startDate: d+' '+startTime+':00 '+new Date().toString().split('GMT')[1].split(' ')[0].trim(),
            endDate: f+' '+endTime+':00 '+new Date().toString().split('GMT')[1].split(' ')[0].trim(),
            repeatPeriodInDays: repeatPeriod,
        }

        updateSchedule(schedule.id, data).then(result => {
            history.push(`/schedules`)
        }).finally(() => setSubmitting(false));
    }

    return (

        <div>
            <PageHeader
                ghost={false}
                title={<p style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>Update Schedule</p>}
                extra={[
                ]}
            >
                <Form
                    form={form}
                    autoComplete="off"
                    onFinish={handleSubmit}
                    layout="vertical"
                    onKeyPress={event => {
                        if (event.which === 13 /* Enter */) {
                            event.preventDefault();
                        }
                    }}
                    style={{ width: '80%', marginLeft: '10%' }}
                >
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Form.Item label="Select a grade" required style={{ flex: 1, marginRight: '10px' }}>
                            <Select onChange={(e) => setGrade(e)} value={grade}>
                                <Select.Option value={null}>Select a grade</Select.Option>
                                <Select.Option value={1}>1</Select.Option>
                                <Select.Option value={2}>2</Select.Option>
                                <Select.Option value={3}>3</Select.Option>
                                <Select.Option value={4}>4</Select.Option>
                                <Select.Option value={5}>5</Select.Option>
                                <Select.Option value={6}>6</Select.Option>
                                <Select.Option value={7}>7</Select.Option>
                                <Select.Option value={8}>8</Select.Option>
                                <Select.Option value={9}>9</Select.Option>
                                <Select.Option value={10}>10</Select.Option>
                                <Select.Option value={11}>11</Select.Option>
                                <Select.Option value={12}>12</Select.Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Form.Item label="Select the course" required style={{ flex: 1, marginRight: '10px', marginLeft: '10px' }}>
                            <Autocomplete
                                id="asynchronous-search"
                                options={courses}
                                size="small"
                                onInputChange={(__, newInputValue) => {
                                    setCourse(newInputValue);
                                }}
                                onChange={(__, newValue) => {
                                    setCourseId(newValue.id);
                                }}
                                open={open}
                                onOpen={() => {
                                    setOpen(true);
                                }}
                                onClose={() => {
                                    setOpen(false);
                                }}
                                loading={loading}
                                getOptionLabel={(record) => record.name}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        variant="outlined"
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <React.Fragment>
                                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                    {params.InputProps.endAdornment}
                                                </React.Fragment>
                                            ),
                                        }}
                                    />
                                }
                            />
                        </Form.Item>

                        <Form.Item label="Repeat period (in days)" required style={{ flex: 1, marginRight: '10px' }}>
                            <Input type="number" name="repeatPeriodInDays" value={repeatPeriod} onChange={(e) => setRepeatPeriod(e.target.value)} />
                        </Form.Item>
                    </div>


                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Form.Item label="Start date" required style={{ flex: 1, marginRight: '10px' }}>
                            <Input type="date" name="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Start time" required style={{ flex: 1, marginRight: '10px' }}>
                            <Input type="time" name="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                        </Form.Item>
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Form.Item label="End date" required style={{ flex: 1, marginRight: '10px' }}>
                            <Input type="date" name="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="End time" required style={{ flex: 1, marginRight: '10px' }}>
                            <Input type="time" name="endTime" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                        </Form.Item>
                    </div>

                    <Form.Item>
                        <Button disabled={submitting} type="primary" size="large" htmlType="submit">
                            {
                                submitting ? 'Loading...' : 'Update a Schedule'
                            }
                        </Button>
                    </Form.Item>
                </Form>
            </PageHeader>
        </div>
    )
}

export default UpdateSchedule;

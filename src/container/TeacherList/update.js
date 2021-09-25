import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import '../../Assets/container/StudentList.css'
import { PageHeader, Form, Button, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { updateAvailibility, getCourses, getTeacherAvailabilityById, getTeacherProfileById } from '../../services/Teacher';
import { getTeacherProfileByDate, getSchedule } from '../../services/Student'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { VerticalAlignBottomOutlined, VerticalAlignTopOutlined } from "@ant-design/icons"
import CircularProgress from '@material-ui/core/CircularProgress';
import Moment from 'react-moment';
import StudentListOfTeacher from './StudentListOfTeacher';

function CreateAvailibility(props) {

    const history = useHistory();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [loadingS, setLoadingS] = useState(false);
    const [student, setStudent] = useState(null);
    const [selectedRow, setSelectedRow] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [defaulttags] = useState([]);
    const [children, setChildren] = useState(null);
    const [form] = Form.useForm();
    const [schedules, setSchedules] = useState([]);
    const [dates, setDates] = useState([]);
    const [schedule, setSchedule] = useState(null);
    const [ends, setEnds] = useState([]);
    const [dat, setDat] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [teacher, setTeacher] = useState(null);
    const [sortingType, setSortingType] = useState("desc");
    const [sortingName, setSortingName] = useState("createDate");
    const [tableProps, setTableProps] = useState({
        totalCount: 0,
        pageIndex: 0,
        pageSize: 30,
    });

    const rowSelection = {
        selectedRow,
        onChange: (selectedrow, records) => {
            console.log('records => ', records)
            setSelectedRow(records);
            let record = records[0]
            let sch = {
                id: record.id,
                subject: record.subject,
                startDate: record.startDate,
                endDate: record.endDate,
                grades: record.grades,
                durationInMinutes: record.durationInMinutes,
                repeatPeriodInDays: record.repeatPeriodInDays,
                price: record.price,
            }
            setSchedule(sch)
        },
        type: 'radio'
    };

    const getTeacherById = (id) => {
        getTeacherAvailabilityById(props.match.params.id).then(data => {
            setTeacher(data);
            getProfileById(data.teacherProfile.id, data.schedule);
            setSchedule(data.schedule);
            console.log('Schedule 1 => ', data.schedule)
        });
    }

    const getProfileById = (id, selectedSchedule) => {
        getTeacherProfileById(id).then(resp => {
            setChildren(resp);
            getSchedule(1).then(data => {
                setSelectedRow([data.content.filter(s => s.id === selectedSchedule.id)]);
                setSchedules(data.content.filter(s => resp.subjects.map(cs => cs.id).includes(courses.find(c => c.id === s.course.id) ? courses.find(c => c.id === s.course.id).subject.id : 'null')));
            });
        });
    }

    useEffect(() => {
        getAllCourses();
    }, []);

    useEffect(() => {
        if (courses.length > 0) {
            getTeacherById(props.match.params.id)
        }
    }, [courses])

    const getAllCourses = () => {
        getCourses().then(data => {
            getStudents();
            if (data) {
                if (data.content) {
                    setCourses(data.content);
                }
            }
        })
    }


    const changeChildren = (id) => {
        setDates([]);
        let _children = studentList.filter(c => c.id === id)[0];
        setChildren(_children);
        getSchedule(1).then(data => {
            data.content = data.content.sort(function (a, b) {
                var dateA = new Date(a.createDate), dateB = new Date(b.createDate);
                return dateB - dateA;
            });
            setSchedules(data.content.filter(s => _children.subjects.map(cs => cs.id).includes(courses.find(c => c.id === s.course.id) ? courses.find(c => c.id === s.course.id).subject.id : 'null')));
            setDat(null);
            setDates([...new Map(data.content.filter(s => _children.subjects.includes(s.subject)).map(item => [item['id'], item])).values()]);
        });
    }

    const handleSubmit = () => {
        if (schedule == null || children == null) {
            alert('Fill the form');
            return
        }

        setSubmitting(true);

        updateAvailibility(teacher.id, children, schedule).then(data => {
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
                    setStudentList(data.content.filter(t => t.subjects));
                }
            }
        }).finally(() => setLoadingS(false))
    }

    const handleTableChange = (pagination, filters, sorter) => {
        setTableProps({
            ...tableProps,
            pageIndex: pagination.current - 1,
            pageSize: pagination.pageSize,
        });
        setLoading(true);
        setSchedules([]);
    };

    const columns = [
        {
            title: <div><span>Subject </span>
                {sortingName === "subject" && sortingType === "asc" && <VerticalAlignBottomOutlined />}
                {sortingName === "subject" && sortingType === "desc" && <VerticalAlignTopOutlined />}
                {sortingName === "subject" && sortingType === "" && ""}
            </div>,
            onHeaderCell: (column) => {
                return {
                    onClick: () => {
                        setSortingName("subject");
                        if (sortingType === "") { setSortingType("asc") }
                        else if (sortingType === "asc") { setSortingType("desc") }
                        else if (sortingType === "desc") { setSortingType("asc"); setSortingName("subject"); }
                    }
                };
            },
            render: (record) => {
                // let course = courses.find(c => c.id === record.courseId);
                return (
                    <div>
                        {record.course ? record.course.subject ? record.course.subject.name : '' : ''}
                    </div>
                )
            },
            key: 'subject',
        },
        {
            title: <div><span>Start Date </span>
                {sortingName === "startDate" && sortingType === "asc" && <VerticalAlignBottomOutlined />}
                {sortingName === "startDate" && sortingType === "desc" && <VerticalAlignTopOutlined />}
                {sortingName === "startDate" && sortingType === "" && ""}
            </div>,
            onHeaderCell: (column) => {
                return {
                    onClick: () => {
                        setSortingName("startDate");
                        if (sortingType === "") { setSortingType("asc") }
                        else if (sortingType === "asc") { setSortingType("desc") }
                        else if (sortingType === "desc") { setSortingType("asc"); setSortingName("startDate"); }
                    }
                };
            },
            render: (record) => {
                let s = record.startDate;
                let date = (new Date(s)).toLocaleDateString();
                let sTime = ((new Date(s)).toLocaleTimeString()).split(':');

                let sst = sTime[0] + ':' + sTime[1];

                return (
                    <span>
                        {date + " " + sst}
                    </span>
                )
            },
            key: 'startDate',
        },
        {
            title: <div><span>End Date </span>
                {sortingName === "endDate" && sortingType === "asc" && <VerticalAlignBottomOutlined />}
                {sortingName === "endDate" && sortingType === "desc" && <VerticalAlignTopOutlined />}
                {sortingName === "endDate" && sortingType === "" && ""}
            </div>,
            onHeaderCell: (column) => {
                return {
                    onClick: () => {
                        setSortingName("endDate");
                        if (sortingType === "") { setSortingType("asc") }
                        else if (sortingType === "asc") { setSortingType("desc") }
                        else if (sortingType === "desc") { setSortingType("asc"); setSortingName("endDate"); }
                    }
                };
            },
            render: (record) => {
                let f = record.endDate;
                let date = (new Date(f)).toLocaleDateString();
                return (
                    <span>
                        {date}
                    </span>
                )
            },
            key: 'endDate',
        },
        {
            title: 'Duration',
            key: 'durationInMinutes',
            render: (record) => {
                let course = courses.find(c => c.id === record.course.id);
                return (
                    <div>
                        {course ? course.durationInMinutes + ' min' : ''}
                    </div>
                )
            }
        },
        {
            title: 'Grades',
            key: 'grades',
            render: (record) => {
                let course = record.course ? record.course : null
                if (!course) {
                    course = {};
                    course.grade = []
                }
                return (
                    <div>
                        {gradesToPrint(course)}
                    </div>
                )
            }
        },
        {
            title: 'Price',
            key: 'price',
            render: (record) => {
                let course = courses.find(c => c.id === record.course.id);
                return (
                    course && (
                        <div>
                            {course.prices[0].amount + ' ' + course.prices[0].currencyCode}
                        </div>
                    )
                )
            }
        },
        {
            title: 'Repeat',
            key: 'repeatPeriodInDays',
            render: (record) => {
                return (
                    <div>
                        {record.repeatPeriodInDays + ' d'}
                    </div>
                )
            }
        },
        {
            title: 'Language',
            key: 'language',
            render: (record) => {
                let course = courses.find(c => c.id === record.course.id);
                return (
                    <div>
                        {course ? course.language : ''}
                    </div>
                )
            }
        },
    ];

    const gradesToPrint = (profile) => {
        let i = 0;
        let result = '';
        if (profile == null) {
            return '';
        }
        if (profile.grades == null) {
            return '';
        }

        for (i = 0; i < profile.grades.length; i++) {
            if (i === 0) {
                result += profile.grades[i];
            } else {
                if (i === (profile.grades.length - 1))
                    if (Number(profile.grades[i - 1]) !== Number(profile.grades[i]) - 1)
                        result = result + ', ' + profile.grades[i];
                    else
                        result = result + '-' + profile.grades[i];
                else
                    if (Number(profile.grades[i - 1]) !== Number(profile.grades[i]) - 1)
                        if (Number(profile.grades[i]) !== Number(profile.grades[i + 1]) - 1)
                            result = result + ',' + profile.grades[i] + ', ' + profile.grades[i + 1];
                        else
                            result = result + ',' + profile.grades[i];
            }
        }

        return result;
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
                    style={{ width: '90%', marginLeft: '5%' }}
                >

                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end'
                    }}>
                        <Form.Item>
                            <Button disabled={submitting || schedules.length <= 0} onClick={() => handleSubmit} type="primary" size="large" htmlType="submit">
                                {
                                    submitting ? 'Loading...' : 'Create a Teacher Availability'
                                }
                            </Button>
                        </Form.Item>
                    </div>
                    {/* 
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end'
                    }}>
                        <Form.Item>
                            <Button disabled={submitting || schedules.length <= 0} onClick={() => handleSubmit} type="primary" size="large" htmlType="submit">
                                {
                                    submitting ? 'Loading...' : 'Create a Teacher Availability'
                                }
                            </Button>
                        </Form.Item>
                    </div>
                    <Form.Item label="Teacher" required>
                        <Autocomplete
                            id="asynchronous-search"
                            options={studentList}
                            size="small"
                            defaultValue={children}
                            inputValue={student}
                            onInputChange={(__, newInputValue) => {
                                if (newInputValue != null) {
                                    setStudent(newInputValue);
                                    getStudents(newInputValue);
                                }
                            }}
                            onChange={(__, newValue) => {
                                if (newValue != null) {
                                    changeChildren(newValue.id);
                                }
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
                    </Form.Item> */}
                    <Table
                        className="table-padding"
                        columns={columns}
                        loading={false}
                        dataSource={schedules}
                        onChange={handleTableChange}
                        pagination={{
                            total: tableProps.totalCount,
                            pageSize: tableProps.pageSize,
                            showTotal: (total, range) => `${range[0]}-${range[1]} out of ${total}`,
                        }}
                        rowSelection={rowSelection}
                        rowKey="id"
                    />
                </Form>
            </PageHeader>
        </div>
    )
}
export default CreateAvailibility

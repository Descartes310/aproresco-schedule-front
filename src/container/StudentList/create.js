import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom'
import '../../Assets/container/StudentList.css'
import { PageHeader, Form, Input, Button, Table, Spin } from 'antd';
import React, { useEffect, useState, useReducer } from 'react'
import { createBooking } from '../../services/Teacher';
import { getStudentProfileByDate, getSchedule, findStudentProfileByFirstNameAndLastName,findScheduleByGrade, getScheduleByDate } from '../../services/Student'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { VerticalAlignBottomOutlined, VerticalAlignTopOutlined, EditOutlined } from "@ant-design/icons"


const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

function CreateBooking() {

    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [loadingS, setLoadingS] = useState(false);
    const [student, setStudent] = useState(null);
    const [comment, setComment] = useState('');
    const [formData, setFormData] = useReducer(formReducer, {});
    const [studentList, setStudentList] = useState([]);
    const [children, setChildren] = useState(null);
    const [form] = Form.useForm();
    const [schedules, setSchedules] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [dates, setDates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dat, setDat] = useState(null);
    const [subjec, setSubjec] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [selectedRow, setSelectedRow] = useState([]);
    const [sortingName, setSortingName] = useState("createDate");
    const [sortingType, setSortingType] = useState("desc");
    const [gradeMin, setGradeMin] = useState("0");
    const [gradeMax, setGradeMax] = useState("100");

    const [tableProps, setTableProps] = useState({
        totalCount: 0,
        pageIndex: 0,
        pageSize: 30,
    });

    const rowSelection = {
        selectedRow,
        onChange: (selectedrow, records) => {
            console.log('selectedRowKeys changed: ', records);
            setSelectedRow(records);
        },
        type: 'radio'
    };

    useEffect(() => {
        getStudents();
        getListView();
    }, [sortingType, sortingName, tableProps.pageIndex]);

    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    const changeChildren = (id) => {
        setDates([]);
        setSubjects([]);
        setDat(null);
        setSubjec(null);
        let _children = studentList.filter(c => c.id == id)[0];
        setChildren(_children);
        getSchedule(1).then(data => {
            setSchedules(data.content)
            var obj = {};
            for (var i = 0, len = data.content.length; i < len; i++)
                obj[data.content[i]['subject']] = data.content[i];

            data.content = new Array();
            for (var key in obj)
                data.content.push(obj[key]);
            setSubjects(data.content)
        });
    }

    const changeSubject = (subject) => {
        setSubjec(subject);
        setDat(null);
        setDates(schedules.filter(s => s.subject == subject).filter(s => s.grades.includes(children.grade)));
    }

    const changeDate = (date) => {
        setDat(date);
    }

    const handleSubmit = () => {
        let s = schedules.filter(s => s.startDate == dat).filter(s => s.subject == subjec)[0];
        if (comment == null || s == null || children == null)
            alert('Fill the form');
        setSubmitting(true);
        createBooking(children, s, comment).then(data => {
            history.push(`/studentlist`)
        }).catch(err => {
            alert("Error occured when saving data, please retry!")
            console.log(err)
        }).finally(() => setSubmitting(false));
    }

    const getStudents = (search = '') => {
        setLoadingS(true);
        if(search.length < 0) {
            getStudentProfileByDate(localStorage.getItem('toStart'), localStorage.getItem('toEnd'), 0, 100, 'firstName', 'asc').then(data => {
                if (data) {
                    if (data.content) {
                        setStudentList(data.content);
                    }
                }
            }).finally(() => setLoadingS(false))
        } else {
            findStudentProfileByFirstNameAndLastName(search, localStorage.getItem('toStart'), localStorage.getItem('toEnd'), 0, 100, 'firstName', 'asc').then(data => {
                if (data) {
                    if (data.content) {
                        setStudentList(data.content);
                    }
                }
            }).finally(() => setLoadingS(false))
        }
        
    }

    const getListView = () => {
        getScheduleByDate(gradeMin, gradeMax, localStorage.getItem('toStart'), localStorage.getItem('toEnd'), tableProps.pageIndex, tableProps.pageSize, sortingName, sortingType).then(data => {
            if (data) {
                if (data.content) {
                    setSchedules([])
                    setSchedules([...new Map(data.content.map(item => [item['id'], item])).values()]);
                    setTableProps({
                        ...tableProps,
                        totalCount: data.totalCount,
                        pageSize: 30,
                    });
                } else {
                    setSchedules([])
                    setTableProps({
                        ...tableProps,
                        totalCount: 0,
                        pageSize: 30,
                    });
                }
            } else {
                setSchedules([])
                setTableProps({
                    ...tableProps,
                    totalCount: 0,
                    pageSize: 30,
                });
            }
            setLoading(false);
        })
    }

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
                        if (sortingType == "") { setSortingType("asc") }
                        else if (sortingType == "asc") { setSortingType("desc") }
                        else if (sortingType == "desc") { setSortingType("asc"); setSortingName("subject"); }
                    }
                };
            },
            render: (record) => {
                return (
                    <div>
                        {record.subject}
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
                        if (sortingType == "") { setSortingType("asc") }
                        else if (sortingType == "asc") { setSortingType("desc") }
                        else if (sortingType == "desc") { setSortingType("asc"); setSortingName("startDate"); }
                    }
                };
            },
            render: (record) => {
                let s = record.startDate.replaceAll('/', '-').split(' ')[0].split('-');
                let st = record.startDate.replaceAll('/', '-').split(' ')[1].split(':');
                let eDate= s[2]+'-'+s[0]+'-'+s[1];
                let sTime= st[0]+':'+st[1];

                let date = new Date(eDate + "T" + sTime + ":00");
                let startD = (date.getMonth()+1).toString().padStart(2, '0') + '/' + date.getDate().toString().padStart(2, '0') + '/' + date.getFullYear()+' '+date.getHours().toString().padStart(2, '0') +':'+ date.getMinutes().toString().padStart(2, '0');
                return (
                    <span>
                        {startD}
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
                        if (sortingType == "") { setSortingType("asc") }
                        else if (sortingType == "asc") { setSortingType("desc") }
                        else if (sortingType == "desc") { setSortingType("asc"); setSortingName("endDate"); }
                    }
                };
            },
            render: (record) => {
                let f = record.endDate.replaceAll('/', '-').split(' ')[0].split('-');
                let eDate= f[2]+'-'+f[0]+'-'+f[1];

                let date = new Date(eDate);
                let endD = (date.getMonth()+1).toString().padStart(2, '0') + '/' + date.getDate().toString().padStart(2, '0') + '/' + date.getFullYear();
                return (
                    <span>
                        {endD}
                    </span>
                )
            },
            key: 'endDate',
        },
        {
            title: 'Duration',
            key: 'durationInMinutes',
            render: (record) => {
                return (
                    <div>
                        {record.durationInMinutes + ' min'}
                    </div>
                )
            }
        },
        {
            title: 'Grades',
            key: 'grades',
            render: (record) => {
                return (
                    <div>
                        {gradesToPrint(record)}
                    </div>
                )
            }
        },
        {
            title: 'Price',
            key: 'price',
            render: (record) => {
                return (
                    <div>
                        {record.price}
                    </div>
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
                return (
                    <div>
                        {record.language}
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
            if (i == 0) {
                result += profile.grades[i];
            } else {
                if (i == (profile.grades.length - 1))
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

    const handleTableChange = (pagination, filters, sorter) => {
        setTableProps({
            ...tableProps,
            pageIndex: pagination.current - 1,
            pageSize: pagination.pageSize,
        });
        setLoading(true);
        setSchedules([]);
    };

    return (

        <div>
            <PageHeader
                ghost={false}
                title={<p style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>Create Booking</p>}
                extra={[
                ]}
            >
                <Form
                    form={form}
                    autoComplete="off"
                    onFinish={handleSubmit}
                    layout="vertical"
                    style={{ width: '80%', marginLeft: '10%' }}
                >
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Form.Item label="Student" required style={{ flex: 1, marginRight: '10px' }}>
                            <Autocomplete
                                id="asynchronous-search"
                                options={studentList}
                                size="small"
                                inputValue={student}
                                onInputChange={(__, newInputValue) => {
                                    setStudent(newInputValue);
                                    getStudents(newInputValue);
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
                                renderInput={(params) =>
                                    <TextField {...params}
                                        variant="outlined"
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <React.Fragment>
                                                    {loadingS ? <CircularProgress color="inherit" /> : null}
                                                    {params.InputProps.endAdornment}
                                                </React.Fragment>
                                            ),
                                        }}
                                    />
                                }
                            />
                        </Form.Item>
                        <Form.Item label="Comment" required style={{ flex: 1, marginRight: '10px' }}>
                            <Input type="text" name="comment" onChange={(e) => setComment(e.target.value)} />
                        </Form.Item>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        {!schedules ? <Spin className="loading-table" /> :
                        <Table
                            className="table-padding"
                            columns={columns}
                            loading={loading}
                            dataSource={schedules}
                            onChange={handleTableChange}
                            pagination={{
                                total: tableProps.totalCount,
                                pageSize: tableProps.pageSize,
                                showTotal: (total, range) => `${range[0]}-${range[1]} out of ${total}`,
                            }}
                            rowSelection={rowSelection}
                            rowKey="id"
                        />}
                    </div>
                    <Form.Item>
                        <Button onClick={() => handleSubmit} disabled={submitting} type="primary" size="large" htmlType="submit">
                            {
                                submitting ? 'Loading...' : 'Create a Student booking'
                            }
                        </Button>
                    </Form.Item>
                </Form>
            </PageHeader>
        </div>
    )
}
export default CreateBooking

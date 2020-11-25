import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Table, PageHeader, Button, Spin, Tooltip, Row, Form, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import 'antd/dist/antd.css';
import '../../Assets/container/StudentList.css'
import { findStudentListByFirstNameAndLastName, getStudentListByDate, deleteStudentBooking, editSubject, assignStudentToAnotherTeacher } from '../../services/Student'
import { findTeacherListByFirstNameAndLastName } from '../../services/Teacher'
import SearchFilter from '../../components/StudentList/SearchFilter'
import { assignStudents } from '../../Action-Reducer/Student/action'
import Moment from 'react-moment';
import { VerticalAlignBottomOutlined, VerticalAlignTopOutlined } from "@ant-design/icons"
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
    { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 }
]

function StudentList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [studentList, setStudentList] = useState();
    const [loadingTeacher, setLoadingTeacher] = useState(false);
    const [teacherList, setTeacherList] = useState([]);
    const [open, setOpen] = useState(false);
    const [sortingName, setSortingName] = useState("");
    const [teacherName, setTeacherName] = useState("");
    const [sortingType, setSortingType] = useState("");
    const deletingStatus = useSelector((state) => {
      return state.Student.enableDeleting;
    })
    const [tableProps, setTableProps] = useState({
        totalCount: 0,
        pageIndex: 0,
        pageSize: 30,
    });
    const [search, setSearch] = useState({
        name: "",
        firstName: "",
        lastName: "",
    })

    const [teacherSearch, setTeacherSearch] = useState({
        name:"",
        firstName:"",
        lastName:"",
    })

    const [selectedRow, setSelectedRow] = useState([]);
    const [editableRow, setEditableRow] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editTeacher, setEditTeacher] = useState([]);

    const rowSelection = {
        selectedRow,
        onChange: (selectedrow, records) => {
            console.log('selectedRowKeys changed: ', records);
            var recordIdArray = [];
            records.map(record => {
                recordIdArray.push({ id: record.id, firstName: record.firstName, lastName: record.lastName })
            })
            setSelectedRow(recordIdArray);
            dispatch(assignStudents(recordIdArray))
        }
    };

    const columns = [
        {
            title: <div><span>Name </span>
                {sortingName === "firstName" && sortingType === "asc" && <VerticalAlignBottomOutlined />}
                {sortingName === "firstName" && sortingType === "desc" && <VerticalAlignTopOutlined />}
                {sortingName === "firstName" && sortingType === "" && ""}
            </div>,
            onHeaderCell: (column) => {
                return {
                    onClick: () => {
                        setSortingName("firstName");
                        if (sortingType == "") { setSortingType("asc") }
                        else if (sortingType == "asc") { setSortingType("desc") }
                        else if (sortingType == "desc") { setSortingType(""); setSortingName(""); }
                    }
                };
            },
            render: (record) => <Tooltip title={(record.studentProfile.firstName + " " + record.studentProfile.lastName)}>
                <Button
                    style={{backgroundColor:"transparent",border:"0px", cursor: 'pointer'}}
                    onClick={(e) => {
                        e.stopPropagation();
                        history.push(`/studentlist/studentDetail/${record.id}`)
                    }}>
                        {(record.studentProfile.firstName + " " + record.studentProfile.lastName).length <= 20 ? 
                            record.studentProfile.firstName + " " + record.studentProfile.lastName : 
                            (record.studentProfile.firstName + " " + record.studentProfile.lastName).substring(0, 19)+'...'}
                </Button>
            </Tooltip>,
            key: 'name',
            fixed: 'left',
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
                        else if (sortingType == "desc") { setSortingType(""); setSortingName(""); }
                    }
                };
            },
            render: (record) => (
                <div>
                    {
                        <Moment format="D MMM YYYY HH:MM" withTitle>
                            { record.startDate }
                        </Moment>
                    }
                </div>
            ),
            key: 'startDate',
        },
        {
            title: <div><span>Subject </span>
                {sortingName === "studentProfile.subject" && sortingType === "asc" && <VerticalAlignBottomOutlined />}
                {sortingName === "studentProfile.subject" && sortingType === "desc" && <VerticalAlignTopOutlined />}
                {sortingName === "studentProfile.subject" && sortingType === "" && ""}
            </div>,
            onHeaderCell: (column) => {
                return {
                    onClick: () => {
                        setSortingName("studentProfile.subject");
                        if (sortingType == "") { setSortingType("asc") }
                        else if (sortingType == "asc") { setSortingType("desc") }
                        else if (sortingType == "desc") { setSortingType(""); setSortingName(""); }
                    }
                };
            },
            render: (record) => {
                return (
                    <div onDoubleClick={() => {
                        if(!editableRow.includes(record)) {
                            setEditableRow([...editableRow, record]);
                        } else {
                            setEditableRow(editableRow.filter(r => r.id !== record.id));
                        }
                    }}>
                        { !editableRow.includes(record) ? record.subject : <Form layout="inline">
                                    <Form.Item>
                                        <Input
                                            type="text"
                                            placeholder="Subject"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    editSubject(record.id, e.target.value).then(data => {
                                                        setEditableRow(editableRow.filter(r => r.id !== record.id));
                                                        getListView();
                                                    })
                                                }
                                            }}
                                        />
                                    </Form.Item>
                                </Form> }
                    </div>
                )
            },
            key: 'subject',
        }
        ,
        {
            title: <div><span>Grade </span>
                {sortingName === "studentProfile.grade" && sortingType === "asc" && <VerticalAlignBottomOutlined />}
                {sortingName === "studentProfile.grade" && sortingType === "desc" && <VerticalAlignTopOutlined />}
                {sortingName === "studentProfile.grade" && sortingType === "" && ""}
            </div>,
            onHeaderCell: (column) => {
                return {
                    onClick: () => {
                        setSortingName("studentProfile.grade");
                        if (sortingType == "") { setSortingType("asc") }
                        else if (sortingType == "asc") { setSortingType("desc") }
                        else if (sortingType == "desc") { setSortingType(""); setSortingName(""); }
                    }
                };
            },
            render: (record) => {
                var min = record.teacherAvailability ? record.teacherAvailability.teacherProfile ? record.teacherAvailability.teacherProfile.grades[0] : 0 : 0;
                return (
                    <span>{computeMinGrade(min, record.teacherAvailability ? record.teacherAvailability.teacherProfile : null, record.studentProfile.grade) > 0 ? `${record.studentProfile.grade} (${computeMinGrade(min, record.teacherAvailability ? record.teacherAvailability.teacherProfile : null, record.studentProfile.grade)})` : record.studentProfile.grade}</span>
                )
            },
            key: 'grade',
        }
        ,
        {
            title: 'Teacher Name',
            title: <div><span>Teacher Name </span>
                {sortingName === "teacherAvailability.teacherProfile.firstName" && sortingType === "asc" && <VerticalAlignBottomOutlined />}
                {sortingName === "teacherAvailability.teacherProfile.firstName" && sortingType === "desc" && <VerticalAlignTopOutlined />}
                {sortingName === "teacherAvailability.teacherProfile.firstName" && sortingType === "" && ""}
            </div>,
            onHeaderCell: (column) => {
                return {
                    onClick: () => {
                        setSortingName("teacherAvailability.teacherProfile.firstName");
                        if (sortingType == "") { setSortingType("asc") }
                        else if (sortingType == "asc") { setSortingType("desc") }
                        else if (sortingType == "desc") { setSortingType(""); setSortingName(""); }
                    }
                };
            },
            render: (record) => {
                var isSubjectContains = record.teacherAvailability ? record.teacherAvailability.teacherProfile ? record.teacherAvailability.teacherProfile.subjects.includes(record.subject) : false : false;
                const text = <div className="grade-coloumn-tooltip">
                    <h4>Details :</h4>
                    <Row>Subjects : {record.teacherAvailability ? record.teacherAvailability.teacherProfile ? record.teacherAvailability.teacherProfile.subjects.join(', ') : "Nothing" : "Nothing"}</Row>
                    <Row>Grades : {record.teacherAvailability ? record.teacherAvailability.teacherProfile ? record.teacherAvailability.teacherProfile.grades.join(', ') : "Nothing" : "Nothing"}</Row>
                </div>
                return (
                    <Tooltip placement="topLeft" title={text} color={"white"}>
                        <div onClick={(e) => {
                            //e.stopPropagation();
                            if (record.teacherAvailability) 
                                if(record.teacherAvailability.teacherProfile)
                                    history.push(`/studentlist/teacher/${record.teacherAvailability.id}`, { teacher: record.teacherAvailability })
                        }} style={{ cursor: 'pointer', color: isSubjectContains ? 'black': 'orange' }}>
                            {record.teacherAvailability ? record.teacherAvailability.teacherProfile ? record.teacherAvailability.teacherProfile.firstName + " " + record.teacherAvailability.teacherProfile.lastName + " (" + record.teacherAvailability.studentCount + ")" : "No teacher found" : "No teacher found"}
                        </div>
                    </Tooltip>
                )
            },
            key: 'studentCount',
        },
        {
            title: 'Action',
            key: 'operation',
            render: (record) => 
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    {
                        !editTeacher.includes(record) ?
                        <Tooltip title={record.studentProfile ? record.studentProfile.conferenceUrl ? record.studentProfile.conferenceUrl  : "Link Not Found": "Student Not Found"}>
                            <Button
                                style={{backgroundColor:"transparent",border:"0px",color:"#1890FF"}}
                                onClick={(e) => {
                                    //e.stopPropagation();
                                    if (record.studentProfile) 
                                            if(record.studentProfile.conferenceUrl)
                                                window.open(record.studentProfile.conferenceUrl.includes('http') ? record.studentProfile.conferenceUrl : 'http://'+record.studentProfile.conferenceUrl)
                                }}><u>Google Meet</u></Button>
                        </Tooltip>:
                        <Autocomplete
                            id="asynchronous-demo"
                            options={teacherList}
                            size="small"
                            inputValue={teacherName}
                            onInputChange={(__, newInputValue) => {
                                setTeacherName(newInputValue);
                            }}
                            loading={loadingTeacher}
                            getOptionLabel={(record) => record.teacherProfile.firstName + " " + record.teacherProfile.lastName}
                            style={{ width: 300}}
                            renderInput={(params) => <TextField {...params} 
                                                        label="Select a teacher to assign" 
                                                        variant="outlined" 
                                                        onChange={changeTeacherSearch}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                let teachers = teacherList.filter(t => t.teacherProfile.firstName + " " + t.teacherProfile.lastName == teacherName);
                                                                if(teachers.length === 0) {
                                                                    alert('This teacher is not found');
                                                                } else {
                                                                    assigningStudents(teachers[0], record.id);
                                                                }
                                                            }
                                                        }} 
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            endAdornment: (
                                                              <React.Fragment>
                                                                {loadingTeacher ? <CircularProgress color="inherit" size={20} /> : null}
                                                                {params.InputProps.endAdornment}
                                                              </React.Fragment>
                                                            ),
                                                          }}
                                                        />}
                        />
                    }
                    {
                        !editTeacher.includes(record) ?
                        <Button onClick={(e) => setEditTeacher([...editTeacher, record])}>Assign to a teacher</Button>:
                        <Button style={{ marginLeft: 30 }} onClick={(e) => setEditTeacher(editTeacher.filter(r => r.id !== record.id))}>Cancel</Button>
                    }
                </div>,
        },
    ];

    useEffect(() => {
        getListView();
    }, [tableProps.pageIndex]);
    useEffect(() => {
        getListView();
    }, [sortingType, sortingName]);

    const computeLastName = (name) => {
        let lastName = '';
        for (let index = 1; index < name.length; index++) {
            lastName = lastName.trim() +' '+name[index].trim();
        }
        return lastName
    }

    const getTeacherListView = () => {
        setLoadingTeacher(true);
        findTeacherListByFirstNameAndLastName(teacherSearch.firstName.trim(), localStorage.getItem('toStart'), localStorage.getItem('toEnd'), 0, 500, sortingName, sortingType).then(data => {
            if(data) {
                if(data.content) {
                    setTeacherList(data.content)
                } else {
                    setTeacherList([])
                }
            } else {
                setTeacherList([])
            }
        }).finally(() => setLoadingTeacher(false) );
    }

    const changeTeacherSearch = (e) => {
        const { name, value } = e.target;
        //setTeacherName(value);
        setTeacherSearch({ ...search, [name]: value.trim() });
        if(e.target.name==="name"){
            var nameData = value.trim().split(" ");
            if(nameData.length>1){
                setTeacherSearch({ ...search, firstName: nameData[0].trim(), lastName: computeLastName(nameData) });
            }
            else{
                setTeacherSearch({ ...search, firstName: nameData[0].trim(), lastName: nameData[0].trim() });
            }
        }
        getTeacherListView();
    };

    const computeMinGrade = (min, profile, grade) => {
        let i = 0;
        let result = min;
        if( profile == null ) {
            return 0;
        }

        for (i = 0; i < profile.grades.length; i++) {
            let gradeindex = Number(profile.grades[i]) - Number(grade.toString());
            gradeindex = Math.abs(gradeindex);
            if (gradeindex >= 0 && gradeindex < result) {
                result = gradeindex;
            }
        }
        return result < min ? result : min;
    }

    const deleteBooking = (selectedrow) => {
        if(selectedrow.length > 0) {
            let ids = selectedrow.reduce((a, b) => {
                return a+','+b.id;
            }, '')
            deleteStudentBooking(ids.substring(1)).then(data => {
                console.log(data);
                setSelectedRow([]);
                getListView();
            });
        } else {
            alert('Select at least one student');
        }
    }

    const getListView = () => {
        if (search.firstName === "" && search.lastName === "") {
            //getStudentList(tableProps.pageIndex, tableProps.pageSize, sortingName, sortingType).then(data => {
                getStudentListByDate(localStorage.getItem('toStart'), localStorage.getItem('toEnd'), tableProps.pageIndex, tableProps.pageSize, sortingName, sortingType).then(data => {
                console.log('DATA ==> ', data)
                if(data) {
                    if(data.content) {
                        setStudentList(data.content)
                        setTableProps({
                            ...tableProps,
                            totalCount: data.totalElements,
                            pageSize: 30,
                        });
                    } else {
                        setStudentList([])
                        setTableProps({
                            ...tableProps,
                            totalCount: 0,
                            pageSize: 30,
                        });
                    }
                } else {
                    setStudentList([])
                    setTableProps({
                        ...tableProps,
                        totalCount: 0,
                        pageSize: 30,
                    });
                }
                setLoading(false);
            })
        }
        else {
            findStudentListByFirstNameAndLastName(search.firstName.trim(), localStorage.getItem('toStart'), localStorage.getItem('toEnd'), tableProps.pageIndex, tableProps.pageSize, sortingName, sortingType).then(data => {
                console.log('DATA ==> ', data)
                if(data) {
                    if(data.content) {
                        setStudentList(data.content)
                        setTableProps({
                            ...tableProps,
                            totalCount: data.totalElements,
                            pageSize: 30,
                        });
                    } else {
                        setStudentList([])
                        setTableProps({
                            ...tableProps,
                            totalCount: 0,
                            pageSize: 30,
                        });
                    }
                } else {
                    setStudentList([])
                    setTableProps({
                        ...tableProps,
                        totalCount: 0,
                        pageSize: 30,
                    });
                }
                setLoading(false);
            })
        }
    }
    const changeSearch = (e) => {
        const { name, value } = e.target;
        setSearch({ ...search, [name]: value });
        if (e.target.name === "name") {
            var nameData = value.split(" ");
            if (nameData.length > 1) {
                setSearch({ ...search, firstName: nameData[0].trim(), lastName: computeLastName(nameData) });
            }
            else {
                setSearch({ ...search, firstName: nameData[0].trim(), lastName: nameData[0].trim() });
            }
        }
    };
    const searchList = () => {
        getListView();
    }

    const handleTableChange = (pagination, filters, sorter) => {
        setTableProps({
            ...tableProps,
            pageIndex: pagination.current-1,
            pageSize: pagination.pageSize,
        });
        setLoading(true);
        setStudentList([]);
    };

    const assigningStudents = (teacher, studentId) => {
        assignStudentToAnotherTeacher(teacher.id, studentId)
            .then(res => {
                getListView(); 
            }).finally(() => {
                setEditTeacher(editTeacher.filter(r => r.id !== studentId));
            })
    }

    return (
        <React.Fragment>
            
        {/* <LayoutOfApp> */}
        <PageHeader
            ghost={false}
            title={<p style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px'}}>Students</p>}
            extra={[
            ]}
        >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ display: 'flex', flex: 1 }}>
                    <SearchFilter
                        changeInput={changeSearch}
                        searchList={searchList}
                    />
                    <Button style={{ display: deletingStatus ? 'block' : 'none' }} onClick={() => deleteBooking(selectedRow)}> Supprimer </Button>
                </div>
            </div>
            
            {!studentList ? <Spin className="loading-table" /> :
                <Table
                    className="table-padding"
                    columns={columns}
                    loading={loading}
                    dataSource={studentList}
                    onChange={handleTableChange}
                    pagination={{
                        total: tableProps.totalCount,
                        pageSize: tableProps.pageSize,
                        showTotal: (total, range) => `${range[0]}-${range[1]} out of ${total}`,
                    }}
                    rowSelection={rowSelection}
                    rowKey="id"
                    // onRow={(record) => ({
                    //     onClick: () => (history.push(`/studentlist/studentDetail/${record.id}`))
                    // })}
                />}

        </PageHeader>
        {/* </LayoutOfApp> */}
        </React.Fragment>
    )
}
export default StudentList

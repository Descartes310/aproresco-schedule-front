import 'antd/dist/antd.css';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../../Assets/container/StudentList.css';
import React, { useEffect, useState } from 'react';
import { getCourses } from '../../services/Teacher';
import { Table, PageHeader, Button, Spin } from 'antd';
import SearchFilter from '../../components/StudentList/SearchFilter';
import { findScheduleByGrade, getScheduleByDate, deleteSchedule } from '../../services/Student'
import { VerticalAlignBottomOutlined, VerticalAlignTopOutlined, PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons"

function Schedule() {
    const history = useHistory();
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState(null);
    const [grades, setGrades] = useState("");
    const [schedules, setSchedules] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [sortingType, setSortingType] = useState("desc");
    const [sortingName, setSortingName] = useState("createDate");
    const [advanceSchedule] = useState(false);

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

    const [loading, setLoading] = useState(false);

    const rowSelection = {
        selectedRow,
        onChange: (selectedrow, records) => {
            console.log('selectedRowKeys changed: ', records);
            setSelectedRow(records);
        }
    };

    const deleteRows = () => {
        let ids = [];
        selectedRow.forEach(r => ids.push(r.id));
        console.log(ids.join(','));
        deleteSchedule(ids.join(',')).then(data => {
            getListView();
            setSelectedRow([]);
        })
    }

    useEffect(() => {
        //setAdvanceSchedule(JSON.parse(localStorage.getItem('advanceSchedule' + JSON.parse(localStorage.getItem("user")).id)));
    }, []);

    const getAllCourses = () => {
        getCourses().then(data => {
            if (data) {
                if (data.content) {
                    setCourses(data.content);
                }
            }
        })
    }

    let columns = [

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
                let course = record.course;
                return (
                    <div>
                        {course ? course.subject ? course.subject.name : '' : ''}
                    </div>
                )
            },
            key: 'subject',
        },
        {
            title: 'Course',
            render: (record) => {
                let course = record.course;
                return (
                    <div>
                        {course ? course.name : '' }
                    </div>
                )
            },
            key: 'course',
        },
        {
            title: 'Grades',
            render: (record) => {
                let course = record.course;
                return (
                    <h4>{course.grades ? course.grades.join(', ') : 'No Grades'}</h4>
                )
            },
            key: 'grades',
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
                return (
                    <span>
                        <Moment local format="MM/DD/YYYY HH:mm" withTitle>
                            {record.startDate}
                        </Moment>
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
                return (
                    <span>
                        <Moment local format="MM/DD/YYYY HH:mm" withTitle>
                            {record.endDate}
                        </Moment>
                    </span>
                )
            },
            key: 'endDate',
        },
        {
            title: 'Duration',
            key: 'durationInMinutes',
            render: (record) => {
                let course = record.course;
                return (
                    <div>
                        {course ? course.durationInMinutes ? course.durationInMinutes + ' min' : '' : ''}
                    </div>
                )
            }
        },
        {
            title: 'Price',
            key: 'price',
            render: (record) => {
                let currency = record.currency ? record.currency : 'USD';
                return (
                    <div>
                        {record.price + ' ' + currency}
                    </div>
                )
            }
        },
        {
            title: 'Language',
            key: 'language',
            render: (record) => {
                let lang = record.language ? record.language : 'fr';
                return (
                    <div>
                        {lang}
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
            title: 'Grades',
            key: 'grades',
            render: (record) => {
                let course = record.course;
                return (
                    <div>
                        {gradesToPrint(course)}
                    </div>
                )
            }
        },
        {
            title: <div><span>Action </span>
            </div>,
            render: (record) => {
                return (
                    <div id="edit" onClick={(e) => { e.stopPropagation(); history.push(`/schedules/${record.id}/update`, { schedule: record }) }}><EditOutlined id="editIcon" style={{ fontSize: 20, marginLeft: 10, color: '#1890FF' }} /></div>
                )
            },
            key: 'action',
        }

    ];

    // Delete column if it's not advanced mode
    if (!advanceSchedule) {
        delete columns[2];
        delete columns[5];
        delete columns[6];
        delete columns[7];
    }

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

    useEffect(() => {
        getListView();
        getAllCourses();
    }, [sortingType, sortingName, tableProps.pageIndex, tableProps.pageSize]);

    const computeLastName = (name) => {
        let lastName = '';
        for (let index = 1; index < name.length; index++) {
            lastName = lastName.trim() + ' ' + name[index].trim();
        }
        return lastName
    }

    const getListView = () => {
        if (search.firstName === "" && search.lastName === "") {
            getScheduleByDate(grades, localStorage.getItem('toStart'), localStorage.getItem('toEnd'), tableProps.pageIndex, tableProps.pageSize, sortingName, sortingType, course).then(data => {
                if (data) {
                    if (data.content) {

                        data.content = data.content.sort(function (a, b) {
                            var dateA = new Date(a.createDate), dateB = new Date(b.createDate);
                            return dateB - dateA;
                        });
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
        else {
            findScheduleByGrade(grades, localStorage.getItem('toStart'), localStorage.getItem('toEnd'), tableProps.pageIndex, tableProps.pageSize, sortingName, sortingType, course).then(data => {
                if (data) {
                    if (data.content) {

                        data.content = data.content.sort(function(a, b) {
                            var dateA = new Date(a.createDate), dateB = new Date(b.createDate);
                            return dateB - dateA;
                        });

                        setSchedules([...new Map(data.content.map(item => [item['id'], item])).values()])
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

        if (e.target.name === "grades") {
            setGrades(value)
        }
    };

    const searchList = () => {
        getListView();
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
                title={<p style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>Schedules</p>}
                extra={[
                ]}
            >
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'flex', flex: 1 }}>
                        <SearchFilter
                            changeInput={changeSearch}
                            changeCourse={(courseId) => setCourse(courseId)}
                            searchList={searchList}
                            type='schedule'
                            courses={courses}
                        />
                    </div>

                    <div style={{ display: deletingStatus ? 'flex' : 'none', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <Button key='3' size="medium" type="danger" onClick={() => deleteRows()}>
                            <DeleteOutlined />
                        </Button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginLeft: '20px' }}>
                        <Button key='3' size="medium" type="primary" onClick={() => history.push('/schedules/add')}>
                            <PlusOutlined />
                        </Button>
                    </div>
                </div>

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

            </PageHeader>
        </div>
    )
}
export default Schedule

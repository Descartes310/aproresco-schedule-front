import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getCourses } from '../../services/Course';
import { Table, PageHeader, Button, Spin, Tooltip } from 'antd';
import SearchFilter from '../../components/Tag/SearchFilter';
import { VerticalAlignBottomOutlined, VerticalAlignTopOutlined, PlusOutlined } from "@ant-design/icons";

export default function SubjectsList() {

    const history = useHistory();
    const [courseList, setCourseList] = useState();

    const [sortingName, setSortingName] = useState("name");
    const [sortingType, setSortingType] = useState("desc");

    const [tableProps, setTableProps] = useState({
        totalCount: 0,
        pageIndex: 0,
        pageSize: 30,
    });

    const [search, setSearch] = useState({
        name: "",
        createDate: "",
    })

    const [loading, setLoading] = useState(false);

    const columns = [
        {
            title: <div><span>Name </span>
                {sortingName === "name" && sortingType === "asc" && <VerticalAlignBottomOutlined />}
                {sortingName === "name" && sortingType === "desc" && <VerticalAlignTopOutlined />}
                {sortingName === "name" && sortingType === "" && ""}
            </div>,
            onHeaderCell: (column) => {
                return {
                    onClick: () => {
                        setSortingName("name");
                        if (sortingType === "") { setSortingType("asc") }
                        else if (sortingType === "asc") { setSortingType("desc") }
                        else if (sortingType === "desc") { setSortingType("asc"); setSortingName("name"); }
                    }
                };
            },
            render: (record) => {
                return (
                    <div>
                        {record.name}
                    </div>
                )
            },
            key: 'name',
            fixed: 'left',
        },
        {
            title: <div><span>Language </span>
                {sortingName === "language" && sortingType === "asc" && <VerticalAlignBottomOutlined />}
                {sortingName === "language" && sortingType === "desc" && <VerticalAlignTopOutlined />}
                {sortingName === "language" && sortingType === "" && ""}
            </div>,
            onHeaderCell: (column) => {
                return {
                    onClick: () => {
                        setSortingName("language");
                        if (sortingType === "") { setSortingType("asc") }
                        else if (sortingType === "asc") { setSortingType("desc") }
                        else if (sortingType === "desc") { setSortingType("asc"); setSortingName("language"); }
                    }
                };
            },
            render: (record) => {
                return (
                    <div>
                        {record.language}
                    </div>
                )
            },
            key: 'language',
            fixed: 'left',
        },
        {
            title: <div><span>Grades </span>
            </div>,
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
            title: <div><span>Subjects </span>
            </div>,
            key: 'subjects',
            render: (record) => {
                return (
                    <div>
                        {record.subject ? record.subject.name : ''}
                    </div>
                )
            }
        }
    ]

    const handleTableChange = (pagination) => {
        setTableProps({
            ...tableProps,
            pageIndex: pagination.current - 1,
            pageSize: pagination.pageSize,
        });
        setLoading(true);
        setCourseList([]);
    };

    useEffect(() => {
        getListView();
    }, [sortingType, sortingName, tableProps.pageIndex]);

    const getListView = (name = '') => {
        getCourses(tableProps.pageIndex, tableProps.pageSize, sortingName, sortingType, name).then(data => {
            if (data) {
                if (data.content) {

                    data.content = data.content.sort(function(a, b) {
                        var dateA = new Date(a.createDate), dateB = new Date(b.createDate);
                        return dateB - dateA;
                    });

                    setCourseList([...new Map(data.content.map(item => [item['id'], item])).values()])
                    setTableProps({
                        ...tableProps,
                        totalCount: data.totalCount,
                        pageSize: 30,
                    });
                }
            } else {
                setCourseList([])
                setTableProps({
                    ...tableProps,
                    totalCount: 0,
                    pageSize: 30,
                });
            }
            setLoading(false);
        })
    }

    const searchList = () => {
        getListView();
    }

    const changeSearch = (e) => {
        const { name, value } = e.target;
        setSearch({ ...search, [name]: value });
        getListView(value);
    }

    const gradesToPrint = (profile) => {
        let i = 0;
        let result = '';
        if (profile == null) {
            return '';
        }

        if (!profile.grades) {
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
        <React.Fragment>
            <PageHeader
                ghost={false}
                title={<p style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>Courses</p>}
                extra={[
                ]}
            >
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'flex', flex: 1 }}>
                        <SearchFilter
                            changeInput={changeSearch}
                            searchList={searchList}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', position: 'absolute', right: '40px' }}>
                        <Button key='3' size="medium" type="primary" onClick={() => history.push('/courses/add')}>
                            <PlusOutlined />
                        </Button>
                    </div>
                </div>
                {
                    !courseList ?
                        <Spin className="loading-table" />
                        :
                        <Table
                            className="table-padding"
                            columns={columns}
                            style={{ marginTop: '30px' }}
                            loading={loading}
                            dataSource={courseList}
                            onChange={handleTableChange}
                            pagination={{
                                total: tableProps.totalCount,
                                pageSize: tableProps.pageSize,
                                showTotal: (total, range) => `${range[0]}-${range[1]} out of ${total}`,
                            }}
                            rowKey="id"
                        />
                }

            </PageHeader>
        </React.Fragment>
    )
}

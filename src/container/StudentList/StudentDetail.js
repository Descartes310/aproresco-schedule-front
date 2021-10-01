import Moment from 'react-moment';
import { Form, Input } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { Row, Col, PageHeader, Button, Card } from 'antd';
import { useLocation, useHistory } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { assignStudentToAnotherTeacher, getStudentDetail, getBooking, getBookingAvailability, getStudentProfileById, getParentById, getStudentListByDate } from '../../services/Student';
import { createComment, updateComment, approveComment, getCourses, getTeacherProfileById, getScheduleById, getBookingComments } from '../../services/Teacher';

function StudentDetail(props) {

    const history = useHistory();
    const { params } = props.match;
    const [content, setContent] = useState('');
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState(null);
    const [teacher, setTeacher] = useState(null);
    const [availability, setAvailability] = useState(null);
    const [parent, setParent] = useState(null);
    const [comments, setComments] = useState([]);
    const [studentDetail, setStudentDetail] = useState(null);

    useEffect(() => {
        getStudentDetailsById();
    }, []);

    useEffect(() => {
        if (studentDetail) { 
            getComments();
            getAllCourses();
            getAvailability();

            getParentById(studentDetail.studentProfile.studentParentId).then(parent => {
                setParent(parent)
            });

            getScheduleById(studentDetail.schedule.id).then(schedule => {
                if (schedule) {
                    let tmpStudent = studentDetail;
                    tmpStudent.schedule = schedule;
                    setStudentDetail(tmpStudent);
                }
            })
        }
    }, [studentDetail]);

    const getStudentDetailsById = () => {
        getBooking(props.match.params.id).then(student => {
            setStudentDetail(student);
        });
    }

    const getAllCourses = () => {
        getCourses().then(data => {
            if (data) {
                if (data.content) {
                    setCourses(data.content);
                }
            }
        })
    }
    const getComments = () => {
        getBookingComments(studentDetail.id).then(data => {
            if (data) {
                if (data.content) {
                    setComments(data.content);
                }
            }
        })
    }

    const getAvailability = () => {
        getBookingAvailability(props.match.params.id).then(data => {
            if (data.length > 0) {
                let tmp = data[0];
                tmp.parent = studentDetail.parent;
                tmp.schedule = studentDetail.schedule;
                tmp.studentProfile = studentDetail.studentProfile;
                setAvailability(tmp.teacherAvailability);

                getTeacherProfileById(tmp.teacherAvailability.teacherProfile.id).then(teacher => {
                    if (teacher) {
                        setTeacher(teacher);
                    }
                });
                // setStudentDetail(tmp);
            }
        }).finally(() => setLoading(false))
    }

    const getDetailView = () => {
        getStudentDetail(params.id).then(data => {
            setStudentDetail(data)
            history.push(`/studentlist/studentDetail/${data.id}`)
        })
    }

    const handleSubmit = () => {
        if (comment == null) {
            createComment(studentDetail, content, parent).then(data => {
                // history.push('/studentlist')
                setContent('');
                getComments();
            })
        } else {
            updateComment(comment.id, content).then(data => {
                // history.push('/studentlist')
                getComments();
            })
        }
    }

    const handleApproval = (c) => {
        approveComment(c).then(data => {
            // history.push('/studentlist')
            getComments();
        })
    }

    const handleComment = (comment) => {
        setComment(comment);
        setContent(comment.content)
    }

    const rejectStudent = () => {
        assignStudentToAnotherTeacher(null, studentDetail.id)
            .then(res => {
                getDetailView();
                //window.location.reload();
            })
    };

    return (
        <div>
            {studentDetail ?
                <PageHeader
                    ghost={false}
                    title={<p style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>{studentDetail.studentProfile.firstName} {studentDetail.studentProfile.lastName}</p>}
                    extra={[
                        <div style={{ display: 'flex' }}>
                            <Button key='3' type="primary"
                                style={{ display: 'flex' }}
                                onClick={(e) => { e.stopPropagation(); history.push(`/studentlist/${studentDetail.id}/update`, { student: studentDetail }) }}
                            >
                                Edit
                            </Button>
                            <Button key='4' type="primary"
                                style={{ display: studentDetail.teacherAvailability ? 'block' : 'none' }}
                                onClick={() => {
                                    rejectStudent()
                                }}
                            >
                                REJECT STUDENT
                            </Button>
                        </div>
                    ]}
                >
                    <Row gutter={24} style={{ marginBottom: '3%' }}>
                        <Card title="Student informations" hoverable={true} bordered={true} style={{ width: "48%", marginLeft: '2%' }}>
                            <Row gutter={16}>
                                <Col className="gutter-row" span={8}>
                                    <h4>Period</h4>
                                </Col>
                                <Col className="gutter-row" span={14}>
                                    <h4 >
                                        <Moment local format="D MMM YYYY HH:MM" withTitle>
                                            { studentDetail.schedule ? studentDetail.schedule.startDate : '' }
                                        </Moment>
                                    </h4>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col className="gutter-row" span={8}>
                                    <h4 >Subject</h4>
                                </Col>
                                <Col className="gutter-row" span={14}>
                                    <h4 >{studentDetail.schedule.course ? studentDetail.schedule.course.name : '' }</h4>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col className="gutter-row" span={8}>
                                    <h4>Grade</h4>
                                </Col>
                                <Col className="gutter-row" span={14}>
                                    <h4 >{studentDetail.studentProfile.grade ? studentDetail.studentProfile.grade : 0}</h4>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col className="gutter-row" span={8}>
                                    <h4 >Email</h4>
                                </Col>
                                <Col className="gutter-row" span={14}>
                                    <h4 >{studentDetail.studentProfile.email}</h4>
                                </Col>
                            </Row><Row gutter={16}>
                                <Col className="gutter-row" span={8}>
                                    <h4>Parent Email</h4>
                                </Col>
                                <Col className="gutter-row" span={14}>
                                    <h4 >{parent ? parent.email : ''}</h4>
                                </Col>
                            </Row>
                            <Row gutter={16} style={{ display: studentDetail.conferenceUrl ? 'visible' : 'none' }}>
                                <Col className="gutter-row" span={8}>
                                    <h4 >Booking URL</h4>
                                </Col>
                                <Col className="gutter-row" span={14}>
                                    <h4 onClick={() => window.open(studentDetail.conferenceUrl ? studentDetail.conferenceUrl.includes('http') ? studentDetail.conferenceUrl : 'http://' + studentDetail.conferenceUrl : '')}>{studentDetail.conferenceUrl}</h4>
                                </Col>
                            </Row>
                            <Row gutter={16} style={{ display: studentDetail.studentProfile.conferenceUrl ? 'visible' : 'none' }}>
                                <Col className="gutter-row" span={8}>
                                    <h4 >Student URL</h4>
                                </Col>
                                <Col className="gutter-row" span={14}>
                                    <h4 onClick={() => window.open(studentDetail ? studentDetail.studentProfile.conferenceUrl.includes('http') ? studentDetail.studentProfile.conferenceUrl : 'http://' + studentDetail.studentProfile.conferenceUrl : '')}>{studentDetail.studentProfile ? studentDetail.studentProfile.conferenceUrl : ''}</h4>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col className="gutter-row" span={8}>
                                    <h4>Phone</h4>
                                </Col>
                                <Col className="gutter-row" span={14}>
                                    <h4 >{parent ? parent.phoneNumber : ''}</h4>
                                </Col>
                            </Row>

                            <Row gutter={16} style={{ display: studentDetail.effectiveStartDate ? 'flex' : 'none' }}>
                                <Col className="gutter-row" span={8}>
                                    <h4>Effective Start Date</h4>
                                </Col>
                                <Col className="gutter-row" span={14}>
                                    <h4 >{studentDetail.effectiveStartDate ?
                                        <Moment local format="D MMM YYYY HH:MM" withTitle>
                                            {studentDetail.effectiveStartDate}
                                        </Moment> :
                                        'Undefined'}
                                    </h4>
                                </Col>
                            </Row>

                            <Row gutter={16} style={{ display: studentDetail.rejectDate ? 'flex' : 'none' }}>
                                <Col className="gutter-row" span={8}>
                                    <h4>Rejection Date</h4>
                                </Col>
                                <Col className="gutter-row" span={14}>
                                    <h4 >{studentDetail.rejectDate ?
                                        <Moment local format="D MMM YYYY HH:MM" withTitle>
                                            {studentDetail.rejectDate}
                                        </Moment> :
                                        'Undefined'}
                                    </h4>
                                </Col>
                            </Row>

                            <Row gutter={16} style={{ display: studentDetail.teacherAssignedDate ? 'flex' : 'none' }}>
                                <Col className="gutter-row" span={8}>
                                    <h4>Teacher Assigned Date</h4>
                                </Col>
                                <Col className="gutter-row" span={14}>
                                    <h4 >{studentDetail.teacherAssignedDate ?
                                        <Moment local format="D MMM YYYY HH:MM" withTitle>
                                            {studentDetail.teacherAssignedDate}
                                        </Moment> :
                                        'Undefined'}
                                    </h4>
                                </Col>
                            </Row>
                        </Card>

                        <Card title="Teacher informations" hoverable={true} bordered={true} style={{ width: "48%", marginLeft: '2%' }}>
                            <Row gutter={16} style={{ display: availability ? availability.teacherProfile ? 'flex' : 'none' : 'none' }}>
                                <Col className="gutter-row" span={8}>
                                    <h4>Name</h4>
                                </Col>
                                <Col className="gutter-row" span={14}>
                                    <h4 >{availability ? availability.teacherProfile ? availability.teacherProfile.firstName : '' : ''} {availability ? availability.teacherProfile ? availability.teacherProfile.lastName : '' : ''}</h4>
                                </Col>
                            </Row>
                            <Row gutter={16} style={{ display: availability ? availability.teacherProfile ? 'flex' : 'none' : 'none' }}>
                                <Col className="gutter-row" span={8}>
                                    <h4>Subjects</h4>
                                </Col>
                                <Col className="gutter-row" span={14}>
                                    <h4 >{teacher ? teacher.subjects ? teacher.subjects.map(s => s.name).join(', ') : '' : ''}</h4>
                                </Col>
                            </Row>
                            <Row gutter={16} style={{ display: availability ? availability.teacherProfile ? 'flex' : 'none' : 'none' }}>
                                <Col className="gutter-row" span={8}>
                                    <h4 >Grades</h4>
                                </Col>
                                <Col className="gutter-row" span={14}>
                                    <h4 >{teacher ? teacher.grades ? teacher.grades.join(', ') : '' : ''}</h4>
                                </Col>
                            </Row>
                            <Row gutter={16} style={{ display: availability ? availability.teacherProfile ? 'flex' : 'none' : 'none' }}>
                                <Col className="gutter-row" span={8}>
                                    <h4>ConferenceUrl</h4>
                                </Col>
                                <Col className="gutter-row" span={14}>
                                    <h4 onClick={() => availability ?
                                        availability.teacherProfile ?
                                            window.open(availability.teacherProfile.conferenceUrl.includes('http') ? availability.teacherProfile.conferenceUrl : 'http://' + availability.teacherProfile.conferenceUrl) : null : null}>{availability ? availability.teacherProfile ? availability.teacherProfile.conferenceUrl : '' : ''}</h4>
                                </Col>
                            </Row>
                            <Row gutter={16} style={{ display: availability ? availability.teacherProfile ? 'flex' : 'none' : 'none' }}>
                                <Col className="gutter-row" span={8}>
                                    <h4 >Email</h4>
                                </Col>
                                <Col className="gutter-row" span={14}>
                                    <h4 >{teacher ? teacher.email : ''}</h4>
                                </Col>
                            </Row>
                            <Row gutter={16} style={{ display: availability ? availability.teacherProfile ? 'flex' : 'none' : 'none' }}>
                                <Col className="gutter-row" span={8}>
                                    <h4>Phone</h4>
                                </Col>
                                <Col className="gutter-row" span={14}>
                                    <h4 >{availability ? availability.teacherProfile ? availability.teacherProfile.phoneNumber : '' : ''}</h4>
                                </Col>
                            </Row>
                            <Row gutter={16} style={{ display: availability ? 'flex' : 'none' }}>
                                <Col className="gutter-row" span={8}>
                                    <h4 >Comment</h4>
                                </Col>
                                <Col className="gutter-row" span={14}>
                                    <h4 >{availability ? availability.studentCount : ''}</h4>
                                </Col>
                            </Row>
                        </Card>
                    </Row>

                    {/* <Row gutter={24} style={{ marginBottom: '3%' }}>
                        <Card title="Send a message" hoverable={true} bordered={true} style={{ width: "100%", marginLeft: '2%' }}>
                            <Row gutter={16}>
                                <Form.Item label="Message" required style={{ flex: 1, marginRight: '10px' }}>
                                    <Input type="text" name="message" onChange={handleChange} />
                                </Form.Item>

                                <Form.Item>
                                    <Button disabled={submitting} type="primary" size="medium" htmlType="submit" onClick={() => handleSubmitSendMessage()}>
                                        {
                                            submitting ? 'Loading...' : 'SEND'
                                        }
                                    </Button>
                                </Form.Item>
                            </Row>
                        </Card>
                    </Row> */}

                    <Row gutter={24} style={{ marginBottom: '3%' }}>
                        <Card title="Feedback section" hoverable={true} bordered={true} style={{ width: "100%", marginLeft: '2%' }}>
                            <Row gutter={16}>
                                <Form.Item label={comment ? "Message (press escape to create)" : "Message"} required style={{ flex: 1, marginRight: '10px' }}>
                                    <Input.TextArea rows={4} type="text" name="content" value={content} onChange={(e) => setContent(e.target.value)} onKeyUp={(e) => {
                                        if (e.key === 'Escape') {
                                            setComment(null);
                                            setContent('')
                                        }
                                    }} />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" size="medium" htmlType="submit" onClick={() => handleSubmit()}>
                                        {comment ? 'Update comment' : 'Add comment'}
                                    </Button>
                                </Form.Item>
                            </Row>
                            {comments ?
                                comments.map(c => (
                                    <>
                                        <Row gutter={16} style={{ height: 50 }}>
                                            <Col className="gutter-row" style={{ width: '90%' }} onClick={() => handleComment(c)}>
                                                <h4>{c.content ? c.content : 'No message found in this feedback'}</h4>
                                            </Col>
                                            <Col className="gutter-row" style={{ width: '10%' }} onClick={() => handleApproval(c)}>
                                                <CheckOutlined style={{ fontSize: '20px', marginRight: '20px', color: c.approver ? 'green' : 'gray' }} onClick={() => handleApproval(c)} />
                                            </Col>
                                        </Row>
                                    </>
                                ))
                                : null}

                        </Card>
                    </Row>
                </PageHeader> : null}
        </div>
    )
}

export default StudentDetail

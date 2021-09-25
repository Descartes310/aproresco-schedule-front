import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { SearchOutlined } from "@ant-design/icons";

const SearchFilter = ({ changeInput, searchList, type, enabled = false, courses, changeCourse }) => {

    const [formDate, setFormDate] = useState({
        startDate: localStorage.getItem('startDate') ?? "",
        endDate: localStorage.getItem('endDate') ?? "",
        startTime: localStorage.getItem('startTime') ?? "",
        endTime: localStorage.getItem('endTime') ?? "",
    });
    const [openCourse, setOpenCourse] = useState(false);

    const handleChange = (event, status) => {
        const { name, value, type } = event.target
        const labelDuration = status ? "Start" : "End";
        if (type === "date") {
            const duration = new Date(value)

            const toDurationStr = `${(duration.getMonth() + 1).toString().padStart(2, '0')}/${(duration.getDate()).toString().padStart(2, '0')}/${duration.getFullYear()} ${(duration.getHours()).toString().padStart(2, '0')}:${(duration.getMinutes()).toString().padStart(2, '0')}:00 -0500`
            //const toDurationStr = `${duration.getMonth()+1}/${duration.getDay()}/${duration.getFullYear()} ${duration.getHours()}:${duration.getMinutes()}:00 -0500`
            localStorage.setItem(`to${labelDuration}`, toDurationStr)
        } else if (type === "time") {
            let tmp = localStorage.getItem('toStart').split(' ');
            tmp[1] = value + tmp[1].substr(5, tmp[1].length);
            localStorage.setItem(`to${labelDuration}`, tmp.join(' '));
        }
        localStorage.setItem(`${labelDuration.toLocaleLowerCase()}${(type === "date") ? "Date" : "Time"}`, value)
        setFormDate({ ...formDate, [name]: value })
    }

    const onKeyEnter = (e) => {
        //alert("not enter")
        if (e.keyCode === 13) {
            searchList();
        }
    }
    return (
        <Form layout="inline" style={{ marginRight: '20px' }}>
            {
                type !== 'schedule' ?
                    <>
                        <Form.Item style={{ width: '180px' }}>
                            <Input
                                type="text"
                                placeholder="Enter Name"
                                name="name"
                                onKeyDown={onKeyEnter}
                                onChange={changeInput}
                            />
                        </Form.Item>

                    </>
                    :
                    <>
                        <Form.Item style={{ width: '180px' }}>
                            <Input
                                type="text"
                                placeholder="Grades"
                                name="grades"
                                onKeyDown={onKeyEnter}
                                onChange={changeInput}
                            />
                        </Form.Item>
                        <Form.Item
                            onClick={() => setOpenCourse(!openCourse)}>
                            <Select
                                open={openCourse}
                                onFocus={() => setOpenCourse(true)}
                                onBlur={() => setOpenCourse(false)}
                                style={{ width: '100%' }}
                                onSelect={() => setOpenCourse(false)}
                                placeholder="Please select course"
                                onChange={(e) => changeCourse(e)}
                            >
                                <Select.Option value={null}></Select.Option>
                                { courses.map(c => (
                                    <Select.Option value={c.id}>{c.name}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </>
            }
            <Form.Item style={{ width: '200px' }}>
                <Input
                    type='date'
                    placeholder="Min search date"
                    name="startDate"
                    value={formDate.startDate}
                    onChange={(event) => handleChange(event, true)}
                />
            </Form.Item>
            <Form.Item style={{ width: '170px' }}>
                <Input
                    type='time'
                    placeholder="Time"
                    name="startTime"
                    value={formDate.startTime}
                    onChange={(event) => handleChange(event, true)}
                />
            </Form.Item>
            <Form.Item style={{ width: '200px' }}>
                <Input
                    type='date'
                    placeholder="Max search date"
                    name="endDate"
                    value={formDate.endDate}
                    onChange={(event) => handleChange(event, false)}
                />
            </Form.Item>
            <Form.Item style={{ width: '170px' }}>
                <Input
                    type='time'
                    placeholder="Time"
                    name="endTime"
                    value={formDate.endTime}
                    onChange={(event) => handleChange(event, false)}
                />
            </Form.Item>


            <Button onClick={searchList} disabled={enabled} type="primary">
                <SearchOutlined />
            </Button>
        </Form>
    )
}

export default SearchFilter

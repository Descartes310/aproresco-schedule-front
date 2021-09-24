import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom';
import React, { useState, useReducer } from 'react';
import { createSubject } from '../../services/Course';
import { PageHeader, Form, Input, Button, Select } from 'antd';

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

const CreateSubject = () => {

    const history = useHistory();

    const [formData, setFormData] = useReducer(formReducer, {});
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);
    const [openLanguage, setOpenLanguage] = useState(false);
    const [language, setLanguage] = useState('EN');

    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    const handleChangeSelect = lang => {
        setLanguage(lang)
    }

    const handleSubmit = () => {
        if (formData.name && language) {
            if (formData.name.toString().length <= 0 || language.toString().length <= 0) {
                alert("Please, fill the name and language!");
                return
            }
        } else {
            alert("Please, fill the form!");
            return
        }
        setSubmitting(true)

        let data = {
            name: formData.name,
            language: language
        }

        createSubject(data).then(result => {
            history.push(`/subjects`)
        }).finally(() => setSubmitting(false));

    }

    return (
        <div>
            <PageHeader
                ghost={false}
                title={<p style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>Create Subject</p>}
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
                        <Form.Item label="Name" required style={{ flex: 1, marginRight: '40px' }}>
                            <Input type="text" name="name" onChange={handleChange} />
                        </Form.Item>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Form.Item label="Language" required style={{ flex: 1, marginRight: '10px' }}
                            onClick={() => setOpenLanguage(!openLanguage)}>
                            <Select
                                open={openLanguage}
                                defaultValue={language}
                                onFocus={() => setOpenLanguage(true)}
                                onBlur={() => setOpenLanguage(false)}
                                style={{ width: '100%' }}
                                onSelect={() => setOpenLanguage(false)}
                                placeholder="Please select language"
                                onChange={handleChangeSelect}
                            >
                                <Select.Option value={'EN'}>English</Select.Option>
                                <Select.Option value={'FR'}>French</Select.Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <Form.Item style={{ flex: 1, marginRight: '40px', marginTop: '20px' }}>
                        <Button disabled={submitting} type="primary" size="large" htmlType="submit">
                            {
                                submitting ? 'Loading...' : 'Create a subject'
                            }
                        </Button>
                    </Form.Item>
                </Form>
            </PageHeader>
        </div >
    )
}
export default CreateSubject;

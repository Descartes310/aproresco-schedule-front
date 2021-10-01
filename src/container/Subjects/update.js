import 'antd/dist/antd.css';
import React, { useState, useEffect } from 'react';
import { updateSubject } from '../../services/Course';
import { useHistory, useLocation } from 'react-router-dom';
import { PageHeader, Form, Input, Button, Select } from 'antd';

const UpdateSubject = () => {

    const history = useHistory();
    const location = useLocation();

    const [form] = Form.useForm();
    const [name, setName] = useState('');
    const [language, setLanguage] = useState('');
    const [subject] = useState(location.state.subject);
    const [submitting, setSubmitting] = useState(false);
    const [openLanguage, setOpenLanguage] = useState(false);

    useEffect(() => {
        setName(subject.name);
        setLanguage(subject.language);
    }, [subject])

    const handleChangeSelect = lang => {
        setLanguage(lang)
    }

    const handleSubmit = () => {
        if (name && language) {
            if (name.toString().length <= 0 || language.toString().length <= 0) {
                alert("Please, fill the name and language!");
                return
            }
        } else {
            alert("Please, fill the form!");
            return
        }
        setSubmitting(true)

        let data = {
            name: name,
            language: language
        }

        updateSubject(subject.id, data).then(result => {
            history.push(`/subjects`)
        }).finally(() => setSubmitting(false));

    }

    return (
        <div>
            <PageHeader
                ghost={false}
                title={<p style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>Update Subject</p>}
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
                            <Input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
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
                                value={language}
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
                                submitting ? 'Loading...' : 'Update a subject'
                            }
                        </Button>
                    </Form.Item>
                </Form>
            </PageHeader>
        </div >
    )
}
export default UpdateSubject;

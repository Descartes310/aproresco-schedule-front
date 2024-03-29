import './assets/css/global.css';
import './assets/css/custom.css';
import { Form, Input, Button } from 'antd'
import { useHistory } from 'react-router-dom';
import vector from './assets/images/logo.png';
import background from './assets/images/bg.jpg';
import React, { useEffect, useState } from 'react';
import { getLoginCode } from "../../services/Teacher";

function Login() {

  const history = useHistory();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    document.body.classList.add("img-bg");
    document.body.classList.add("min-height-full");
    if (window.location.pathname === '/login') {
      document.body.style.backgroundImage = `url(${background})`;
      document.getElementById('root').style.height = '100%';
      document.getElementsByClassName('ant-layout')[0].style.height = '100%';
      document.getElementsByClassName('childLayout')[0].style.background = 'rgba(255, 255, 255, 0)';
      document.getElementsByClassName('ant-layout')[0].style.background = 'rgba(255, 255, 255, 0)';
      document.getElementsByClassName('ant-layout')[1].style.height = '100%';
      document.getElementsByClassName('content-div')[0].style.height = '100%';
      document.getElementsByClassName('content-div')[0].style.backgroundColor = 'rgba(255, 255, 255, 0)';
    }
  }, []);

  const sendActivationCode = () => {
    setSubmitting(true);
    setError(false);
    getLoginCode(phoneNumber).then(teacher => {
      history.push('/login/code/'+phoneNumber);
    }).catch(err => {
      console.log(err);
      setError(true);
    })
    .finally(() => {
      setSubmitting(false);
    })
  }

  return (
    <section className="wrapper" style={{ height: '100%' }}>
      <header className="header" style={{ height: '100%' }}>
        <a className="header-logo" href=""><img src={vector} alt="" /></a>
      </header>
      <article className="loginBox min-height-full" style={{ height: '100%' }}>
        <div className="loginBox__inner">
          <h1 className="loginBox__title">Appui Scolaire de la Reussite</h1>
          <div className="loginBox__btn-wrapper" style={{ height: '100%' }}>
            <Form.Item>
              <Input
                type="text"
                name="name"
                value={phoneNumber}
                className="loginBox__btn"
                style={{ paddingLeft: '5%' }}
                placeholder="Enter your phone number"
                onChange={(e) => { setError(false); setPhoneNumber(e.target.value) }}
              />
            </Form.Item>
            <Button
              disabled={submitting}
              className="loginBox__btn"
              style={{ paddingBottom: '2.5rem' }}
              onClick={() => sendActivationCode()}
            >
              <span> {!submitting ? 'Get Activation Code' : 'Getting code...'}</span>
            </Button>
          </div>
        </div>
      </article>
      <footer className="footer">

        <div className="footer-copyright">
          <span>© 2013 - 2021 Aproresco</span>
          <a href="#">Terms and Services</a> |
            <a href="#">Privacy</a> |
            <a href="#">Contact Us</a>
        </div>
      </footer>
    </section>
  );
}

export default Login;
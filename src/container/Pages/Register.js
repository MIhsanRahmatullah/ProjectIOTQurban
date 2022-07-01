import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { Link } from 'react-router-dom';
import axios from '../api/axios'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9- ]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A_Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
  const { Title } = Typography;
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validpwd, setValidpwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(()=>{
    userRef.current.focus();
  }, [])

  useEffect(() =>{
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result)
  }, [user])

  useEffect(() =>{
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidName(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd])

  useEffect(()=>{
    setErrMsg('');
  }, [user, pwd, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      {success ? (
        <Form>
          <Title>
            Success!
          </Title>
          <a href='./login'>go to login</a>
        </Form>
        
      ) : (
    <Form
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ textAlign: 'center' }}
    >

      <Title 
        level={2}
      >
        Register Page
      </Title>
      
      <Form.Item
        label="Username"
        name="username"
        htmlFor='username'
        style={{padding: '0px 50px 0px 50px'}}
        rules={[
          {
            required: true,
            message: 'Create your oun username!',
          },
        ]}
      >
        <Input 
          type='text'
          id='username'
          ref={userRef}
          autocomplete='off'
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
          aria-invalid={validName ? 'false' : 'true'}
          aria-describedby='uidnote'
          onFocus={()=> setUserFocus(true)}
          onBlur={()=> setUserFocus(false)}
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        style={{padding: '0px 50px 0px 50px'}}
        rules={[
          {
            required: true,
            message: 'Create your own password!',
          },
        ]}
      >
        <Input.Password 
          type='password'
          id='password'
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          aria-invalid={validpwd ? 'false' : 'true'}
          aria-describedby='pwdnote'
          onFocus={()=> setPwdFocus(true)}
          onBlur={()=> setPwdFocus(false)}
        />
      </Form.Item>

      <Form.Item
        label="Confrim Password"
        name="ConfrimPassword"
        style={{padding: '0px 50px 0px 50px'}}
        rules={[
          {
            required: true,
            message: 'Create your own password!',
          },
        ]}
      >
        <Input.Password 
          type='password'
          id='confrim_pwd'
          onChange={(e) => setMatchPwd(e.target.value)}
          value={matchPwd}
          required
          aria-invalid={validMatch ? 'false' : 'true'}
          aria-describedby='confrimnote'
          onFocus={()=> setMatchFocus(true)}
          onBlur={()=> setMatchFocus(false)}
        />
      </Form.Item>

      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          onClick={handleSubmit}
        >
          Register
        </Button>
      </Form.Item>

      <Link to={'/login'}>
        go to login
      </Link>
      
    </Form>
      )}
      </>
  );
};

export default Register;
import { useRef, useState, useEffect, useContext } from 'react';
import { Button, Card, Checkbox, Form, Input, Typography } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';
import axios from '../api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
  const { Title } = Typography;
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errmsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() =>{
    userRef.current.focus();
  }, [])

  useEffect(()=>{
    setErrMsg('');
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({user, pwd}),
        {
          headers: { 'Content-Type': 'application/json'},
          withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setUser('');
      setPwd('');
      setSuccess(true);
    }catch (err){
      if (!err?.response){
        setErrMsg('No Server Response');
      } else if(err.response?.status === 400){
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401){
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
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
        <Form 
          style={{ textAlign: 'center'}}
        >
          <Title style={{ fontSize: 20}}>You are logged in!</Title>
          <a href='./'> go to dashboard </a>
        </Form>
      ) : ( 
    <Form
      name="basic"
      style={{ textAlign: 'center'}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      
      <Title 
        level={2} 
      >
        Login Page
      </Title>
      <Card>
        <Form.Item
        label="Username"
        name="username"
        htmlFor='username'
        style={{padding: '0px 50px 0px 50px'}}
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input 
          type='text'
          id='username'
          ref={userRef}
          autoComplete='off'
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
         />
      </Form.Item>

      <Form.Item
        label="Password"
        htmlFor='password'
        name="password"
        style={{padding: '0px 50px 0px 50px'}}
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password 
          type='password'
          id='password'
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
      </Form.Item>

      </Card>
      
      <Form.Item
        name="remember"
        valuePropName="checked"
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit"
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Form.Item>

      <Link to={'/register'}>
        don't have account register first
      </Link>
    
    </Form>
      )}
    </>
  );
};

export default Login;
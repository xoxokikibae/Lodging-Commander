import '../css/user/Auth.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, FormControl, Table, Alert, Col, Row, ButtonGroup, Form} from "react-bootstrap";
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import api from "../api";

const Auth = () => {
    const [inputs, setInputs] = useState({
        email: '',
        domain: 'naver.com',
        password: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is already authenticated
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/user/authSuccess')
        }
    }, [navigate]);

    const onChange = (e) => {
        let {name, value} = e.target;
        console.log(name, value)
        setInputs({
            ...inputs, [name]: value
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (inputs.email === '' || inputs.domain === '' || inputs.password === '') {
            setError('이메일과 비밀번호를 모두 입력해주세요.')
            return
        }

        try {
            const formData = new FormData()
            formData.append('email', `${inputs.email}@${inputs.domain}`)
            formData.append('password', inputs.password)

            const response = await api.post('/user/auth', formData);

            if (response.data.result === 'success') {
                localStorage.setItem('token', response.data.token)
                navigate('/user/authSuccess', {state: {userData: response.data}});
            } else {
                navigate('/user/authFail');
            }
        } catch (error) {
            setError('서버에 문제가 발생했습니다. 나중에 다시 시도하세요.');
        }
    };

    const onRegister = () => {
        navigate('/user/register');
    }

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await api.get('/user/checkUser', {
                    withCredentials: true
                })
                if (response.data) {
                    navigate('/', {state: {userData: response.data}})
                }
            } catch (error) {
                console.log('Not authenticated')
            }
        }

        checkAuthStatus()
    }, [navigate])

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={13} sm={10} md={6} lg={5}>
                    <form onSubmit={onSubmit}>
                        <Table striped hover bordered>
                            <thead>
                            <tr>
                                <td colSpan={2} className={"text-center"}><h3>로그인</h3></td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>이메일</td>
                                <td>
                                    <Form.Group as={Row} controlId='formEmail'>
                                        <Col xs={7}>
                                            <FormControl
                                                type='text'
                                                name='email'
                                                value={inputs.email}
                                                onChange={onChange}
                                                placeholder='이메일'
                                            />
                                        </Col>
                                        <Col xs={5}>
                                            <Form.Select name='domain' value={inputs.domain} onChange={onChange}>
                                                <option value='gmail.com'>gmail.com</option>
                                                <option value='naver.com'>naver.com</option>
                                                <option value='daum.net'>daum.net</option>
                                            </Form.Select>
                                        </Col>
                                    </Form.Group>
                                </td>
                            </tr>
                            <tr>
                                <td>비밀번호</td>
                                <td>
                                    <FormControl
                                        type={'password'}
                                        name={'password'}
                                        value={inputs.password}
                                        onChange={onChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} className={"text-center"}>
                                    <ButtonGroup className={"gap-2"}>
                                        <Button type={'submit'}>로그인</Button>
                                        <Button onClick={onRegister}>회원가입</Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                            {error && (
                                <tr>
                                    <td colSpan={2}>
                                        <Alert variant="danger">{error}</Alert>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

export default Auth;
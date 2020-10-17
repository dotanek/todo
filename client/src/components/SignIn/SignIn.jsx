import Axios from 'axios';
import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    //height: ${window.innerHeight + 'px'};
    height: 100vh;
    margin: 0;
    padding: 0;
    align-items: center;
    justify-content: center;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 30%;
    align-items: center;
    //border: 1px solid black;

    @media (max-width: 900px) {
        width: 80%;
    }

    @media (max-width: 700px) {
        width: 100%;
    }

    input {
        width: 80%;
        border-bottom: 2px solid rgba(0,0,0,0.2);
        font-size: 15px;
        padding: 2px 10px;
        margin-top: 10px;
        transition: 0.2s ease-in-out;
    }

    input:focus {
        border-bottom: 2px solid #114673; 
    }

    input:focus::placeholder {
        color: transparent;
    }

    input:hover {
        cursor: pointer;
        border-bottom: 2px solid #114673; 
    }
`

const Label = styled.div`
    width: 100%;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
`

const ErrorBox = styled.div`
    width: 80%;
    margin-top: 60px;
    font-size: 12px;
    color: #6C1010;
    text-align: center;
    min-height: 20px;
`

const InputUsername = styled.input``

const InputPassword = styled.input``

const ButtonSubmit = styled.button`
    width: calc(80% + 20px);
    padding: 8px 0px;;
    border-radius: 5px;
    border: 0;
    margin-top: 30px;
    background-color: #114673;
    color: #ffffff;
    font-size: 14px;
    font-weight: bold;
    transition: 0.2s ease-in-out;

    &:hover {
        cursor: pointer;
        background-color: #215683;
    }
`

class SignIn extends Component {
    state = {
        inputUsernameValue:'',
        inputPasswordValue:''
    }

    constructor(props) {
        super(props);
        this.inputUsernameRef = React.createRef();
        this.inputPasswordRef = React.createRef();
    }

    onChangeInputUsername = (e) => {
        this.setState({ inputUsernameValue:e.target.value });
    }

    onChangeInputPassword = (e) => {
        this.setState({ inputPasswordValue:e.target.value });
    }

    onClickButtonSubmit = async (e) => {
        e.preventDefault();

        if (this.state.inputUsernameValue === '') {
            return this.setState({
                error:'Username is empty.',
                inputUsernameValue:'',
                inputPasswordValue:''
            });
        }

        if (
            this.state.inputUsernameValue.length < 6 ||
            this.state.inputUsernameValue.length > 20
        ) {
            return this.setState({ error:'Username is incorrect.' });
        }

        if (this.state.inputPasswordValue === '') {
            return this.setState({
                error:'Password is empty.',
                inputUsernameValue:'',
                inputPasswordValue:''
            });
        }

        if (
            this.state.inputPasswordValue.length < 8 ||
            this.state.inputPasswordValue.length > 1024
        ) {
            return this.setState({
                error:'Password is incorrect.',
                inputUsernameValue:'',
                inputPasswordValue:''
            });
        }

        const userDetails = {
            username: this.state.inputUsernameValue,
            password: this.state.inputPasswordValue
        }

        axios.post('http://localhost:9000/api/user/sign-in', userDetails)
            .then(res => {
                localStorage.setItem('token',res.data);
                this.props.auth.signIn(() => {
                    this.props.history.push('/');
                });
            })
            .catch(e => {
                if (e.response) {
                    this.setState({ error:e.response.data });
                }
            })

        this.setState({
            inputUsernameValue:'',
            inputPasswordValue:''
        });

        this.inputUsernameRef.current.blur();
        this.inputPasswordRef.current.blur();
    }

    render() { 
        return (
            <Container>
                <Form>
                    <Label>Sing in</Label>
                    <InputUsername
                        placeholder='Username'
                        value={this.state.inputUsernameValue}
                        onChange={this.onChangeInputUsername}
                        ref={this.inputUsernameRef}
                    />
                    <InputPassword
                        placeholder='Password'
                        type='password'
                        value={this.state.inputPasswordValue}
                        onChange={this.onChangeInputPassword}
                        ref={this.inputPasswordRef}
                    />
                    <ButtonSubmit type='submit' onClick={this.onClickButtonSubmit}>Submit</ButtonSubmit>
                </Form>
                <ErrorBox>
                    {this.state.error}
                </ErrorBox>
            </Container>
        );
    }
}
 
export default SignIn;
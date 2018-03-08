import React, { Component } from 'react';
import axios from 'axios';
import './login.css';
import AppConst from "./AppConst";
import Events from "../Events";

class Login extends Component {
  baseURL = '';
  api = '/api/login';
  url = '';

  constructor() {
    super();
    // this.props = props;

    this.constants = new AppConst();
    this.baseURL = this.constants.baseURL;

    this.url = this.baseURL + this.api;

    let un = localStorage.getItem('username');
    let username = un === undefined ? '' : un;

    this.state = {
      username: username,
      email: '',
      password: ''
    };
  }

  usernameChange(name) {
    this.setState({username: name});
  }

  passwordChange(pass) {
    this.setState({password: pass});
  }

  handleSubmit(event) {
    this.requestData(this.postSuccess, this.postFail );
    event.preventDefault();
  }

  requestData(success, failure) {
    let context = this;
    axios
      .post(this.url, {
        UserName: this.state.username,
        UserPass: this.state.password
      }, {} )
      .then( (response) => {
        // Data is returned as an object including:
        // AuthResult, Name and Email
        let data = response.data.value;
        if ( data.AuthResult === 'authorized' ) {
          success(context, data);
        } else {
          failure();
        }
      })
      .catch( (err) => {
        failure();
      })

  }

  postSuccess(context, data) {

    function randomstring(len) {
      let r1 = Math.random().toString(35);
      let r2 = Math.random().toString(35);
      let r3 = (r1 + r2).substr(2,len);
      return r3;
    }

    let newid = randomstring(60);
    let oneDateinMS = 1000*60*60*24;
    let timeStamp = new Date( Date.now() + ( oneDateinMS * 30 ));
    let obj = {
      'token': newid,
      'ts': timeStamp
    };
    localStorage.setItem('token', JSON.stringify(obj));
    localStorage.setItem('username', context.state.username);
    localStorage.setItem('Name', data.Name );
    localStorage.setItem('Email', data.Email );

    console.log('Success');
    Events.notify(context.constants.MsgMenuUpdate , { } );
    context.props.history.push('/');
  }

  postFail() {

    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('Name');
    localStorage.removeItem('Email');

    console.log('Failure');
  }

  render() {
    return (
      <div className={'container top-margin-1em text-center'}>
        <form className={'form-signin'}
              onSubmit={ event =>  {
                this.handleSubmit(event);
              }} >
          <h1 className={'h3 mb-3 font-weight-normal'}>Please sign in</h1>
          <br />
          <input type={'text'} value={this.state.username}
                 id={'inputUser'}
                 className={'form-control'}
                 placeholder={'User Name'} required={true}
                 onChange={ event => {
                   this.usernameChange(event.target.value);
                 }}
          />
          <input type={'password'} value={this.state.password}
                 id={'inputPassword'}
                 className={'form-control'}
                 placeholder={'Password'}
                 required={true}
                  onChange={ event => {
                    this.passwordChange(event.target.value);
                  }}
          />
          <br />
          <button className={'btn btn-lg btn-primary btn-block'}
                  type={'submit'}>Sign in</button>
        </form>
      </div>
    );
  }
}

export default Login;


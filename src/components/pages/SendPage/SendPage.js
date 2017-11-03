import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {Button, FormControl, FormGroup} from 'react-bootstrap'

import {sendMessage} from '../../../actions/sendActionCreators'

class SendPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      to: '',
      subject: '',
      message: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const {to, subject, message} = this.state;
    this.props.sendMessage(to, subject, message);
    this.props.moveToHome();
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <FormGroup>
          <FormControl
            placeholder='Получатель'
            type='email'
            name='to'
            vale={this.state.to}
            onChange={this.onChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            placeholder='Тема'
            name='subject'
            value={this.state.subject}
            onChange={this.onChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            placeholder='Сообщение'
            name='message'
            value={this.state.message}
            onChange={this.onChange}
            componentClass='textarea'
            rows={10}
            required
          />
        </FormGroup>
        <FormGroup>
          <Button
            className='pull-right'
            bsStyle='primary'
            type='submit'
            disabled={this.props.isLoading}
          >
            Отправить
          </Button>
        </FormGroup>
      </form>
    );
  }
}

export default connect(
  state => ({
    isLoading: state.send.isLoading
  }),
  dispatch => ({
    sendMessage: (to, subject, message) => {
      dispatch(sendMessage(to, subject, message))
    },
    moveToHome: () => {
      dispatch(push('/'))
    }
  })
)(SendPage);
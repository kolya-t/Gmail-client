import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {Button, FormControl, FormGroup, ListGroup, ListGroupItem} from 'react-bootstrap'
import Dropzone from 'react-dropzone'

import {sendMessage} from '../../../actions/sendActionCreators'
import filesize from 'filesize'
import {PageWrapper} from "../PageWrapper";

class SendPage extends Component {

  constructor(props) {
    super(props);

    this.state = this.getInitialState();

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.removeAttachment = this.removeAttachment.bind(this);
  }

  getInitialState() {
    return {
      to: '',
      subject: '',
      message: '',
      attachments: [],
      dropzoneActive: false
    };
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const {to, subject, message, attachments} = this.state;
    this.props.sendMessage(to, subject, message, attachments);
    this.setState(this.getInitialState())
  }

  onDrop(files) {
    this.setState({dropzoneActive: false});
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        this.setState({
          attachments: [
            ...this.state.attachments,
            {
              name: files[i].name,
              size: files[i].size,
              type: files[i].type,
              blob: reader.result
            }
          ]
        })
      };
      reader.readAsBinaryString(files[i]);
    }
  }

  removeAttachment(file) {
    this.setState({
      attachments: this.state.attachments.filter(item => item !== file)
    })
  }

  render() {
    let dropzoneRef;

    const dropzoneOverlayStyle = {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      padding: '2.5em 0',
      background: 'rgba(0,0,0,0.5)',
      textAlign: 'center',
      color: '#fff'
    };

    return (
      <PageWrapper title='Написать - Gmail'>
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

          </FormGroup>
          <FormGroup>
            <Dropzone
              disableClick
              style={{position: "relative"}}
              onDrop={this.onDrop.bind(this)}
              onDragEnter={() => this.setState({dropzoneActive: true})}
              onDragLeave={() => this.setState({dropzoneActive: false})}
              ref={(node) => {
                dropzoneRef = node;
              }}
            >
              {this.state.dropzoneActive && <div style={dropzoneOverlayStyle}>
                Перетащите сюда файлы, чтобы прикрепить их к письму...
              </div>}
              <FormControl
                placeholder='Сообщение'
                name='message'
                value={this.state.message}
                onChange={this.onChange}
                componentClass='textarea'
                rows={10}
                required
              />
            </Dropzone>
          </FormGroup>

          <ListGroup>
            {this.state.attachments.map((file, index) => (
              <ListGroupItem key={index} listItem={true}>
                {file.name} ({filesize(file.size)})
                <Button
                  onClick={() => this.removeAttachment(file)}
                  className='btn-link badge close'
                >
                  &times;
                </Button>
              </ListGroupItem>
            ))}
          </ListGroup>

          <FormGroup>
            <Button onClick={() => {
              dropzoneRef.open()
            }}>
              Приложить файлы
            </Button>

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
      </PageWrapper>
    );
  }
}

export default connect(
  state => ({
    isLoading: state.send.isLoading
  }),
  dispatch => ({
    sendMessage: (to, subject, message, attachments) => {
      dispatch(sendMessage(to, subject, message, attachments))
    },
    moveToHome: () => {
      dispatch(push('/'))
    }
  })
)(SendPage);
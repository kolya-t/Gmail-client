import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {Button, FormControl, FormGroup, ListGroup, ListGroupItem} from 'react-bootstrap'
import Dropzone from 'react-dropzone'

import {sendMessage} from '../../../actions/sendActionCreators'
import filesize from 'filesize'

class SendPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      to: '',
      subject: '',
      message: '',
      attachments: [],
      dropzoneActive: false
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
    const {to, subject, message, attachments} = this.state;
    this.props.sendMessage(to, subject, message, attachments);
    // this.props.moveToHome();
  }

  onDrop(files) {
    console.log(files);
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

  render() {
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
          {this.state.attachments.map(file => (
            <ListGroupItem key={file.name} listItem={true}>
              {file.name} ({filesize(file.size)})
            </ListGroupItem>
          ))}
        </ListGroup>

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
    sendMessage: (to, subject, message, attachments) => {
      dispatch(sendMessage(to, subject, message, attachments))
    },
    moveToHome: () => {
      dispatch(push('/'))
    }
  })
)(SendPage);
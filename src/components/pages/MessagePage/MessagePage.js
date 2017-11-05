import React, {Component} from 'react'
import {connect} from 'react-redux'
import renderHtml from 'react-render-html'
import {ButtonGroup, Button, FormControl, FormGroup, Panel} from 'react-bootstrap'
import filesize from 'filesize'

import {getMessage} from '../../../actions/messageActionCreators'
import {getHeader, downloadAttachment} from '../../../messageMethods'
import {Loading} from '../../Loading'

const attachmentSize = (attachment) => filesize(attachment.body.size, {base: 10});

class MessagePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      reply: ''
    };

    this.onReplyChange = this.onReplyChange.bind(this);
    this.onSendReply = this.onSendReply.bind(this);
  }

  componentWillMount() {
    this.props.getMessage(this.props.match.params.id);
  }

  onReplyChange(e) {
    this.setState({reply: e.target.value})
  }

  onSendReply(e) {
    e.preventDefault();
    // todo: отправка ответа
  }

  render() {
    return (
      <div>
        {!this.props.isLoaded ? (
          <Loading/>
        ) : (
          <div>
            <Panel header={
              <div>
                <span><i>От:</i> {getHeader(this.props.message, 'From')}</span>
                <hr style={{margin: '5px'}}/>
                <span><i>Кому:</i> {getHeader(this.props.message, 'To')}</span>
                <hr style={{margin: '5px'}}/>
                <span><i>Тема:</i> {getHeader(this.props.message, 'Subject')}</span>
              </div>
            }>
              {this.props.message.payload.htmlBody === '' ? (
                <i>Пустое сообщение</i>
              ) : (
                renderHtml(this.props.message.payload.htmlBody)
              )}
              {this.props.message.payload.attachments.length ? (
                  <div>
                    <hr/>
                    <ButtonGroup vertical>
                      {this.props.message.payload.attachments.map((attachment, index) => (
                        <Button
                          key={index}
                          onClick={() => downloadAttachment(this.props.message.id, attachment)}
                        >
                          <i className="fa fa-cloud-download" aria-hidden="true"></i> {attachment.filename} ({attachmentSize(attachment)})
                        </Button>
                      ))}
                    </ButtonGroup>
                  </div>
                ) :
                (
                  null
                )}
            </Panel>
            <form onSubmit={this.onSendReply}>
              <FormGroup>
                <FormControl
                  componentClass='textarea'
                  placeholder='Напишите ваш ответ здесь'
                  rows={3}
                  value={this.state.reply}
                  onChange={this.onReplyChange}
                />
              </FormGroup>

              <div className='pull-right' style={{marginBottom: '100px'}}>
                {!/^\s*$/.test(this.state.reply) ? (
                  <Button type='submit'>Ответить</Button>
                ) : (
                  null
                )
                }
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    message: state.message.message,
    isLoaded: !!state.message.message
  }),
  dispatch => ({
    getMessage: (id) => {
      dispatch(getMessage(id))
    }
  })
)(MessagePage);
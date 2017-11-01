import React, {Component} from 'react'
import {connect} from 'react-redux'
import renderHtml from 'react-render-html'
import {Button, FormControl, FormGroup, Panel} from 'react-bootstrap'

import {getMessage} from '../../../actions/messageActionCreators'
import {Loading} from '../../Loading'

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
            <Panel>
              {renderHtml(this.props.message.payload.body)}
            </Panel>
            <form onSubmit={this.onSendReply}>
              <FormGroup>
                {/*<ControlLabel>Ваш ответ:</ControlLabel>*/}
                <FormControl
                  componentClass='textarea'
                  placeholder='Напишите ваш ответ здесь'
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
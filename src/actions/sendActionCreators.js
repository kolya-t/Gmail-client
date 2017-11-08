/* global gapi */
import quotedPrintable from 'quoted-printable'
import utf8 from 'utf8'
import {sendMessageRequest, sendMessageSuccess} from '../constants'
import {getHeader} from '../messageMethods'

export const reply = (messageToReply, replyMessage, attachments) => dispatch => {
  const to = getHeader(messageToReply, 'From');
  const subject = encodeHeader('Re: ' + getHeader(messageToReply, 'Subject'));
  const messageId = getHeader(messageToReply, 'Message-Id');

  const headers = {
    'To': to,
    'In-Reply-To': to,
    'References': to,
    'Message-Id': messageId,
    'Subject': subject
  };

  dispatch(send(headers, replyMessage, attachments));
};

export const sendMessage = (to, subject, message, attachments) => dispatch => {
  const headers = {
    'To': to,
    'Subject': encodeHeader(subject)
  };

  dispatch(send(headers, message, attachments));
};

const send = (headers, message, attachments) => dispatch => {
  dispatch(sendMessageRequest());

  let email = [
    'Content-Type: multipart/mixed; boundary="my_boundary"',
    'MIME-Version: 1.0'
  ];

  for (let h in headers) {
    email.push(`${h}: ${headers[h]}`)
  }

  email.push(
    '',
    '--my_boundary'
  );

  if(!/^\s*$/.test(message)) {
    email.push(
      'Content-Type: text/plain; charset="UTF-8"',
      'MIME-Version: 1.0',
      'Content-Transfer-Encoding: 7bit',
      '',
      `${message}`,
      '',
      '--my_boundary'
    )
  }

  if (attachments.length > 0) {
    for (let i = 0; i < attachments.length; i++) {
      email.push(
        `Content-Type: ${attachments[i].type}`,
        'MIME-Version: 1.0',
        'Content-Transfer-Encoding: base64',
        `Content-Disposition: attachment; filename="${attachments[i].name}"`,
        '',
        btoa(attachments[i].blob),
        '',
        '--my_boundary'
      )
    }
  }

  email = encode(email.join('\r\n') + '--');

  gapi.client.gmail.users.messages.send({
    userId: 'me',
    resource: {
      raw: email
    }
  }).then(response => {
    dispatch(sendMessageSuccess())
  })
};

const encode = (s) => btoa(unescape(encodeURIComponent(s))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const encodeHeader = (s) => `=?utf-8?Q?${quotedPrintable.encode(utf8.encode(s))}?=`;
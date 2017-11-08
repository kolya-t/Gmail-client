/* global gapi */
import quotedPrintable from 'quoted-printable'
import utf8 from 'utf8'
import {sendMessageRequest, sendMessageSuccess} from '../constants'

export const sendMessage = (to, subject, message, attachments) => dispatch => {
  dispatch(sendMessageRequest());

  let email = [
    'Content-Type: multipart/mixed; boundary="my_boundary"',
    'MIME-Version: 1.0',
    `To: ${to}`,
    `Subject: =?utf-8?Q?${quotedPrintable.encode(utf8.encode(subject))}?=`,
    '',
    '--my_boundary'
  ];

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
    console.log(attachments);
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
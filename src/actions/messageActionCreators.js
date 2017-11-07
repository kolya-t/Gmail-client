/* global gapi */
import {downloadAttachmentRequest, downloadAttachmentSuccess, getMessageRequest, getMessageSuccess} from '../constants'
import {getAttachments, getHtmlBody, markMessageAsRead} from "../messageMethods";
import {saveAs} from 'file-saver'

export const getMessage = (id) => dispatch => {
  dispatch(getMessageRequest());
  gapi.client.gmail.users.messages.get({
    userId: 'me',
    id
  }).then(({result}) => {
    dispatch(getMessageSuccess({
      id: result.id,
      payload: {
        headers: result.payload.headers,
        htmlBody: getHtmlBody(result),
        attachments: getAttachments(result)
      }
    }));
    markMessageAsRead(result.id);
  })
};

export const downloadAttachment = (messageId, attachment) => dispatch => {
  dispatch(downloadAttachmentRequest());
  gapi.client.gmail.users.messages.attachments.get({
    userId: 'me',
    messageId,
    id: attachment.body.attachmentId
  }).execute(({result}) => {
    let byteString = atob(result.data.replace(/-/g, '+').replace(/_/g, '/'));

    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    let blob = new Blob([ia], {type: attachment.mimeType});

    saveAs(blob, attachment.filename);
    dispatch(downloadAttachmentSuccess());
  })
};
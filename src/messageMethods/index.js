/* global gapi */

export const getHeader = (message, headerName) => {
  let resultHeader = null;
  message.payload.headers.forEach((header) => {
    if (header.name === headerName) {
      resultHeader = header.value;
    }
  });
  return resultHeader;
};

export const getHtmlBody = (message) => {
  let encodedBody = '';
  if (typeof message.payload.parts === 'undefined') {
    encodedBody = message.payload.body.data;
  } else {
    encodedBody = getHTMLPart(message.payload.parts);
  }
  encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
  return decodeURIComponent(escape(window.atob(encodedBody)));
};

const getHTMLPart = (arr) => {
  let htmlPart = '';
  let plainPart = '';
  for (let x = 0; x < arr.length; x++) {
    if (typeof arr[x].parts === 'undefined') {
      if (arr[x].mimeType === 'text/html') {
        htmlPart = arr[x].body.data;
      } else if (arr[x].mimeType === 'text/plain') {
        plainPart = arr[x].body.data;
      }
    } else {
      return getHTMLPart(arr[x].parts);
    }
  }
  return htmlPart !== '' ? htmlPart : plainPart;
};

export const getAttachments = ({payload}) => {
  let attachments = [];
  if (typeof payload.parts !== 'undefined') {
    for (let i = 0; i < payload.parts.length; i++) {
      const part = payload.parts[i];
      if (typeof part.body.attachmentId !== 'undefined') {
        attachments.push(part);
      }
    }
  }
  return attachments;
};

export const markMessageAsRead = (messageId) => {
  gapi.client.gmail.users.messages.modify({
    userId: 'me',
    id: messageId,
    resource: {
      addLabelIds: [],
      removeLabelIds: ['UNREAD']
    }
  }).execute();
};
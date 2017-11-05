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
  for (let x = 0; x < arr.length; x++) {
    if (typeof arr[x].parts === 'undefined') {
      if (arr[x].mimeType === 'text/html') {
        // todo: доставать text/plain. за основу взять джававскую реализацию
        return arr[x].body.data;
      }
    } else {
      return getHTMLPart(arr[x].parts);
    }
  }
  return '';
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
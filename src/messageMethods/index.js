export const getHeader = (message, headerName) => {
  let resultHeader = null;
  message.payload.headers.forEach((header) => {
    if (header.name === headerName) {
      resultHeader = header.value;
    }
  });
  return resultHeader;
};

export const getBody = ({payload}) => {
  let encodedBody = '';
  if (typeof payload.parts === 'undefined') {
    encodedBody = payload.body.data;
  } else {
    encodedBody = getHTMLPart(payload.parts);
  }
  encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
  return decodeURIComponent(escape(window.atob(encodedBody)));
};

const getHTMLPart = (arr) => {
  for (let x = 0; x <= arr.length; x++) {
    if (typeof arr[x].parts === 'undefined') {
      if (arr[x].mimeType === 'text/html') {
        return arr[x].body.data;
      }
    } else {
      return getHTMLPart(arr[x].parts);
    }
  }
  return '';
};
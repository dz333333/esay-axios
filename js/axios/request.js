export default function request(options) {
  let xhr = new XMLHttpRequest();
  xhr.open(options.method, options.url);
  for (let key in options.headers) {
    xhr.setRequestHeader(
      encodeURIComponent(key),
      encodeURIComponent(options.headers[key])
    );
  }
  xhr.send(options.data);
  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          console.log(xhr);
          resolve({
            data: JSON.parse(xhr.responseText),
            status: xhr.status,
            statusText: xhr.statusText,
          });
        } else {
          reject(xhr);
        }
      }
    };
  });
}

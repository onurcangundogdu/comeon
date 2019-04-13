export const domLibrary = {
  container: document.querySelector('.container')
}

export const clearContainer = () => {
  domLibrary.container.innerHTML = null;
};

/*
npm install -g json-server
json-server --watch mock/mock-data.json --port 3001 --middlewares mock/mock-api.js
*/
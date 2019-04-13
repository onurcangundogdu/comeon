export const domLibrary = {
  container: document.querySelector('.container')
}

export const clearContainer = () => {
  domLibrary.container.innerHTML = null;
};
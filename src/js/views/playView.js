import {domLibrary, clearContainer} from './base';

export const renderPlay = () => {
  const markup = `
  <div class="ingame"">
    <div class="ui grid centered">
        <div class="three wide column">
            <div class="ui right floated secondary button inverted back-btn"><i class="left chevron icon"></i>Back
            </div>
        </div>
        <div class="ten wide column">
            <div id="game-launch">
            </div>
        </div>
        <div class="three wide column"></div>
    </div>
  </div>
  `;
  clearContainer();
  domLibrary.container.insertAdjacentHTML('afterbegin', markup);
}
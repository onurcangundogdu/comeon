import {domLibrary, clearContainer} from './base';
import Mustache from 'mustache';

const gameTemplate = `
{{#games}}
<div class="game item">
  <div class="ui small image">
      <img src="{{icon}}" alt="game-icon">
  </div>
  <div class="content">
      <div class="header"><b class="name">{{name}}</b></div>
      <div class="description">{{description}}</div>
      <div class="extra">
          <div class="play ui right floated secondary button inverted" data-gamecode="{{code}}">
              Play
              <i class="right chevron icon"></i>
          </div>
      </div>
  </div>
</div>
{{/games}}
`;

const userTemplate = `
  <div class="player item">
      <img class="ui avatar image" src="{{avatar}}" alt="avatar">

      <div class="content">
          <div class="header"><b class="name">{{name}}</b></div>
          <div class="description event">{{event}}</div>
      </div>
  </div>
  `;

const categoryTemplate = `
{{#categories}}
<div class="category item category-item" data-categoryid="{{id}}">
    <div class="content">
        <div class="header">{{name}}</div>
    </div>
</div>
{{/categories}}
`;

export const clearActiveCategories = () => {
  Array.from(document.querySelectorAll('.category-item')).forEach(element => {
    element.classList.remove('active');
  });
};

export const selectCategory = element => {
  element.classList.add('active');
};

export const clearGames = () => {
  const gamesContainer = document.querySelector('.games-container');
  gamesContainer.innerHTML = null;
};

export const clearSearch = () => {
  const searchInput = document.querySelector('.search-input');
  searchInput.value = null;
};

export const renderGames = games => {
  const markup = Mustache.render(gameTemplate, {games})
  const gamesContainer = document.querySelector('.games-container');
  gamesContainer.insertAdjacentHTML('afterbegin', markup);
};

export const renderView = (user, games, categories) => {

  const markup = `
<div class="casino">
  <div class="ui grid centered">
      <div class="twelve wide column">
          <div class="ui list">
          ${Mustache.render(userTemplate, user)}
          </div>
          <div class="logout ui left floated secondary button inverted">
            <i class="left chevron icon"></i>Log Out
          </div>
      </div>
      <div class="four wide column">
          <div class="search ui small icon input ">
              <input type="text" placeholder="Search Game" class="search-input">
              <i class="search icon"></i>
          </div>
      </div>
  </div>
  <div class="ui grid">
      <div class="twelve wide column">
          <h3 class="ui dividing header">Games</h3>

          <div class="ui relaxed divided game items links games-container">
            ${Mustache.render(gameTemplate, {games})}
          </div>
      </div>
      <div class="four wide column">
          <h3 class="ui dividing header">Categories</h3>

          <div class="ui selection animated list category items">
            ${Mustache.render(categoryTemplate, {categories})}
          </div>
      </div>
  </div>
</div>
  `;
  clearContainer();
  domLibrary.container.insertAdjacentHTML('afterbegin', markup);
};
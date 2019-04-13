import * as loginView from './views/loginView';
import * as gamesView from './views/gamesView';
import * as playView from './views/playView';
import {domLibrary} from './views/base';
import User from './models/User';
import Games from './models/Games';
import Categories from './models/Categories';

const state = {};
if(!state.user) {
    loginView.renderLogin();
}

const controlLogout = async () => {
    if(!state.user) return;

    try {
        await state.user.logout();
        delete state.user;
        loginView.renderLogin();
    } catch(err) {
        console.log('Error in logout controller -->', err);
    }
};

const controlGames = async () => {
    if(!state.user) return;
    if(!state.games) {
        state.games = new Games();
    }
    if(!state.categories) {
        state.categories = new Categories();
    }

    try {
        await state.games.fetchGames();
        await state.categories.fetchCategories();

        gamesView.renderView(state.user, state.games.games, state.categories.categories);
    } catch(err) {
        console.log('Error in games controller -->', err);
    }
};

const controlLogin = async (e) => {
    e.preventDefault();
    
    //get input values from loginView
    const loginInput = loginView.getInput();

    //do validation
    if(!loginInput.username || !loginInput.password) {
        return alert('Please fill the form.');
    }

    //post request
    const user = new User(loginInput.username);
    try {
        await user.login(loginInput.password);
        state.user = user;
        controlGames();
    } catch (err) {
        console.log('Error in login controller', err);
        alert('Please try again with the correct information.');
    }
}

domLibrary.container.addEventListener('submit', controlLogin);
domLibrary.container.addEventListener('click', e => {
    if(e.target.closest('.login-btn')) {
        controlLogin(e);
    } else if(e.target.closest('.logout')) {
        controlLogout();
    } else if(e.target.closest('.category-item')) {

        gamesView.clearGames();
        gamesView.clearSearch();
        gamesView.clearActiveCategories();

        const element = e.target.closest('.category-item');
        const categoryId = parseInt(element.dataset.categoryid);
        const filteredGames = state.games.games.filter(game => game.categoryIds.includes(categoryId));

        gamesView.selectCategory(element);
        gamesView.renderGames(filteredGames);
    } else if(e.target.closest('.play')) {
        const element = e.target.closest('.play');
        const gameCode = element.dataset.gamecode;
        playView.renderPlay();
        comeon.game.launch(gameCode);
    } else if (e.target.closest('.back-btn')) {
        gamesView.renderView(state.user, state.games.games, state.categories.categories);
    }
});
domLibrary.container.addEventListener('input', e => {
    if(e.target.matches('.search-input')) {

        gamesView.clearGames();
        gamesView.clearActiveCategories();

        const searchValue = e.target.value.toLowerCase();
        const filteredGames = state.games.games.filter(game => 
            game.name.toLowerCase().includes(searchValue) || 
            game.description.toLowerCase().includes(searchValue));

        gamesView.renderGames(filteredGames);
    }
});


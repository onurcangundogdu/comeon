import {domLibrary, clearContainer} from './base';
import Mustache from 'mustache';

export const getInput = () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  return {username, password}
};

export const renderLogin = () => {
    const template = `
        <div class="login">
            <div class="ui grid centered">
                <form>
                    <div class="fields">
                        <div class="required field">
                            <div class="ui icon input">
                                <input id="username" type="text" name="username" placeholder="Username">
                                <i class="user icon"></i>
                            </div>
                        </div>
                        <div class="required field">
                            <div class="ui icon input">
                                <input id="password" type="password" name="password" placeholder="Password">
                                <i class="lock icon"></i>
                            </div>
                        </div>
                        <div class="field">
                            <div class="ui icon input login-btn">
                                <input type="submit" value="Login">
                                <i class="right chevron link icon"></i>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `;
  clearContainer();
  domLibrary.container.insertAdjacentHTML('afterbegin', Mustache.render(template));
};
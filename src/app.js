// Import our custom CSS
import '../src/styles/styles.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'


import home from './script/view/home.js';

document.addEventListener('DOMContentLoaded', () => {
  home();
});
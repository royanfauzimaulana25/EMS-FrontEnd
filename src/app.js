// Import our custom CSS
import '../src/styles/styles.scss';

import login from './script/view/js/login.js';
import registration from './script/view/js/registration.js';
import account from './script/view/js/account.js';

import photographyRegistration from './script/view/js/photography-registration.js';
import photographySummary from './script/view/js/photography-summary.js';

import basketballRegistration from './script/view/js/basketball-registration.js';
import basketball_summary from './script/view/js/basketball-summary.js';

import payment from './script/view/js/payment.js';

document.addEventListener('DOMContentLoaded', () => {
  login();
  registration();
  account();

  photographyRegistration();
  photographySummary();

  basketballRegistration();
  basketball_summary();

  payment();
});
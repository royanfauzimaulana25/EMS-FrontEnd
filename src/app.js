// Import our custom CSS
import '../src/styles/styles.scss';

import home from './script/view/js/home.js';

import login from './script/view/js/login.js';
import registration from './script/view/js/registration.js';
import account from './script/view/js/account.js';

import administrator from './script/view/js/administrator.js';
import penanggung_jawab_photography from './script/view/js/pj-photography.js';
import penanggung_jawab_basketball from './script/view/js/pj-basketball.js';


import photographyRegistration from './script/view/js/photography-registration.js';
import photographySummary from './script/view/js/photography-summary.js';

import basketballRegistration from './script/view/js/basketball-registration.js';
import basketball_summary from './script/view/js/basketball-summary.js';

import payment from './script/view/js/payment.js';

document.addEventListener('DOMContentLoaded', () => {
  home();

  login();
  registration();
  account();

  administrator();
  penanggung_jawab_photography();
  penanggung_jawab_basketball();

  photographyRegistration();
  photographySummary();

  basketballRegistration();
  basketball_summary();

  payment();
});
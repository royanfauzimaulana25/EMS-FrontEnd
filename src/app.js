// Import our custom CSS
import '../src/styles/styles.scss';

import home from './script/view/js/home.js';

import login from './script/view/js/login.js';
import registration from './script/view/js/registration.js';
import account from './script/view/js/account.js';

import administrator from './script/view/js/administrator.js';
import penanggung_jawab_single from './script/view/js/pj-single.js';
import penanggung_jawab_team from './script/view/js/pj-team.js';


import singleRegistration from './script/view/js/single-registration.js';
import single_summary from './script/view/js/single-summary.js';

import teamRegistration from './script/view/js/team-registration.js';
import team_summary from './script/view/js/team-summary.js';

import payment from './script/view/js/payment.js';

document.addEventListener('DOMContentLoaded', () => {
  home();

  login();
  registration();
  account();

  administrator();
  
  penanggung_jawab_single();
  penanggung_jawab_team();

  singleRegistration();
  single_summary();

  teamRegistration();
  team_summary();

  payment();
});
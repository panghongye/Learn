import localeSettings from './en-US/settings';
import localeMessageBox from '../components/MessageBox/locale/en-US';
import localeSearchTable from '../pages/search-table/locale/en-US';
import localeWelcome from '../pages/welcome/locale/en-US';
import login from '../pages/login/locale/en-US';

export default {
    'menu.list': 'List',
    'menu.categories': 'categories',
    'navbar.docs': 'Docs',
    ...localeSettings,
    ...localeMessageBox,
    ...localeSearchTable,
    ...localeWelcome,
    ...login,
};

import { PATH } from './constant.config';

const { password, address, credit, history, shopRegister, shop } = PATH.profile;

const SIDEBAR = [
    { title: 'Information', path: '' },
    {
        title: 'Password',
        path: `./${password}`,
    },
    {
        title: 'Shipping address',
        path: `./${address}`,
    },
    {
        title: 'Credit cards',
        path: `./${credit}`,
    },
    {
        title: 'Shopping history',
        path: `./${history}`,
    },
    {
        title: 'Shop register',
        path: `./${shopRegister}`,
    },
    {
        title: 'My shop',
        path: `./${shop}`,
    },
];
export default SIDEBAR;

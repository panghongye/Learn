import { LOGIN } from './actionTypes';

const initialState = {
    userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
};

export interface UserLoginState {
    userInfo?: {
        name?: string;
        avatar?: string;
    };
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN: {
            const userInfo = {
                ...action.payload,
                avatar: 'https://s1.ax1x.com/2020/10/11/0cZNdK.jpg',
                name: action.payload.username,
            };
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            state.userInfo = userInfo;
        }
        default:
            return state;
    }
}
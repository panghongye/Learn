import defaultSettings from '../settings.json';

const defaultTheme = localStorage.getItem('arco-theme') || 'light';

function changeTheme(newTheme?: 'string') {
    if ((newTheme || defaultTheme) === 'dark') {
        document.body.setAttribute('arco-theme', 'dark');
    } else {
        document.body.removeAttribute('arco-theme');
    }
}

// init page theme
changeTheme();

export interface GlobalState {
    theme?: string;
    settings?: typeof defaultSettings;
    collapsed?: boolean;
    userInfo?: {
        name?: string;
        avatar?: string;
        job?: string;
        organization?: string;
        location?: string;
        email?: string;
    };
}

const initialState: GlobalState = {
    theme: defaultTheme,
    settings: defaultSettings,
    collapsed: false,
    userInfo: {
        name: "※听雨※",
        avatar: "https://s1.ax1x.com/2020/10/11/0cZNdK.jpg",
    },
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'toggle-theme': {
            const { theme } = action.payload;
            if (theme === 'light' || theme === 'dark') {
                localStorage.setItem('arco-theme', theme);
                changeTheme(theme);
            }

            return {
                ...state,
                theme,
            };
        }
        case 'update-settings': {
            const { settings } = action.payload;
            return {
                ...state,
                settings,
            };
        }
        default:
            return state;
    }
}
import { combineReducers } from 'redux';
import global, { GlobalState } from './global';
import login, { UserLoginState } from '../pages/login/redux/reducer';
import searchTable, { SearchTableState } from '../pages/search-table/redux/reducer';
import categories, { CategoriesState } from '../pages/categories/redux/reducer';
import tags, { TagsState } from '../pages/tags/redux/reducer';
import user, { UserState } from '../pages/user/redux/reducer';
import articles, { ArticlesState } from '../pages/articles/redux/reducer';

export interface ReducerState {
    global: GlobalState;
    login: UserLoginState;
    searchTable: SearchTableState;
    categories: CategoriesState;
    tags: TagsState;
    user: UserState;
    articles: ArticlesState
}

export default combineReducers({
    global,
    login,
    searchTable,
    categories,
    tags,
    user,
    articles,
});

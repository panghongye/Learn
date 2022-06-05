/**
 * history.push(path, [state])
 * history.replace(path, [state])
 * history.go(n)
 * history.goBack()
 * history.goForward()
 *
 * history.listen(func) // listen for changes to the current location
 *
 */

// import { createBrowserHistory } from 'history';
import { createHashHistory } from 'history';


// history模式配置代理后会导致404白屏
// const HISTORY = createBrowserHistory({
//   basename: '/',
// });


// 改为HashHistory模式
const HISTORY = createHashHistory({
    basename: '/',
});

export default HISTORY;

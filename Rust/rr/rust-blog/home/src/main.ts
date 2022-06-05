import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'


// font-awesome字体
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faQq } from "@fortawesome/free-brands-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons"


library.add(faQq);
library.add(faGithub);
library.add(faEnvelope);
library.add(faArrowCircleUp);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);


//自定义一个代码高亮指令
app.directive('highlight', function (el) {
    let highlight = el.querySelectorAll('pre code');
    highlight.forEach((block: any) => {
        hljs.highlightBlock(block);
    });
});

app.use(ElementPlus);
app.use(router).mount('#app');

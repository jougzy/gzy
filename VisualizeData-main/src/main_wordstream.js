import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import tree from './components/wordstream/tree.vue';
import 'element-plus/dist/index.css';
import loadingforstreamVue  from './components/wordstream/loadingforstream.vue';
import headerVue from './components/wordstream/header.vue';

let tree_ = createApp(tree);
tree_.use(ElementPlus);
tree_.mount("#tree");

// let loading = createApp(loadingforstreamVue);
// loading.use(ElementPlus);
// loading.mount("#wordstream");

let header = createApp(headerVue);
header.mount("#header");
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import axios from 'axios'

Vue.use(Router)

const routes = [{
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
}]

const router = new Router({
    routes
})

router.beforeEach((to, from, next) => {
    console.log(axios.get);
    // axios.get('/user', {
    //         params: {
    //             ID: 12345
    //         }
    //     })
    //     .then(function(response) {
    //         console.log(response, 23);
    //     })
    //     .catch(function(error) {
    //         console.log(error);
    //     });
})

export default router;
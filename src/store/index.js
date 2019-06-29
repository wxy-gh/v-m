
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: { //类似data
        count: 0,
        name: 'zhangsan',
        id: '123',
        obj: {id:123,value:'一二三'},
        list: [{code:1,name:'一'}, {code:2,name:'二'}]
    },
    getters: { //类似computed
        getCount: function (state) {
            return state.count + 1
        },
        getName: function(state){
            return 'hello ' + state.name
        },
        getId: function(state){
            return state.id + 456
        }
    },
    actions: { //类似methods
        add(context,n) {
            context.commit('aa',n);
        },
        sub(context,n) {
            context.commit('bb',n);
        }
    },
    mutations: {
        aa(state,n){
            state.count = state.count + n
        },
        bb(state,n){
            state.count = state.count - n
        }
    },
    modules: {
        moduleA: {
            state: {
                count1: 1
            },
            getters: {
                addCount (state) {
                    return state.count + 10
                }
            },
            actions: {
                ac1(context, param){
                    if((context.state + context.rootState) > 20){
                        context.commit('mu1')
                    }
                }
            },
            mutations: {
                mu1(state, param){
                    state.count++
                }
            }
        },
        moduleB: {
            state: {
                count2: 2
            },
            getters: {
                doubleCount (state) {
                    return state.count2 * 2
                }
            },
            actions: {
                ac2({state, commit, rootState}, param){
                    if((state + rootState) > 20){
                        commit('mu2')
                    }
                }
            },
            mutations: {
                mu2(state, param){
                    state.count++
                }
            }
        },
        moduleC: {
            state: {
                count3: 3,
                getData(){
                    setTimeout(() => {
                        window.console.log('getData');
                        return 4
                    }, 1000);
                },
                getOtherData(){
                    setTimeout(() => {
                        window.console.log('getOtherData');
                        return 5
                    }, 1000);
                }
            },
            //组合 actions
            actions: {
                async actionA ({ commit, state}) {
                    commit('gotData', await state.getData())
                },
                async actionB ({ dispatch, commit, state}) {
                    await dispatch('actionA') // 等待 actionA 完成
                    commit('gotOtherData', await state.getOtherData())
                }
            },
            mutations: {
                gotData(state, paload){
                    state.count3 += paload;
                    window.console.log(state.count3);
                },
                gotOtherData(state, paload){
                    state.count3 += paload;
                    window.console.log(state.count3);
                }
            }
        }
    }
})

export default store

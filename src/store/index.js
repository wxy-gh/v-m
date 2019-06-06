
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: { //类似data
        count: 1,
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
                count: 0
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

            },
            //组合 actions
            actions: {
                async actionA ({ commit }) {
                    commit('gotData', await getData())
                },
                async actionB ({ dispatch, commit }) {
                    await dispatch('actionA') // 等待 actionA 完成
                    commit('gotOtherData', await getOtherData())
                }
            }
        }
    }
})

export default store

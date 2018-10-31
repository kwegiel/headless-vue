import Vue from 'vue'
import Vuex from 'vuex'
import axios from "./axios";
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    pages: [],
    data: [],
    error: null,
    loading: true
  },
  actions: {
    loadPages({ commit }) {
      axios
        .get('/node/page')
        .then(res => {
          const resPages = res.data.data;
          const fetchedPages = resPages.map(item => {
            return {
              id: item.id,
              title: item.attributes.title,
              path: item.attributes.path.alias,
              body: item.attributes.body
            };
          });
          return fetchedPages;
        })
        .then(pages => {
          commit('SET_PAGES', pages)
        })
        .catch(error => {
          commit('FETCH_FAILED', error);
        })
    },
    loadPortfolio({ commit }) {
      axios
        .get('/node/article?_consumer_id=05c7b6e5-7a48-41ab-bb75-cb9dd8fb01df&format=api_json&fields[node--article]=field_image,title,field_tags,uid,body&include=field_image,field_tags')
        .then(res => {
          const resData = res.data.data;
          const resIncluded = res.data.included;
          const updatedData = resData.map(item => {
            let currentTagId = item.relationships.field_tags.data.id;
            let currentImgId = item.relationships.field_image.data.id;
            let tag = resIncluded.filter(item => {
              return item.id.indexOf(currentTagId.toString()) !== -1;
            });
            let img = resIncluded.filter(item => {
              return item.id.indexOf(currentImgId.toString()) !== -1;
            });
            tag = tag.map(item => {
              return item.attributes.name;
            });
            tag = tag.toString();
            img = img.map(item => {
              return item.meta.derivatives.large;
            });
            img = img.toString();
            return {
              id: item.id,
              title: item.attributes.title,
              tag: tag,
              img: img,
              body: item.attributes.body.value
            };
          });
          return updatedData;
        })
        .then(data => {
          commit('SET_DATA', data);
          commit('SET_LOADING', false)
        })
        .catch(error => {
          commit('FETCH_FAILED', error);
        })
    }
  },
  mutations: {
    SET_PAGES(state, pages) {
      state.pages = pages
    },
    SET_DATA(state, data) {
      state.data = data
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    FETCH_FAILED(state, error) {
      state.error = error.toString()
    }
  }
})

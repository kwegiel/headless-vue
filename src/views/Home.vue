<template>
  <div class="home">  
    <b-container> 
      <b-row>
        <b-col><h1>Porfolio</h1></b-col>
        <b-col>
          <div>
            <b-input-group>
                <b-form-input v-model="search"></b-form-input>
                <b-input-group-append>
                <b-btn @click="clear" variant="info">Clear</b-btn>
                </b-input-group-append>
            </b-input-group>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <b-container>
      <div v-if="loading"><app-spinner /></div>      
      <b-row v-else>        
        <b-col sm="4" v-for="item in filterData" :key="item.id">
            <app-card :title="item.title" :img="item.img" :tag="item.tag" :id="item.id" @searchTag="search = $event" />
            <app-modal :title="item.title" :id="item.id" :body="item.body" />            
        </b-col>
        <b-col sm="12" v-if="loadMore" class="load-more">
          <b-button @click="load" size="lg" variant="primary">Load More</b-button>
        </b-col>
      </b-row>   
    </b-container>
    <div v-if="error">
      <b-modal v-model="modalShow" hide-footer title="Portfolio"><h4>Loading portfolio</h4> {{ error }}</b-modal>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import Search from "@/components/Search.vue";
import Card from "@/components/Card.vue";
import Modal from "@/components/Modal.vue";
import Spinner from "@/components/Spinner.vue";

export default {
  data() {
    return {
      search: '',
      visible: 12,
      loadMore: false,
      modalShow: true
    };
  },
  name: "home",
  components: {
    appSearch: Search,
    appSpinner: Spinner,
    appCard: Card,
    appModal: Modal
  },
  mounted() {
    if (this.$store.state.loading) {
      this.$store.dispatch("loadPortfolio");
    }
  },
  computed: {
    ...mapState(["data", "error", "loading"]),
    filterData() {
      let filteredData = this.data.filter(item => {
        return (
          item.title.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 ||
          item.tag.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        );
      });    
      if (filteredData.length > this.visible) {
        this.loadMore = true;
      } else {
        this.loadMore = false;
      }
      filteredData = filteredData.slice(0, this.visible)
      return filteredData;
    }
  },
  methods: {
    load() {
      this.visible = this.visible + 12;
    },
    clear() {
      this.search = '';
    }
  }
};
</script>
<style>
.load-more {
    text-align: center;
    margin: 30px 0;
}
</style>

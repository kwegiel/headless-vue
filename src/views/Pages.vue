<template>
  <b-container v-if="path">
    <div v-if="filteredPage.length === 0">
      <h1>Page not found</h1>
    </div>
    <div v-else v-for="item in filteredPage" :key="item.id" class="fade-in">
      <h1>{{ item.title }}</h1>
      <div v-html="item.body.value"></div>
    </div>
  </b-container>
</template>
<script>
export default {
  props: {
    path: {
      type: String,
      default: "/about"
    }
  },
  computed: {
    filteredPage: function() {
      let pathid = this.path;
      let filterPage = this.$store.state.pages;
      filterPage = this.$store.state.pages.filter(item => {
        return item.path.indexOf(pathid.toString()) !== -1;
      });
      return filterPage;
    }
  }
};
</script>

<style>
h1.entry-title {
  font-size: 24px;
  line-height: 36px;
  font-weight: 300;
  max-width: 420px;
  margin: 0 auto;
  padding-bottom: 35px;
  text-align: center;
}

.page-desc {
  color: #7e7e7e;
  font-size: 16px;
  line-height: 36px;
  text-align: center;
  padding-bottom: 100px;
}

.content-1170 img,
.content-970 img,
.content-770 img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}

.progress_bar {
  margin-bottom: 11px;
}

.progress_bar_field_holder {
  height: 10px;
  display: inline-block;
  position: relative;
  width: 300px;
  vertical-align: middle;
  border-radius: 30px;
  overflow: hidden;
  background-color: #eeeeee;
}

.col-570 .progress_bar_field_holder {
  width: 370px;
}

.progress_bar_title {
  display: inline-block;
  width: 170px;
  margin-right: 23px;
}

.progress_bar_field_perecent {
  height: 10px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #f277ae;
}
</style>


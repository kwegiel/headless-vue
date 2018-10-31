<template>    
  <b-card :title="this.title"
    :img-src="this.img"
    img-alt="Image"
    img-top
    tag="article"
    class="portfolio-item fade-in">
  <p class="card-text">
    <span class="portfolio-item--tag" @click="tagSearch">{{ this.tag }}</span>
  </p>
  <b-button v-b-modal="id" >Read more</b-button>
  </b-card>
</template>
<script>
export default {
    props: ['title', 'img', 'tag', 'id'],
    name: "Card",
    methods: {
      tagSearch() {
        this.$emit('searchTag', this.tag);
      }
    }
};
</script>
<style>
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.fade-in {
    animation: fadeIn 0.5s ease-in;
}

.portfolio-item {
    margin-bottom: 30px;
}

.portfolio-item--tag {
    color: grey;
    opacity: 1;
    transition: opacity 0.3s ease;
    margin: 0 0 20px;
    cursor: pointer;
    display: inline-block;
}

.portfolio-item--tag:hover {
    opacity: 0.5;
}
</style>


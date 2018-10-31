<template>
    <div>
    <b-input-group>
        <b-form-input v-model="search"></b-form-input>
        <b-input-group-append>
        <b-btn variant="info">Clear</b-btn>
        </b-input-group-append>
    </b-input-group>
    </div>
</template>
<script>
export default {
    props: ['search'],
    name: "Search"
};
</script>
<style>

</style>



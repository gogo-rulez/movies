<template>
    <div id="app">
        <site-header/>
        <router-view/>
        <site-footer/>
    </div>
</template>

<script>
// @ is an alias to /src
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export default {
    name: 'App',
    components: {
        SiteHeader,
        SiteFooter
    },
};
</script>

<style lang="scss">
    @import "@/assets/scss/style";
</style>

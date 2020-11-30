<template>
    <div class="site_wrap detail_page">
        <movie-details />
    </div>
</template>

<script>
// @ is an alias to /src
import MovieDetails from '@/components/MovieDetails';

export default {
    name: 'DetailPage',

    components: {
        MovieDetails
    }

};
</script>

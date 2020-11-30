<template>
    <div class="site_wrap home">

        <search-form
            @emitSearch="getMovies($event)"
        />

        <search-results
            :is-loading="isLoading"
            :movies-list="moviesData"
            :page="urlParams.page"
            :total-results="totalResults"
            @emitSearch="getMovies($event)"
        />
    </div>
</template>

<script>
// @ is an alias to /src
import SearchForm from '@/components/SearchForm';
import SearchResults from '@/components/SearchResults';
import { api } from '@/mixins/axiosMixin';


export default {
    name: 'Home',
    components: {
        SearchForm,
        SearchResults
    },

    data () {
        return {
            moviesData: [],
            totalResults: 0,
            isLoading: false,
            urlParams: {
                s: this.$route.query.s || '', // movie name
                type: this.$route.query.type || '',
                y: this.$route.query.y || null, // movie year
                page: Number(this.$route.query.page) || 1
            }
        };
    },

    mounted () {
        if (!Object.keys(this.$route.query).length) return;
        this.getMovies(this.urlParams, false);
    },

    methods: {

        getMovies (event, navigate = true) {

            this.isLoading = true;
            window.scrollTo(0, 0);

            this.urlParams.s = event.name || this.urlParams.s;
            this.urlParams.type = event.type || this.urlParams.type;
            this.urlParams.y = event.year || this.urlParams.y;
            this.urlParams.page = event.page || this.urlParams.page;

            this.$route.params.s = this.urlParams.s;

            if (navigate) {
                this.$router.push({ name: 'Home', query: { ...this.urlParams } });
            }

            api
                .get('/', {
                    params: this.urlParams
                })
                .then(response => {
                    const moviesData = response.data;
                    this.moviesData = moviesData.Search;
                    this.totalResults = Number(moviesData.totalResults);
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 500);
                })
                .catch(() => {
                    this.moviesData = [];
                    this.totalResults = 0;
                });
        }

    }
};
</script>

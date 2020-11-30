<template>
    <div class="site_wrap favorites">

        <h3
            v-if="!favorites.length"
            class="favorites__title">
            Uups! No favorites to display
        </h3>

        <template v-else>
            <search-results
                :is-loading="isLoading"
                :movies-list="favorites"
                :page="urlParams.page"
                :total-results="totalResults"
                @emitSearch="getMovies($event)"
                @toggleFavorites="refreshFavorites()"
            />
        </template>

    </div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue';
import SearchResults from '@/components/SearchResults';
import { api } from '@/mixins/axiosMixin';
import { VueSpinners } from '@saeris/vue-spinners';

Vue.use(VueSpinners);

export default {
    name: 'Favorites',
    components: {
        SearchResults
    },

    data () {
        return {
            favorites: JSON.parse(localStorage.getItem('movieFavorites')) || [],
            moviesData: [],
            totalResults: 0,
            isLoading: true,
            urlParams: {
                s: this.$route.query.s || '', // movie name
                type: this.$route.query.type || '',
                y: this.$route.query.y || null, // movie year
                page: Number(this.$route.query.page) || 1
            }
        };
    },

    mounted () {
        if (!this.favorites) return;
        this.getMovies(this.urlParams, false);
    },

    methods: {

        getMovies (event, navigate = true) {

            this.isLoading = true;

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
                });
        },

        refreshFavorites () {
            this.favorites = JSON.parse(localStorage.getItem('movieFavorites')) || [];
        }

    }
};
</script>

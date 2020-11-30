<template>
    <div
        v-if="dataIsReady"
        class="movie_details">
        <figure class="movie_details__figure">
            <img
                :src="movieDetails.Poster"
                :alt="movieDetails.Title">
        </figure>

        <div class="movie_details__text_wrap">
            <h3 class="movie_details__title">
                {{ movieDetails.Title }}
            </h3>

            <p class="movie_details__plot">
                {{ movieDetails.Plot }}
            </p>

            <div class="movie_details__info">
                <p><strong>Genre: </strong>{{ movieDetails.Genre }}</p>
                <p><strong>Actors: </strong>{{ movieDetails.Actors }}</p>
                <p><strong>Director: </strong>{{ movieDetails.Director }}</p>
                <p><strong>Writers: </strong>{{ movieDetails.Writer }}</p>
                <p><strong>Type: </strong>{{ movieDetails.Type }}</p>
                <p><strong>Awards: </strong>{{ movieDetails.Awards }}</p>
                <p><strong>Language: </strong>{{ movieDetails.Language }}</p>
                <p><strong>Released: </strong>{{ movieDetails.Released }}</p>
            </div>

            <div class="movie_details__ratings_and_votes">
                <div class="movie_details__ratings">
                    <p>IMDB Ratings</p>
                    <div>
                        <span
                            v-for="n in 10"
                            class="icon"
                            :key="n"
                            :class="{
                                'icon-star_outline1': n > Math.round(imdbRating),
                                'icon-star': n <= Math.round(imdbRating)}"
                        />
                    </div>
                    <p>{{ movieDetails.imdbRating }} / 10</p>
                </div>
                <div class="movie_details__votes">
                    <p>IMDB Votes</p>
                    <p>{{ movieDetails.imdbVotes }}</p>
                </div>
            </div>

            <div class="movie_details__btns_wrap">
                <a
                    href="#"
                    class="movie_details__back_btn">
                    <i class="icon icon-navigate_before"></i>
                    Back
                </a>

            </div>

            <a
                role="button"
                class="movie_details__favorite_btn"
                @click="toggleFavorite()">
                <i
                    v-if="isFavorite"
                    class="icon icon-star"></i>
                <i
                    v-else
                    class="icon icon-star_outline1"></i>
            </a>

        </div>


    </div>
</template>

<script>
import { api } from '@/mixins/axiosMixin';
import Vue from 'vue';
import VueLocalStorage from 'vue-localstorage';

Vue.use(VueLocalStorage);

export default {
    name: 'MovieDetails',

    data () {
        return {
            movieDetails: {},
            imdbRating: 0,
            isFavorite: false,
            favoritesIds: JSON.parse(localStorage.getItem('movieFavoritesIds')) || [],
            favorites: JSON.parse(localStorage.getItem('movieFavorites')) || [],
            dataIsReady: false
        };
    },

    mounted () {
        this.getMovieDetails();

        if (!this.favoritesIds) return;
        console.log(this.favorites);
        this.isFavorite = this.favoritesIds.includes(this.$route.params.movieId);
    },

    methods: {
        getMovieDetails () {
            const { movieId } = this.$route.params;
            api
                .get('/', { params: { i: movieId } })
                .then(response => {
                    console.log({ response });
                    this.movieDetails = { ...response.data };
                    this.imdbRating = parseInt(this.movieDetails.imdbRating, 10);
                    this.dataIsReady = true;
                });
        },

        toggleFavorite () {
            this.isFavorite = !this.isFavorite;

            if (this.isFavorite) {
                this.favoritesIds.push(this.$route.params.movieId);
                this.favorites.push(this.movieDetails);
                localStorage.setItem('movieFavoritesIds', JSON.stringify(this.favoritesIds));
                localStorage.setItem('movieFavorites', JSON.stringify(this.favorites));
            } else {
                const index = this.favoritesIds.findIndex(x => x === this.$route.params.movieId);
                this.favoritesIds.splice(index, 1);
                this.favorites.splice(index, 1);
                localStorage.setItem('movieFavoritesIds', JSON.stringify(this.favoritesIds));
                localStorage.setItem('movieFavorites', JSON.stringify(this.favorites));
            }

        }
    }
};
</script>

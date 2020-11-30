<template>
    <div class="search_results">

        <p
            v-if="!moviesList || !moviesList.length"
            class="search_results__no_results">
            There are no results to display.
            <br>
            Try a (different) search.
        </p>

        <template v-else>

            <moon-loader
                v-if="isLoading"
                class="search_results__loader"
                color="#2196f3"
                :loading="isLoading"
                :size="150"
                sizeUnit="px"
            />

            <template v-else>

                <div class="search_results__layout_options">
                    <a
                        role="button"
                        class="search_results__layout_btn"
                        @click="listLayout = 'is-list-view'">
                        <i class="icon icon-view_list"></i>
                    </a>
                    <a
                        role="button"
                        class="search_results__layout_btn"
                        @click="listLayout = 'is-grid-view'">
                        <i class="icon icon-view_comfy"></i>
                    </a>
                </div>

                <div
                    class="search_results__heading"
                    v-if="listLayout === 'is-list-view'">
                    <span></span>
                    <span>Name</span>
                    <span>Year</span>
                    <span>Type</span>
                    <span></span>
                </div>

                <ul
                    class="search_results__list"
                    :class="listLayout">

                    <li
                        v-for="movie in moviesList"
                        :key="movie.imdbID"
                        class="search_results__item">

                        <router-link
                            :to="{name: 'DetailPage', params: {movieId: movie.imdbID }}"
                            class="search_results__link">
                            <div class="search_results__item_figure_wrap">
                                <figure class="search_results__item_figure">
                                    <img
                                        v-if="movie.Poster !== 'N/A'"
                                        :src="movie.Poster"
                                        :alt="movie.Title">
                                    <p v-else>Image not available</p>
                                </figure>
                            </div>
                            <div class="search_results__item_info">
                                <p class="search_results__item_name">{{ movie.Title }}</p>

                                <template v-if="listLayout === 'is-grid-view'">
                                    <p
                                        class="search_results__item_meta">
                                        {{ movie.Year }} - {{ movie.Type }}
                                    </p>
                                </template>
                                <template v-else>
                                    <p class="search_results__item_year"><span>Year: </span>{{ movie.Year }}</p>
                                    <p class="search_results__item_type"><span>Type:</span>{{ movie.Type }}</p>
                                </template>

                                <a
                                    role="button"
                                    class="search_results__favorite_btn"
                                    @click.prevent="toggleFavorite(movie)">
                                    <i
                                        class="icon"
                                        :class="setFavoriteClass(movie.imdbID)"></i>
                                </a>
                            </div>
                        </router-link>

                    </li>
                </ul>

                <div class="search_results__pagination">
                    <a
                        role="button"
                        class="search_results__prev_page"
                        :class="{'is-disabled': page === 1}"
                        @click="requestPrevPage()"
                    >
                        <i class="icon icon-navigate_before"></i>
                        Previous
                    </a>

                    <p class="search_results__pagination_info">
                        {{ paginationInfo }}
                    </p>

                    <a
                        role="button"
                        class="search_results__next_page"
                        :class="{'is-disabled': page === totalPages}"
                        @click="requestNextPage()">
                        Next
                        <i class="icon icon-navigate_next"></i>
                    </a>

                </div>
            </template>

        </template>

    </div>

</template>

<script>
import Vue from 'vue';
import { VueSpinners } from '@saeris/vue-spinners';

Vue.use(VueSpinners);

export default {
    name: 'SearchResults',

    props: {
        moviesList: {
            type: Array,
            required: false
        },
        page: {
            type: Number,
            required: true,
            default: 1
        },
        totalResults: {
            type: Number,
            required: true,
            default: 1
        },
        isLoading: {
            type: Boolean,
            required: true,
            default: true
        }
    },

    data () {
        return {
            listLayout: 'is-grid-view',
            totalPages: Math.ceil(this.totalResults / 10),
            favoritesIds: JSON.parse(localStorage.getItem('movieFavoritesIds')) || [],
            favorites: JSON.parse(localStorage.getItem('movieFavorites')) || [],
        };
    },

    computed: {
        paginationInfo () {
            const fromNumber = this.page > 1 ? `${this.page - 1}1` : 1;
            const toNumber = this.totalResults < this.page * 10 ? ((this.page - 1) * 10) + (this.totalResults % 10) : this.page * 10;
            const string = `${fromNumber} - ${toNumber} of ${this.totalResults}`;
            return string;
        }
    },

    methods: {
        requestPrevPage () {
            if (this.page === 1) return;

            this.$emit('emitSearch', { page: this.page - 1 });
        },

        requestNextPage () {
            if (this.page === this.totalPages) return;

            this.$emit('emitSearch', { page: this.page + 1 });
        },

        setFavoriteClass (movieId) {

            const isInFavorites = this.favoritesIds.includes(movieId);

            if (isInFavorites) {
                return 'icon-star';
            }
            return 'icon-star_outline1';

        },

        toggleFavorite (movie) {
            const isInFavorites = this.favoritesIds.includes(movie.imdbID);

            if (isInFavorites) {
                const index = this.favoritesIds.findIndex(x => x === movie.imdbID);
                this.favoritesIds.splice(index, 1);
                this.favorites.splice(index, 1);
                localStorage.setItem('movieFavoritesIds', JSON.stringify(this.favoritesIds));
                localStorage.setItem('movieFavorites', JSON.stringify(this.favorites));
            } else {
                this.favoritesIds.push(movie.imdbID);
                this.favorites.push(movie);
                localStorage.setItem('movieFavoritesIds', JSON.stringify(this.favoritesIds));
                localStorage.setItem('movieFavorites', JSON.stringify(this.favorites));
            }

            this.$emit('toggleFavorites', true);

        }
    }
};
</script>

<template>
    <form class="search_form">

        <div class="search_form__row_wrap">
            <label
                for="name-title"
                class="search_form__label">Name / Title</label>
            <input
                v-model="movieName"
                type="text"
                name="name-title"
                class="search_form__input"
                placeholder="Name / Title">
        </div>

        <div class="search_form__row_wrap">
            <label
                for="year"
                class="search_form__label">Year</label>
            <input
                v-model="movieYear"
                type="number"
                name="year"
                class="search_form__input"
                placeholder="Year">
        </div>

        <div
            class="search_form__row_wrap has-select"
            @click="toggleSelect = !toggleSelect">
            <label
                for="type"
                class="search_form__label">Type</label>
            <div
                class="search_form__select"
            >
                <div
                    class="search_form__select_wrap"
                    :class="{'is-opened': toggleSelect}">
                    <span>{{ movieType }}</span>
                    <span @click.prevent="movieType = 'movie'">Movie</span>
                    <span @click.prevent="movieType = 'series'">Series</span>

                </div>
            </div>
        </div>

        <div class="search_form__button_wrap">
            <a
                role="button"
                class="search_form__submit_btn"
                @click="emitSearch()">
                Search
            </a>
        </div>

    </form>
</template>

<script>
export default {
    name: 'SearchForm',

    data () {
        return {
            movieName: this.$route.query.s || '',
            movieYear: this.$route.query.y || '',
            movieType: this.$route.query.type || 'Type',
            toggleSelect: false
        };
    },

    methods: {

        emitSearch () {
            const object = {
                name: this.movieName,
                year: this.movieYear,
                type: this.movieType
            };
            this.$emit('emitSearch', object);
        }

    }

};
</script>

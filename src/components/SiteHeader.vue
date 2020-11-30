<template>
    <header class="header">
        <div class="header__inner_wrap">
            <router-link
                :to="{name: 'Home'}"
                class="header__logo">
                Movies&Series
            </router-link>

            <a
                role="button"
                class="header__nav_toggle"
                @click="showNav = !showNav">
                <i class="icon icon-menu"></i>
            </a>

            <nav
                class="nav"
                :class="{'is-active': showNav}">
                <router-link
                    :to="{name: 'Home'}"
                    exact
                    class="nav__link"
                    @click.native="showNav = false">
                    Home
                </router-link>
                <router-link
                    :to="{name: 'Favorites'}"
                    class="nav__link"
                    @click.native="showNav = false">
                    Favorites
                </router-link>
            </nav>
        </div>
    </header>
</template>

<script>
export default {
    name: 'SiteHeader',

    data () {
        return {
            showNav: false
        };
    }
};
</script>

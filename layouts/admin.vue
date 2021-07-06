<template>
    <div>
        <Nuxt/>
    </div>
</template>

<script>
import TheHeader from '@/components/navigation/TheHeader.vue'
import TheSidenav from '@/components/navigation/TheSidenav.vue'
export default {
    components:{
        TheHeader,
        TheSidenav
    },
    data(){
        return{
            displaySidenav: false
        }
    }
}
</script>

<style>
    html{
        font-family: 'Open Sans', sans-serif;
    }

    body{
        margin: 0
    }
</style>
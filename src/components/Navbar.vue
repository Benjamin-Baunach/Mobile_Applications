<template>
    <nav class="w-full justify-between flex-row items-center flex gap-4 bg-emerald-100 dark:bg-emerald-950 py-4 px-3 border-b border-emerald-200 dark:border-emerald-600">
        <div class="flex flex-row gap-x-9 items-center">
            <router-link :to="backroute" v-if="backroute">
                <slot name="backbutton" />
            </router-link>
            <slot name="title" />
        </div>
        <slot name="right" />
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    props: {
        backroute: {
            type: String,
            default: null
        }
    }
}
</script>
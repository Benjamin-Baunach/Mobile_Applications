<template>
    <nav class="w-full justify-center flex flex-row gap-4 bg-emerald-100 py-4 mb-5">
        <router-link to="/" class="flex flex-row gap-4">
            <img src="@/assets/logo.png" alt="Vue logo" class="h-8" />
            <p class="text-lg font-bold">BubbleChat</p>
        </router-link>
    </nav>
</template>

<script>
export default {
    name: 'AuthNavbar',
}
</script>
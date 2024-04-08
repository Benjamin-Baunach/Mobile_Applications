<template>
    <router-link :to="linkTo" class="flex items-center flex-row gap-5">
        <slot name="icon" />
        <slot name="content">
            <div class="flex flex-col flex-1">
                <div class="flex flex-col gap-y-1 justify-between items-start w-full">
                    <p class="text-base text-neutral-950 dark:text-neutral-50">{{title}}</p>
                    <p class="text-sm text-neutral-400 dark:text-neutral-500">{{ subtitle }}</p>
                </div>
            </div>
        </slot>
        <slot name="action" />
    </router-link>
</template>

<script>
    import {
        Check,
        CheckCheck,
    } from 'lucide-vue-next'
    
    export default {
        name: 'ListItem',
        props: {
            linkTo: {
                type: undefined,
                required: true,
            },
            title: {
                type: String,
                default: 'Title',
            },
            subtitle: {
                type: String,
                default: 'Subtitle',
            },
        },
    }

</script>
<template>
    <router-link to="/" class="flex flex-row gap-4" v-if="lastActivity!==undefined && lastChatMessage!==undefined">
        <Avatar class="bg-primary-600 h-14 w-14 rounded-full flex items-center justify-center">
            <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
            <AvatarFallback>fallbackImage</AvatarFallback>
        </Avatar>
        <div class="flex flex-col flex-1">
            <div class="flex justify-between items-start w-full">
                <p class="text-xl text-neutral-950">{{name}}</p>
                <p class="text-base text-neutral-950">{{ formattedDate(lastActivity) }}</p>
            </div>
            <div class="flex gap-x-2 text-base items-center text-neutral-500">
                <CheckCheck class="stroke-blue-400" size="16" />
                <p class="truncate w-full" v-html="lastChatMessage" />
            </div>
        </div>
    </router-link>

    <div v-else class="flex items-center space-x-4">
        <Skeleton class="h-14 w-14 rounded-full" />
        <div class="space-y-2">
            <Skeleton class="h-4 w-[250px]" />
            <Skeleton class="h-4 w-[200px]" />
        </div>
    </div>
</template>

<script>
    import {
        Check,
        CheckCheck,
    } from 'lucide-vue-next'
    import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
    import { Skeleton } from '@/components/ui/skeleton'
    import fallbackImage from '@/assets/user-fallback.svg'
    
    export default {
        name: 'ChatListItem',
        components: {
            Check,
            CheckCheck,
            Avatar,
            AvatarFallback,
            AvatarImage,
            Skeleton,
            fallbackImage,
        },
        props: {
            name: {
                type: String,
                required: true,
            },
            lastActivity: {
                type: undefined,
                required: true,
            },
            lastChatMessage: {
                type: undefined,
                required: true,
            },
        },
        methods: {
            formattedDate(time) {
                const dateParts = time.split('_');
                const date = new Date(dateParts[0].replace(/-/g, '/') + ' ' + dateParts[1].replace(/-/g, ':'));
                const today = new Date();
                const yesterday = new Date(today);
                yesterday.setDate(yesterday.getDate() - 1);

                // If the date is today, display only hour and minute
                if (date.toDateString() === today.toDateString()) {
                    const options = { hour: 'numeric', minute: 'numeric' };
                    return date.toLocaleTimeString(navigator.language, options);
                }

                // If the date is yesterday, display "yesterday"
                if (date.toDateString() === yesterday.toDateString()) {
                    return 'Yesterday';
                }

                // If the date is within the last week, display weekday
                const diffInDays = Math.ceil((today - date) / (1000 * 60 * 60 * 24));
                if (diffInDays <= 7) {
                    const options = { weekday: 'long', hour: 'numeric', minute: 'numeric' };
                    return date.toLocaleDateString(navigator.language, options);
                }

                // Otherwise, display the full date
                const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
                return date.toLocaleDateString(navigator.language, options);
            }
        },
    }

</script>
<script setup>
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'

const logout = () => {
  console.log('Logout')
}
</script>

<template>
  <Drawer>
    <DrawerTrigger>
        <slot name="trigger" />
    </DrawerTrigger>
    <DrawerContent>
      <DrawerTitle />
      <DrawerHeader>
        <h1 class="text-3xl font-bold text-center">Logout</h1>
        <hr class="my-4 bg-gray-400" />
        <DrawerDescription>
          <p class="text-base text-center text-neutral-500 dark:text-neutral-400">
            Are you sure you want to logout?
          </p>
        </DrawerDescription>
      </DrawerHeader>
      <DrawerFooter>
        <div class="flex gap-x-[50px] justify-center mb-5">
          <DrawerClose class="w-[150px]">
            <Button variant="outline" class="w-full">
              Cancel
            </Button>
          </DrawerClose>
          <Button class="w-[150px]" @click="logout">Logout</Button>
        </div>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
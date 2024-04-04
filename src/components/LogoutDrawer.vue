<script setup lang="ts">
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
</script>

<template>
  <Drawer>
    <DrawerTrigger>
        <slot name="trigger" />
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <h1 class="text-3xl font-bold">Logout</h1>
        <hr class="my-4 bg-gray-400" />
      </DrawerHeader>
      <DrawerFooter>
        <div class="flex gap-x-[50px] justify-center mb-5">
          <DrawerClose class="w-[150px]">
            <Button variant="outline" class="w-full">
              Cancel
            </Button>
          </DrawerClose>
          <Button class="w-[150px]">Submit</Button>
        </div>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
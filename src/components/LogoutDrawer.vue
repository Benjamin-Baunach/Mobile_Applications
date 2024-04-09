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
import api from '@/api';
import router from '@/router/router';

async function logout() {
  const stayLoggedToken = localStorage.getItem('tokenStayLogged');
  const token = JSON.parse(localStorage.getItem('token')).token;

  console.log(token, " ", stayLoggedToken);


  if (token || stayLoggedToken) {
    try {
      const response = await api.logout(token);

      if (response && response.status === 'ok') {
        // Token aus dem localStorage entfernen
        router.push({ path: '/' });
        if (token) {
          localStorage.removeItem('token');
        }
        if (stayLoggedToken) {
          localStorage.removeItem('tokenStayLogged');
        }
        // Benutzer zur Startseite weiterleiten
      } else {
        console.log('Logout fehlgeschlagen');
      }
    } catch (error) {
      console.log("Fehler", error);
    }
  }
};


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


<script>
export default {
  name: 'LofoutDrawer',
  data() {
    return {
    };
  },
}

</script>
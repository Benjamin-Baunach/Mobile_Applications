import { useColorMode } from '@vueuse/core'
const mode = useColorMode();

export default {
    setDarkMode() {
        mode.value = 'dark';
    },
    setLightMode() {
        mode.value = 'light';
    },
    setSystemMode() {
        mode.value = 'system';
    },
    isDarkMode() {
        return mode.value === 'dark';
    }
}
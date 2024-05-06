// store.js
import { reactive } from 'vue'

export const store = reactive({
  messages: [],
  setMessages(messages) {
    this.messages.push(messages)
  },
  clearMessages() {
    this.messages = []
  }
})
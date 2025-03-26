<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import 'element-plus/dist/index.css'
import './styles/index.scss'

const setRem = () => {
  const baseSize = 192
  const scale = window.innerWidth / 1920
  document.documentElement.style.fontSize = `${baseSize * scale}px`
}

onMounted(() => {
  setRem()
  window.addEventListener('resize', setRem)
})

onUnmounted(() => {
  window.removeEventListener('resize', setRem)
})
</script>

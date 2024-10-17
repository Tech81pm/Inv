<template>
  <div class="app">
    <MainSidebar />
    <div class="content">
      <HeaderAppbar />
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import MainSidebar from "./components/base/MainSidebar.vue";
import HeaderAppbar from "./components/base/HeaderAppbar.vue";
</script>

<style lang="scss">
:root {
  --primary: green;
  --primary-alt: lightgreen;
  --grey: gray;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --sidebar-width: 300px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira Sans', sans-serif;
}

body {
  background: var(--light);
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

.app {
  display: flex;

  .content {
    display: flex;
    flex-direction: column;
    flex: 1; // Ensure content area takes remaining space

    // Style for Appbar
    Appbar {
      flex-shrink: 0; // Prevent Appbar from shrinking
    }

    main {
      flex: 1 1 0; // Main content area fills the rest
      padding: 2rem;

      @media (max-width: 786px) {
        padding-left: 6rem; // Responsive padding for smaller screens
      }
    }

    &.content {
      @media (max-width: 786px) {
        padding-left: 4rem; // Responsive padding for smaller screens
      }
    }
  }
}
</style>

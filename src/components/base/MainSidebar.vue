<template>
    <aside :class="{ 'is-expanded': is_expanded }">
      <div class="menu-toggle-wrap">
        <button class="menu-toggle" @click="ToggleMenu">
          <span class="material-icons">menu</span>
        </button>
      </div>
  
      <div class="menu">
        <router-link class="button" to="/">
          <span class="material-icons">home</span>
          <span class="text">Home</span>
        </router-link>
        <router-link class="button" to="/assets">
          <span class="material-icons">density_small</span>
          <span class="text">Assets</span>
        </router-link>
        <router-link class="button" to="/accessories">
          <span class="material-icons">category</span>
          <span class="text">Accessories</span>
        </router-link>
        <router-link class="button" to="/components">
          <span class="material-icons">category</span>
          <span class="text">Components</span>
        </router-link>
        <router-link class="button" to="/consumables">
          <span class="material-icons">category</span>
          <span class="text">Consumables</span>
        </router-link>
        <div class="button" @click="toggleSettings">
          <span class="material-icons">settings</span>
          <span class="text">Settings</span>
          <span class="material-icons dropdown-icon" :class="{ 'expanded': settingsExpanded }">arrow_drop_down</span>
        </div>
        <div :class="{ 'v-show': settingsExpanded }" class="dropdown-menu">
          <router-link class="dropdown-item" to="/company" exact-active-class="router-link-exact-active">Company</router-link>
          <router-link class="dropdown-item" to="/categories" exact-active-class="router-link-exact-active">Categories</router-link>
          <router-link class="dropdown-item" to="/fieldset" exact-active-class="router-link-exact-active">Custom Desktop FieldSet</router-link>
          <router-link class="dropdown-item" to="/assetModel" exact-active-class="router-link-exact-active">Asset Model</router-link>
          <router-link class="dropdown-item" to="/manufacturer" exact-active-class="router-link-exact-active">Manufacturer</router-link>
          <router-link class="dropdown-item" to="/supplier" exact-active-class="router-link-exact-active">Supplier</router-link>
        </div>
      </div>
    </aside>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const is_expanded = ref(false);
  const settingsExpanded = ref(false);
  
  const ToggleMenu = () => {
    is_expanded.value = !is_expanded.value;
  };
  const toggleSettings = () => {
    settingsExpanded.value = !settingsExpanded.value;
  };
  </script>
  
  <style lang="scss" scoped>
  aside {
    display: flex;
    flex-direction: column;
    width: calc(2rem + 32px);
    min-height: 100vh;
    overflow: hidden;
    padding: 1rem;
  
    background-color: var(--dark);
    color: var(--light);
    transition: 0.2s ease-out;
  
    .menu-toggle-wrap {
      display: flex;
      justify-content: flex-end;
      transition: 0.2s ease-out;
      margin-bottom: 2rem;
  
      .menu-toggle {
        transition: 0.2s ease-out;
  
        .material-icons {
          font-size: 2rem;
          color: var(--light);
          transition: 0.2s ease-out;
        }
  
        &:hover {
          .material-icons {
            color: var(--primary);
            transform: translateX(0.2rem);
          }
        }
      }
    }
  
    h5,
    .button .text {
      opacity: 0;
      transition: 0.3s ease-out;
    }
  
    .menu {
      margin: 0 -1rem;
  
      .button {
        display: flex;
        align-items: center;
        text-decoration: none;
        padding: 0.5rem 1rem;
        transition: 0.2s ease-out;
  
        .material-icons {
          font-size: 2rem;
          color: var(--light);
          transition: 0.2s ease-out;
        }
  
        .text {
          color: var(--light);
          transition: 0.2s ease-out;
        }
  
        &:hover,
        &.router-link-exact-active {
          background-color: var(--dark-alt);
  
          .material-icons,
          .text {
            color: var(--primary);
          }
        }
  
        &.router-link-exact-active {
          border-right: 5px solid var(--primary);
        }
      }
  
      .dropdown-menu {
        padding-left: 4rem;
        background-color: var(--dark);
        border-radius: 0.25rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        position: absolute;
        width: 300px;
        z-index: 100;
        display: block;
        opacity: 1;
        transition: opacity 0.3s ease;

        .dropdown-item {
          text-align: center;  
          padding: 10px;
          color: white;
          text-decoration: none;
          display: flex;
          align-content: center;
          
          background-color: var(--dark);
  
          &:hover {
            background-color: var(--dark-alt);
            color: var(--primary);
          }
  
          &.router-link-exact-active {
            background-color: var(--dark-alt);
            border-right: 5px solid var(--primary);
          }
        }
      }
  
      .dropdown-menu {
        display: none;
      }
  
      .dropdown-menu.v-show {
        display: block;
      }
    }
  
    &.is-expanded {
      width: var(--sidebar-width);
  
      .menu-toggle-wrap {
        top: -3rem;
  
        .menu-toggle {
          transform: rotate(-180deg);
        }
      }
  
      h5,
      .button .text {
        opacity: 1;
      }
  
      .button {
        .material-icons {
          margin-right: 1rem;
        }
      }
    }
  
    @media (max-width: 768px) {
      position: fixed;
      z-index: 99;
    }
  }
  </style>
  
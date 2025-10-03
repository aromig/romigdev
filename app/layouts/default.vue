<template>
  <div class="layout">
    <header class="header">
      <div class="site-logo">
        <NuxtLink to="/">
          <img src="/images/logo-icon.png" />
          Adam Romig
        </NuxtLink>
      </div>
      <NavMenu />
    </header>
    <transition name="fade" appear>
      <main><slot /></main>
    </transition>
    <Footer />
  </div>
</template>

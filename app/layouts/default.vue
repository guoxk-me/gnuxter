<template>
  <div class="flex min-h-dvh flex-col bg-background text-foreground">
    <!-- AI modified: keep global chrome stable while route pages own only their content. -->
    <AppHeader />
    <main class="flex min-h-0 flex-1 flex-col">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

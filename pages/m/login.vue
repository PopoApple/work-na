<template>
  <PageLogin />
</template>
<script>
export default {
  middleware: 'notAuthenticated',
  layout: 'simple'
}
</script>
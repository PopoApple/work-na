<template>
  <PageMerchantDetailMain
    :merchantIntro="merchantIntro"
    :companyAttachmentDtoList="companyAttachmentDtoList"
  />
</template>
<script>
  export default {
    props: {
      merchantIntro: String,
      companyAttachmentDtoList: Array
    }
  }
</script>
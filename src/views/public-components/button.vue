<template>
<div class="button">
    <Button type="success">{{buttonName}}</Button>
</div>
   
</template>
<script>
export default {
  name: "button",
  props:["buttonName"]
};
</script>

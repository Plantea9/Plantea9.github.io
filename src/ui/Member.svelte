<script>
  export let member
</script>

<div style="--bg-url: url({member.foto.url})" class="member relative w-full pt-20 px-4 pb-0 md:lg:w-2/5 lg:w-2/5 h-64">
  <div class="pic absolute top-8 bg-cover rounded-full bg-gray-500 w-20 h-20"></div>
  <div class="info bg-white text-center rounded-xl pt-12 px-4 pb-4 shadow h-40">
    <span class="block"><strong>{member.nombre}</strong></span>
    <span class="block text-sm">{member.departamento}</span>
    <span class="block text-sm">{member.region}</span>
  </div>
</div>

<style>
  .pic {
    left: 38%;
    background-image: var(--bg-url);
  }
</style>
<script>
  import { getMedia } from '../graphql'
  import { members } from '../store'

  $: if ($members.length === 0) {
    getMedia([
      process.env.DATOCMS_YERKO_ID,
      process.env.DATOCMS_ROMINA_ID,
      process.env.DATOCMS_NATI_ID,
      process.env.DATOCMS_GHILIAN_ID,
      process.env.DATOCMS_CARI_ID
    ]).then(l => members.set(l))
  }
</script>

<div class="members flex flex-wrap">
  {#each $members as member}
    <div class="member w-full md:w-1/2 text-center">
      <div class="member-avatar overflow-hidden h-48 md:h-64 relative">
        <img 
          class="{member.customData.css} absolute inset-x-0 transition-all" 
          src="{member.url}"
          alt="{member.alt}"
          >
      </div>
      <span class="block text-lg font-bold text-gray-700">{member.title}</span>
      <span class="block text-gray-500">{member.alt}</span>
    </div>
  {/each}
  <!-- <div class="member w-full md:w-1/2 text-center">
    <div class="member-avatar overflow-hidden h-48 md:h-64 relative">
      <img class="cary absolute inset-x-0 transition-all" src="{process.env.CARY_URL}">
    </div>
    <span class="block text-lg font-bold text-gray-700">Carina Fernandez / Vicepresidenta</span>
    <span class="block text-gray-500">Departamento de expresión</span>
  </div>

  <div class="member w-full md:w-1/2 text-center">
    <div class="member-avatar overflow-hidden h-48 md:h-64 relative">
      <img class="ghilian absolute inset-x-0 transition-all" src="{process.env.GHILIAN_URL}">
    </div>
    <span class="block text-lg font-bold text-gray-700">Ghilian Navea / Fundadora</span>
    <span class="block text-gray-500">Departamento de vinculación con el medio</span>
  </div>

  <div class="member w-full md:w-1/2 text-center">
    <div class="member-avatar overflow-hidden h-48 md:h-64 relative">
      <img class="nati absolute inset-x-0 transition-all" src="{process.env.NATI_URL}">
    </div>
    <span class="block text-lg font-bold text-gray-700">Nati Gonzales / Secretaria</span>
    <span class="block text-gray-500">Departamento de acompañamiento</span>
  </div>

  <div class="member w-full md:w-1/2 text-center">
    <div class="member-avatar overflow-hidden h-48 md:h-64 relative">
      <img class="romina absolute inset-x-0 transition-all" src="{process.env.ROMINA_URL}">
    </div>
    <span class="block text-lg font-bold text-gray-700">Romina Peña / Tesorera</span>
    <span class="block text-gray-500">Departamento de investigación</span>
  </div>

  <div class="member w-full md:w-1/2 text-center">
    <div class="member-avatar overflow-hidden h-48 md:h-64 relative">
      <img class="yerko absolute inset-x-0 transition-all" src="{process.env.YERKO_URL}">
    </div>
    <span class="block text-lg font-bold text-gray-700">Yerko Palma / Presidente</span>
    <span class="block text-gray-500">Departamento de informática</span>
  </div> -->
</div>

<style>
  img {
    width: 50%;
    margin: 0 auto;
    border-radius: 1rem;
    filter: grayscale(1);
    clip-path: circle(4.5rem at 50% 35%);
  }
  img:hover {
    filter: grayscale(0);
  }
  .romina {
    clip-path: circle(4.5rem at 50% 40%);
  }
  .romina, .ghilian, .nati, .yerko {
    top: 2rem;
  }
  @media (min-width: 768px) {
    img {
      clip-path: circle(6rem at 50% 35%);
    }
    .romina {
      clip-path: circle(6rem at 50% 46%);
    }
  }
</style>
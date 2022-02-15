<script>
  import { getMedia } from '../graphql'
  import { logo } from '../store'

  $: if (!$logo) {
    getMedia(process.env.DATOCMS_LOGO_ID).then(l => logo.set(l))
  }
</script>

<div class="flex items-center justify-center flex-col">
  <img class="w-40 inline-block" src="{$logo ? $logo.url : ''}" alt="Logo planTea">
  <span class="hero-span text-center w-3/5 sm:w-full">Compartiendo nuestro mundo</span>
</div>

<style>
  .hero-span {
    color: var(--accent);
    font-size: 2rem;
  }
</style>
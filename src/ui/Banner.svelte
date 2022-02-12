<script>
  import { query } from '../graphql'
  import { logo } from '../store'

  $: if (!$logo) {
    query`query MyQuery {
      allUploads(filter: {id: {eq: "${process.env.DATOCMS_LOGO_ID}"}}) {
        filename
        mimeType
        url
        id
        title
      }
    }`.then(l => logo.set(l.allUploads[0]))
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
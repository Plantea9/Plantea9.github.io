<script>
  let logo = {}
  ;(async () => {
    const response = await fetch(process.env.LOGO_URL)
    logo = await response.json()
  })()
</script>

<div class="flex items-center justify-center flex-col">
  <img class="w-40 inline-block" src="{logo.url}" alt="Logo planTea">
  <span class="hero-span text-center w-3/5 sm:w-full">Compartiendo nuestro mundo</span>
</div>

<style>
  .hero-span {
    color: var(--accent);
    font-size: 2rem;
  }
</style>
<script>
  let logo = {}
  ;(async () => {
    const response = await fetch(process.env.LOGO_ALT_URL)
    logo = await response.json()
  })()
</script>

<footer class="relative">
  <div class="flex justify-around pb-4 pt-8">
    <div class="flex justify-around items-center text-white w-20">
      <a target="_blank" href="https://www.instagram.com/plantea9/" class="instagram visited:text-gray-100">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
      </a>
      <a target="_blank" href="https://twitter.com/plantea9" class="twitter visited:text-gray-100">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
      </a>
    </div>

      <a href="/">
        {#if logo && logo.formats}
          <img src="{logo.formats.thumbnail.url}" alt="Logo planTea">
        {/if}
      </a>

    <div class="site">
      <ul class="list-none">
        <li><a href="/" class="text-white visited:text-gray-100">Inicio</a></li>
        <li><a href="/resources" class="text-white visited:text-gray-100">Recursos</a></li>
        <li><a href="/blog" class="text-white visited:text-gray-100">Blog</a></li>
      </ul>
    </div>
  </div>
  <small class="text-center w-full block py-2 text-gray-100 text-xs">© Plantea 2021, todos los derechos reservados</small>
</footer>

<style>
  img {
    width: 80px;
  }
  footer {
    background-color: var(--pale-purple-2);
  }
  /* small {
    background-color: var(--accent);
  } */
</style>
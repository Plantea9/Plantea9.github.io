<script>
  let logo = {}
  ;(async () => {
    const response = await fetch(process.env.LOGO_ALT_URL)
    logo = await response.json()
  })()
</script>

<footer class="relative">
  <svg class="absolute" viewBox="0 0 1440 320"><path fill="#8048b7" fill-opacity="1" d="M0,192L80,181.3C160,171,320,149,480,149.3C640,149,800,171,960,165.3C1120,160,1280,128,1360,112L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>

  <div class="footer-body">
    <div class="links">
      <a href="/">
        {#if logo && logo.formats}
          <img src="{logo.formats.thumbnail.url}" alt="Logo planTea">
        {/if}
      </a>
      <div class="social">
        <a class="instagram">@plantea</a>
        <a class="twitter">@plantea</a>
      </div>
    </div>

    <div class="site">
      <ul>
        <li><a>Inicio</a></li>
        <li><a>Recursos</a></li>
        <li><a>Blog</a></li>
      </ul>
    </div>
  </div>
</footer>

<style>
  footer {
    @apply relative;
  }
  svg {
    @apply absolute;
    bottom: 0;
    z-index: -10;
  }
  .footer-body {
    display: flex;
    justify-content: space-around;
  }
  .links {
    display: flex;
  }
  .links .social {
    display: flex;
    flex-direction: column;
    color: #fff;
    margin-left: 2rem;
  }
  .links img {
    width: 80px;
  }
  .links .instagram {
    margin-bottom: 1rem;
    margin-top: .5rem;
  }
  .site li {
    list-style: none;
  }
  .site li a,
  .links a {
    color: #fff;
  }
</style>
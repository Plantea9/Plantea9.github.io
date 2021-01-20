<script>
  let logo = {}
  ;(async () => {
    const response = await fetch(process.env.LOGO_URL)
    logo = await response.json()
  })()
</script>

<div class="hero">
  <img src="{logo.url}" alt="Logo planTea">
  <span>Compartiendo nuestro mundo</span>
</div>

<style>
  .active {
    cursor: grabbing;
  }
  .hero {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .hero img {
    width: 150px;
    display: inline-block;
  }
  .hero span {
    color: #8048b7;
    text-align: center;
    font-size: 2rem;
    width: 60%;
  }
  @media (max-width: 768px) {
    .hero img {
      width: 200px;
    }
    .hero span {
      width: 100%;
    }
  }
</style>
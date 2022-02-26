<script>
  export let member
</script>

<div style="--bg-url: url({member.foto.url})" class="member relative w-full md:lg:w-2/5 lg:w-2/5 h-64">
  <div class="pic absolute bg-gray-500 w-20 h-20"></div>
  <!-- <img class="absolute" src="{member.foto.url}" alt="{member.foto.alt}"/> -->
  <div class="info shadow h-40">
    <span><strong>{member.nombre}</strong></span>
    <span class="text-sm">{member.departamento}</span>
    <span class="text-sm">{member.region}</span>
  </div>
</div>

<style>
  img {
    width: 10rem;
    margin: 0 auto;
    border-radius: 1rem;
    filter: grayscale(1);
    clip-path: circle(4.5rem at 50% 35%);
    transform: scale(.5);
    top: 0;
    left: 0;
    right: 0;
  }
  img:hover {
    filter: grayscale(0);
  }
  .info {
    background-color: #fff;
    padding: 3rem 1rem 1rem;
    border-radius: 10px;
    text-align: center;
  }
  .info span {
    display: block;
  }
  .member {
    padding: 5rem 1rem 0;
  }
  .pic {
    top: 2rem;
    left: 38%;
    border-radius: 50px;
    background-image: var(--bg-url);
    background-size: cover;
  }
</style>
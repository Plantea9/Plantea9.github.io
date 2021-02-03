<script>
  export let id
  let post
  $: if (id) {
    getData()
  }
  async function getData () {
    const response = await fetch(`${process.env.POSTS_URL}/${id}`)
    post = await response.json()
  }
</script>

{#if post && post.Contenido}
  <div class="post">
    {@html post.Contenido}
  </div>
{/if}

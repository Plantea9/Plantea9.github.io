<script>
  import Member from '../ui/Member.svelte'
  import { query } from '../graphql'
  import { members } from '../store'

  $: if ($members.length === 0) {
    query`query MyQuery {
      allMiembros {
        departamento
        foto {
          url
        }
        fundador
        id
        nombre
        region
      }
    }`.then(l => members.set(l.allMiembros))
  }
</script>

<div class="members flex flex-wrap justify-between">
  {#each $members as member}
    <Member {member}></Member>
  {/each}
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
  :global(.romina) {
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
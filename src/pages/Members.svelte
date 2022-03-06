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
    }`.then(l => members.set(l.allMiembros.sort((a, b) => b.fundador ? 1 : -1)))
  }
</script>

<div class="members flex flex-wrap justify-between">
  {#each $members as member}
    <Member {member}></Member>
  {/each}
</div>

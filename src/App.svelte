<script>
  import { GoogleAnalytics } from '@beyonk/svelte-google-analytics'
  import { Router, Route } from 'svelte-routing'
  import Index from './pages/Index.svelte'
  import Resources from './pages/Resources.svelte'
  import Blog from './pages/Blog.svelte'
  import Post from './pages/Post.svelte'
  import Footer from './ui/Footer.svelte'
  import Header from './ui/Header.svelte'
  import Members from './pages/Members.svelte'

  export let url = ''
  const links = [
    { href: '/', name: 'Inicio' },
    { href: '/resources', name: 'Recursos' },
    { href: '/blog', name: 'Blog' },
    { href: '/members', name: 'Nosotros' }
  ]
</script>

<GoogleAnalytics properties={[ '262801169' ]} />

<Router {url}>
  <Header {links}></Header>

  <main class="my-0 mx-auto relative max-w-4xl bg-transparent p-8 box-border z-10 pb-16 sm:pt-16">
    <Route path='/members' component={Members}></Route>
    <Route path='/resources' component={Resources}></Route>
    <Route path='/blog/:id' let:params>
      <Post id={params.id}></Post>
    </Route>
    <Route path='/blog' component={Blog}></Route>
    <Route path='/' component={Index}></Route>
  </main>
</Router>

<Footer></Footer>

<svelte:head>
  <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
</svelte:head>

<style>
  main {
    min-height: calc(100vh - 232px);
  }

  @media only screen and (max-width : 768px) {
    main {
      min-height: calc(100vh - 208px);
    }
  }
</style>
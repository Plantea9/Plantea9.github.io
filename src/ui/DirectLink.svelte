<script>
  export let src
  export let href
  export let desc
  export let width = '100%'
  export let center = false

  export let chico = false
</script>

<style>
  a {
    display: block;
  }
  .center {
    margin: 0 auto;
  }

  figure.chico {
    position: relative;
  }
  figure.chico picture > * {
    transition: opacity 0.35s, transform 0.35s;
    transform: scale(1.12);
  }
  figure.chico:hover picture > * {
    opacity: 0.5;
    transform: scale(1);
  }
  figure.chico figcaption {
    right: 30px;
    bottom: 100px;
    left: 30px;
    position: absolute;
  }
  figure.chico p {
    opacity: 0;
    transition: opacity 0.35s, transform 0.35s;
  }
  figure.chico p {
    margin: 0 auto;
    max-width: 200px;
    transform: scale(1.5);
  }
  figure.chico:hover p {
    opacity: 1;
    transform: scale(1);
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
    background-color: var(--bg-2);
    padding: .5rem;
  }
  @media (max-width: 768px) {
    picture > * {
      width: 100%;
    }
    a {
      width: 100% !important;
    }
    figure.chico picture > * {
      opacity: 0.5;
      transform: scale(1);
    }
    figure.chico p {
      opacity: 1;
      transform: scale(1);
      text-align: center;
      font-size: 1.2rem;
      font-weight: bold;
      background-color: var(--bg-2);
      padding: .5rem;
    }
  }
</style>

<a class:center style="width: {width}" href="{href}">
  <figure class:chico>
    <picture>
      <source srcset="{src}" type="image/png"> 
      <img src="{src}" alt="{desc}">
    </picture>
    <figcaption>
      <p>{desc}</p>
    </figcaption>
  </figure>
</a>

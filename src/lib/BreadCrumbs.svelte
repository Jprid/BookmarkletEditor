<script lang="ts">
  import {fileName as name} from "$lib/stores"
</script>

<div class="title-font bread" style="padding-left: 1em">
  <span class="type">Bookmarklet&nbsp;</span>
  <!-- <span class="sep">&nbsp;></span> -->
  <span class="bread-crumb">{$name}</span>
</div>

<style>
  .type {
    /* border-top-right-radius: var(--breadcrumb-end); */
    /* border-bottom-right-radius: var(--breadcrumb-end); */
    background: var(--light-alt);
    z-index: 2;
    padding-right: 5px;
    margin-right: 5px;
    position: relative;
    padding-left: 1em;
  }
  .type::before {
    content: " ";
    background: var(--light-alt);
    transform: translateX(1em);
  }
  .type::after {
    content: "";
    position: absolute;
    width: 1.5vw;
    background: inherit;
    transform: rotate(43deg) translateY(4px);
    background: var(--light-alt);
    z-index: 2;
    height: 0.75vh;
    clip-path: polygon(0 0, 100% 0, 100% 100%);
    border-bottom: 2px solid var(--light-alt);
  }
  .bread {
    width: -webkit-fit-content;
    border-top-right-radius: var(--breadcrumb-end);
    border-bottom-right-radius: var(--breadcrumb-end);
    box-shadow: var(--drop-shadow-alt);
    background: var(--argentinian-blue);
  }
  .bread-crumb {
    position: relative;
    background: var(--carnation-pink);
    margin-left: -1.1em;
    padding-left: 1em;
    z-index: 1;
    border-top-right-radius: var(--breadcrumb-end);
    border-bottom-right-radius: var(--breadcrumb-end);
    padding-right: 0.5em;
  }
</style>

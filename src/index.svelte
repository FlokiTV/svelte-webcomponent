<script>
  import "./style.css";
  import Second from "./second.svelte";
  export let id;
  let inputBinding;

  function change() {
    inputBinding.value = "testing" + Math.round(Math.random() * 100);
  }
</script>

<div class="test">
  <h1 class="teste">teste: {id}</h1>
  <input type="text" name="testingInput" bind:this={inputBinding} />
</div>

<div class="secondStyle">
  <button on:click={change}>Click this buttons!</button>
  <Second />
</div>

<style>
  .teste {
    @apply text-3xl font-bold underline text-red-600;
  }
</style>

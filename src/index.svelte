<script>
  import "./style.css";
  import Second from "./second.svelte";
  export let id;
  export let doCount;
  export let count;
  let inputBinding;
  const _count = () => {
    count = doCount();
  };
  function change() {
    inputBinding.value = "testing" + Math.round(Math.random() * 100);
  }
</script>

<div class="test">
  {count}
  <h1 class="teste">teste: {id}</h1>
  <input type="text" name="testingInput" bind:this={inputBinding} />
</div>

<div class="secondStyle">
  <button on:click={_count}>COUNT</button>
  <button on:click={change}>Click this buttons!</button>
  <Second />
</div>
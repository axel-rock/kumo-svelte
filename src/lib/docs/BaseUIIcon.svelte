<script lang="ts">
  interface Props {
    size?: number;
    class?: string;
  }

  let { size = 20, class: className = '' }: Props = $props();
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class={className}
  aria-hidden="true"
>
  <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" stroke-width="2" />
  <path d="M8 8h4.5a3 3 0 0 1 0 6H8V8Z" stroke="currentColor" stroke-width="2" />
  <path d="M8 14h5a2.5 2.5 0 0 1 0 5H8v-5Z" stroke="currentColor" stroke-width="2" />
</svg>

<script lang="ts">
  import KumoLogo from '../logo/KumoLogo.svelte';
  interface Props { class?: string; title?: string; wordmark?: boolean; [key: string]: unknown; }
  let props: Props = $props();
</script>

<KumoLogo {...props} title={props.title ?? 'Kumo Svelte'} />

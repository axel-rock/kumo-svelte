<script lang="ts">
  import { InputArea } from 'kumo-svelte';
</script>

<InputArea
  label="Feedback"
  value="Bad"
  error={{
    message: 'Feedback must be at least 20 characters',
    match: 'tooShort'
  }}
  minlength={20}
/>

import { Button } from '@cloudflare/kumo/components/button';
import { Gear } from '@phosphor-icons/react';
import { Scenario } from '../Scenario';

const variants = [
  'primary',
  'secondary',
  'ghost',
  'destructive',
  'secondary-destructive',
  'outline',
] as const;

const sizes = ['xs', 'sm', 'base', 'lg'] as const;

export function ButtonGallery() {
  return (
    <>
      {variants.map((variant) => (
        <Scenario key={`v-${variant}`} id={`variant-${variant}`} label={variant}>
          <Button variant={variant}>Button</Button>
        </Scenario>
      ))}

      {variants.map((variant) => (
        <Scenario key={`d-${variant}`} id={`disabled-${variant}`} label={`${variant} disabled`}>
          <Button variant={variant} disabled>
            Button
          </Button>
        </Scenario>
      ))}

      {sizes.map((size) => (
        <Scenario key={`s-${size}`} id={`size-${size}`} label={`size ${size}`}>
          <Button variant="primary" size={size}>
            Button
          </Button>
        </Scenario>
      ))}

      <Scenario id="with-icon" label="with icon">
        <Button variant="secondary" icon={Gear}>
          Settings
        </Button>
      </Scenario>

      <Scenario id="loading" label="loading">
        <Button variant="primary" loading>
          Saving
        </Button>
      </Scenario>

      <Scenario id="shape-square" label="square">
        <Button variant="secondary" shape="square" icon={Gear} />
      </Scenario>

      <Scenario id="shape-circle" label="circle">
        <Button variant="secondary" shape="circle" icon={Gear} />
      </Scenario>

      <Scenario id="link" label="link button">
        <Button href="https://example.com" variant="secondary">
          Link
        </Button>
      </Scenario>

      <Scenario id="title-open" label="title tooltip" interact={[{ type: 'hover' }]} capture="page">
        <Button variant="secondary" title="Create a new Worker">
          Create Worker
        </Button>
      </Scenario>

      <Scenario id="hover-secondary" label="hover: secondary" interact={[{ type: 'hover' }]}>
        <Button variant="secondary">Hover me</Button>
      </Scenario>

      <Scenario id="focus-secondary" label="focus: secondary" interact={[{ type: 'focus' }]}>
        <Button variant="secondary">Focus me</Button>
      </Scenario>

      <Scenario id="hover-primary" label="hover: primary" interact={[{ type: 'hover' }]}>
        <Button variant="primary">Hover me</Button>
      </Scenario>

      <Scenario id="focus-primary" label="focus: primary" interact={[{ type: 'focus' }]}>
        <Button variant="primary">Focus me</Button>
      </Scenario>

      <Scenario id="hover-outline" label="hover: outline" interact={[{ type: 'hover' }]}>
        <Button variant="outline">Hover me</Button>
      </Scenario>
    </>
  );
}

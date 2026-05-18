import Root from './Pagination.svelte';
import Info from './PaginationInfo.svelte';
import PageSize from './PaginationPageSize.svelte';
import Controls from './PaginationControls.svelte';
import Separator from './PaginationSeparator.svelte';

const Pagination = Object.assign(Root, {
  Root,
  Info,
  PageSize,
  Controls,
  Separator
}) as typeof Root & {
  Root: typeof Root;
  Info: typeof Info;
  PageSize: typeof PageSize;
  Controls: typeof Controls;
  Separator: typeof Separator;
};

export {
  Pagination,
  Info as PaginationInfo,
  PageSize as PaginationPageSize,
  Controls as PaginationControls,
  Separator as PaginationSeparator
};
export type { PaginationLabels } from './context';

---
title: "Report Charts"
description: "Charts composed for analytics reports and dashboard summaries."
sourceFile: "components/chart"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
</script>

Report charts use the base chart primitives in report-sized compositions: a trend for movement over time, a comparison for ranked categories, and a breakdown for share-of-total views. Keep report charts visually quiet, with animation used to orient the eye on first render rather than to call attention to every update.

<ComponentSection>

## Report Dashboard

Combine a primary trend with supporting breakdowns when the report needs both direction and context.

<ComponentExample demo="ChartReportDashboardDemo" />

</ComponentSection>

<ComponentSection>

## Trend

Use line charts for report metrics that need direction, inflection, or comparison over time.

<ComponentExample demo="ChartReportTrendDemo" />

</ComponentSection>

<ComponentSection>

## Comparison

Use bars when the report compares discrete categories at a single point in time.

<ComponentExample demo="ChartReportComparisonDemo" />

</ComponentSection>

<ComponentSection>

## Breakdown

Use donut charts sparingly for compact share-of-total summaries.

<ComponentExample demo="ChartReportBreakdownDemo" />

</ComponentSection>

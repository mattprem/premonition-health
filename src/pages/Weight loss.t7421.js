import { revealOnEnter } from 'public/siteAnimations';
import { setupWeightLossPricingRepeaters } from 'public/weightLossPricing';

$w.onReady(function () {
  revealOnEnter($w, [
    '#weightLossOverviewSection',
    '#weightLossFitSection',
    '#weightLossProcessSection',
    '#weightLossSafetySection',
    '#weightLossPricingSection',
    '#weightLossSupportSection',
    '#weightLossFaqSection',
    '#weightLossFinalCtaSection'
  ]);

  setupWeightLossPricingRepeaters($w);
});

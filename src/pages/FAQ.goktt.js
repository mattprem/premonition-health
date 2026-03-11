import { setupAccordion } from 'public/siteAnimations';

$w.onReady(function () {
  setupAccordion($w, [
    { trigger: '#faqTrigger1', panel: '#faqPanel1', iconOpen: '#faqMinus1', iconClosed: '#faqPlus1' },
    { trigger: '#faqTrigger2', panel: '#faqPanel2', iconOpen: '#faqMinus2', iconClosed: '#faqPlus2' },
    { trigger: '#faqTrigger3', panel: '#faqPanel3', iconOpen: '#faqMinus3', iconClosed: '#faqPlus3' },
    { trigger: '#faqTrigger4', panel: '#faqPanel4', iconOpen: '#faqMinus4', iconClosed: '#faqPlus4' },
    { trigger: '#faqTrigger5', panel: '#faqPanel5', iconOpen: '#faqMinus5', iconClosed: '#faqPlus5' },
    { trigger: '#faqTrigger6', panel: '#faqPanel6', iconOpen: '#faqMinus6', iconClosed: '#faqPlus6' }
  ]);
});

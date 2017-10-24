import {
  createSimpleTransition,
  createJavaScriptTransition
} from '../../util';

import ExpandTransitionGenerator from './expand-transition';

export default {

  // Component specific transitions
  BottomSheetTranstion: createSimpleTransition('bottom-sheet-transition'),
  CarouselTransition: createSimpleTransition('carousel-transition'),
  CarouselReverseTransition: createSimpleTransition('carousel-reverse-transition'),
  TabTransition: createSimpleTransition('tab-transition'),
  TabReverseTransition: createSimpleTransition('tab-reverse-transition'),
  MenuTransition: createSimpleTransition('menu-transition'),
  FabTransition: createSimpleTransition('fab-transition', 'center center', 'out-in'),

  // Generic transitions
  DialogTransition: createSimpleTransition('dialog-transition'),
  DialogBottomTransition: createSimpleTransition('dialog-bottom-transition'),
  FadeTransition: createSimpleTransition('fade-transition'),
  ScaleTransition: createSimpleTransition('scale-transition'),
  SlideXTransition: createSimpleTransition('slide-x-transition'),
  SlideXReverseTransition: createSimpleTransition('slide-x-reverse-transition'),
  SlideYTransition: createSimpleTransition('slide-y-transition'),
  SlideYReverseTransition: createSimpleTransition('slide-y-reverse-transition'),

  // JavaScript transitions
  ExpandTransition: createJavaScriptTransition('expand-transition', ExpandTransitionGenerator()),
  RowExpandTransition: createJavaScriptTransition('row-expand-transition', ExpandTransitionGenerator('datatable__expand-col--expanded')),
}

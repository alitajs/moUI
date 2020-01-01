declare namespace Comp {
  type AvatarShape = 'square' | 'circle';
  type AvatarSize = 'default' | 'large' | 'small';
  type ButtonShape = 'block' | 'circle' | 'default' | 'round';
  type ButtonSize = 'default' | 'large' | 'small' | 'tiny';
  type ButtonType =
    | 'danger'
    | 'default'
    | 'ghost-danger'
    | 'ghost-href'
    | 'ghost-primary'
    | 'primary';
  type TagSize = 'default' | 'small' | 'tiny';

  interface TouchMoveXEvent<T = Record<string, unknown>, U = T>
    extends WXML.BaseEvent<T, U, { movedX: number }> {
    changedTouches: WXML.TouchDetail[];
    target: WXML.Element<U>;
    touches: WXML.TouchDetail[];
    type: 'change';
  }

  interface SwiperEndEvent<T = Record<string, unknown>, U = T>
    extends WXML.BaseEvent<T, U, WXML.SwiperChangeDetail> {
    target: WXML.Element<U>;
    type: 'swiperend';
  }
}

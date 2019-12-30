declare namespace Comp {
  type AvatarSize = 'default' | 'large' | 'small';
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

declare namespace WXML {
  interface TouchDetail {
    clientX: number;
    clientY: number;
    force: number;
    identifier: number;
    pageX: number;
    pageY: number;
  }

  interface Element<D = Record<string, unknown>> {
    dataset: D extends string ? Record<D, string> : D;
    id: string;
    offsetLeft: number;
    offsetTop: number;
  }

  interface BaseEvent<
    T = Record<string, unknown>,
    U = T,
    V = unknown,
    W = Record<string, unknown>
  > {
    currentTarget: Element<T>;
    detail: V;
    /**
     * @version
     * 2.7.1
     */
    mark?: W;
    target?: Element<U>;
    timeStamp: number;
    type: string;
  }

  /**
   * @deprecated
   */
  interface TapEvent<T = Record<string, unknown>, U = T>
    extends BaseEvent<T, U, { x: number; y: number }> {
    changedTouches: TouchDetail[];
    target: Element<U>;
    touches: TouchDetail[];
    type: 'tap';
  }

  interface CheckboxGroupChangeEvent<T = Record<string, unknown>, U = T>
    extends BaseEvent<T, U, { value: string[] }> {
    target: Element<U>;
    type: 'change';
  }

  interface EditorReadyEvent<T = Record<string, unknown>, U = T> extends BaseEvent<T, U> {
    type: 'ready';
  }

  interface FormResetEvent<T = Record<string, unknown>, U = T> extends BaseEvent<T, U> {
    target: Element<U>;
    type: 'reset';
  }

  interface FormSubmitEvent<V = Record<string, unknown>, T = Record<string, unknown>, U = T>
    extends BaseEvent<T, U, { formId?: string; value: V }> {
    target: Element<U>;
    type: 'submit';
  }

  interface GetUserInfoEvent<T = Record<string, unknown>, U = T>
    extends BaseEvent<T, U, wx.GetUserInfoSuccessCallbackResult | wx.GeneralCallbackResult> {
    target: Element<U>;
    type: 'getuserinfo';
  }

  interface InputBlurEvent<T = Record<string, unknown>, U = T>
    extends BaseEvent<T, U, { value: string; cursor: number }> {
    target: Element<U>;
    type: 'blur';
  }

  interface InputChangeEvent<T = Record<string, unknown>, U = T>
    extends BaseEvent<
      T,
      U,
      {
        value: string;
        cursor: number;
        /**
         * @version
         * 2.1.0
         */
        keyCode: string;
      }
    > {
    target: Element<U>;
    type: 'input';
  }

  interface InputConfirmEvent<T = Record<string, unknown>, U = T>
    extends BaseEvent<T, U, { value: string; cursor: number }> {
    target: Element<U>;
    type: 'confirm';
  }

  interface InputFocusEvent<T = Record<string, unknown>, U = T>
    extends BaseEvent<T, U, { value: string; height: number }> {
    target: Element<U>;
    type: 'focus';
  }

  interface KeyboardHeightChange<T = Record<string, unknown>, U = T>
    extends BaseEvent<T, U, { height: number; duration: number }> {
    type: 'keyboardheightchange';
  }

  interface SwiperChangeDetail {
    current: number;
    currentItemId: string;
    source: 'autoplay' | 'touch' | '';
  }

  interface SwiperChangeEvent<T = Record<string, unknown>, U = T>
    extends BaseEvent<T, U, SwiperChangeDetail> {
    target: Element<U>;
    type: 'change';
  }

  interface SwitchChangeEvent<T = Record<string, unknown>, U = T>
    extends BaseEvent<T, U, { value: boolean }> {
    target: Element<U>;
    type: 'change';
  }

  interface ScrollDetail {
    deltaX: number;
    deltaY: number;
    scrollHeight: number;
    scrollLeft: number;
    scrollTop: number;
    scrollWidth: number;
  }

  interface ScrollEvent<T = Record<string, unknown>, U = T> extends BaseEvent<T, U, ScrollDetail> {
    target: Element<U>;
    type: 'scroll';
  }
}

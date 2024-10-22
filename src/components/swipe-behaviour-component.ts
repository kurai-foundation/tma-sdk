import NativeComponent from "./generic/native-component"

export default class SwipeBehaviourComponent extends NativeComponent {
  constructor(targetOrigin?: string) {
    super(targetOrigin)
  }

  public allowVertical(allow: boolean) {
    this.postEvent("web_app_setup_swipe_behavior", {
      allow_vertical_swipe: allow
    })
  }
}

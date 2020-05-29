import { createRenderer } from '@vue/runtime-core'
/*
patchProp(
  el: HostElement,
  key: string,
  prevValue: any,
  nextValue: any,
  isSVG?: boolean,
  prevChildren?: VNode<HostNode, HostElement>[],
  parentComponent?: ComponentInternalInstance | null,
  parentSuspense?: SuspenseBoundary | null,
  unmountChildren?: UnmountChildrenFn
): void
insert(el: HostNode, parent: HostElement, anchor?: HostNode | null): void
remove(el: HostNode): void
createElement(
  type: string,
  isSVG?: boolean,
  isCustomizedBuiltIn?: string
): HostElement
createText(text: string): HostNode
createComment(text: string): HostNode
setText(node: HostNode, text: string): void
setElementText(node: HostElement, text: string): void
parentNode(node: HostNode): HostElement | null
nextSibling(node: HostNode): HostNode | null
querySelector?(selector: string): HostElement | null
setScopeId?(el: HostElement, id: string): void
cloneNode?(node: HostNode): HostNode
insertStaticContent?(
  content: string,
  parent: HostElement,
  anchor: HostNode | null,
  isSVG: boolean
): HostElement[]
*/

const doc = document
const { render, createApp } = createRenderer( {
  insert: (child, parent, anchor) => {
    if (anchor) {
      parent.insertBefore(child, anchor)
    } else {
      parent.appendChild(child)
    }
  },
  createElement(type, isSVG, isCustomizedBuiltIn) {
    console.log(type, isSVG, isCustomizedBuiltIn);
    return document.createElement('div')
  },
  setElementText(node, text){
    console.log(node, text)
  }
});

export { render, createApp }

export * from '@vue/runtime-core'